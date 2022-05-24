import { getFileResourceHeader } from './FileResource.ts'
import ApplicaitionContainer, { ParamInfo, PathMapper, PathMember, ContentType } from './ApplicationServe.ts'
import mapToObject from './tools.ts'
class RequestMapper {
    private basePath = Deno.cwd();
    private staticeDir = "/static"
    private decoder = new TextDecoder();
    private rainContainer: Map<string, PathMapper>;
    private pathMap: Map<string, PathMember>;
    private staticEnable: boolean;
    private staticIndex: string;
    private docURL: string;
    private docEnable: boolean;
    constructor(ApplicationServe: ApplicaitionContainer, staticeDir?: string) {
        staticeDir && (this.staticeDir = staticeDir);
        const staticSource = ApplicationServe.getConfiguration().static;
        this.staticEnable = staticSource.enable;
        this.staticIndex = staticSource.index;
        this.rainContainer = ApplicationServe.getRainContainer();
        this.pathMap = ApplicationServe.getPathMap();
        this.docEnable = ApplicationServe.getConfiguration().doc.enable;
        this.docURL = ApplicationServe.getConfiguration().doc.url;
    }

    //参数类型转换
    public static parseParamsType(value: any, type: string) {
        if (type === "number") {
            const result = Number(value);
            if (value === undefined) throw new Error(`The param is required,and the paramtype is "number";`);
            if (isNaN(result)) throw new Error(`${value} is not a number`);
            return result;
        } else if (type === "string") {
            return value + "";
        } else {
            return value;
        }
    }

    //匹配参数列表
    private static mapParams(body: any, paramsMap: Map<number, ParamInfo>, paramsList: Array<any>) {
        for (const [key, paramInfo] of paramsMap) {
            try {
                paramsList[key] = RequestMapper.parseParamsType(body[paramInfo.paramName], paramInfo.paramType);
            } catch (error) {
                throw new Error(`param error:  "${paramInfo.paramName}" with value ${body[paramInfo.paramName]} and param type -- ${paramInfo.paramType}:
    at:${error}`);
            }
        }
    }

    //获取请求参数列表
    private async getRequestParams(req: Request, paramsMap: Map<number, ParamInfo>, contentType: ContentType) {
        const { method, url } = req;
        let paramsList: Array<any> = [];
        let body: any = {};
        if (method === "POST") {
            if (contentType === "application/json") {
                const stream = await req.body?.getReader().read();
                if (stream?.value) {
                    const json = this.decoder.decode(stream?.value);
                    try {
                        body =JSON.parse(JSON.parse(json));
                        // body = JSON.parse(json);
                    } catch (error) {
                        throw new Error("JSON error: " + json);
                    }
                    // RequestMapper.mapParams(body, paramsMap, paramsList);                  
                    paramsList.push(body);
                }
            } else if (contentType === "multipart/form-data") {
                const stream = await req.body?.getReader().read();
                if (stream?.value) {
                    const bodyString = this.decoder.decode(stream?.value);
                    const boundary = bodyString.match(/^[\w\d-=]+/)![0];
                    if (boundary) {
                        const regString = `(?<=Content-Disposition:\\sform-data;\\sname="[a-zA-Z_$][a-zA-Z0-9]*"\\s+).*(?=\\s+${boundary})`;
                        const valueRegExp = new RegExp(regString, 'g');
                        const values = bodyString.match(valueRegExp);
                        const keyRegExp = /(?<=Content-Disposition:\sform-data;\sname=")[a-zA-Z_$][a-zA-Z0-9]*(?="\s+)/g
                        const keys = bodyString.match(keyRegExp);
                        if (keys && values) {
                            for (let i = 0; i < keys.length; i++) {
                                const key = keys[i];
                                body[key] = values[i];
                            }
                            RequestMapper.mapParams(body, paramsMap, paramsList);
                        }
                    } else {
                        throw new Error("Request error: no boundary found in request [ multipart/form-data ]");
                    }
                }
            }
        }
        const queryStringReg = /(?<=^(https?|ws):\/\/?(\w+\.)?(\w+\.\w+|\w+)(:\d+)?((\/\w+)+\/?)?\?)([\w$_]+(=[%\w.]+)?&?)+$/g;
        const queryStringMatchResult = url.match(queryStringReg);
        if (queryStringMatchResult) {
            const queryString = queryStringMatchResult[0];
            const queryStringItemList = queryString.split("&");
            const queryList: Array<Array<string>> = [];
            queryStringItemList.forEach(query => {
                queryList.push(query.split("="));
            })
            for (let i = 0; i < queryList.length; i++) {
                const query = queryList[i];
                query[0] && (body[query[0]] = query[1] === undefined ? undefined : decodeURI(query[1]));
            }
            RequestMapper.mapParams(body, paramsMap, paramsList);
        }

        return paramsList;
    }

    //RESTful服务
    private async servelet(req: Request, path: string) {
        const { method, url } = req;
        // 参数数组
        const mapper = this.rainContainer.get("#" + method + "#" + path);
        let result: Object;
        if (mapper) {
            try {
                const paramsList = await this.getRequestParams(req, mapper.params, mapper.contentType);                
                result = await (mapper.target as any)[mapper.fn](...paramsList);
            } catch (error) {
                return new Response(error, {
                    status: 400
                });
            }
        } else {
            return new Response("404 not found", {
                status: 404
            });
        }
        return new Response(JSON.stringify(result));
    }

    //静态资源匹配
    private mapStaticSourceRequest(fileSource: string) {

        let staticeSourcePath = "";
        if (this.docEnable && fileSource.match(/^\/rain-doc\//)) {
            staticeSourcePath = this.basePath + "/rain/resource/doc" + fileSource.replace(/^\/rain-doc/, '');
        } else {
            staticeSourcePath = this.basePath + this.staticeDir + fileSource;
        }
        try {
            const resource = Deno.readFileSync(staticeSourcePath);
            const fileType = fileSource.match(/(?<=\.)\w+$/)![0];
            return new Response(resource, {
                headers: {
                    "content-Type": getFileResourceHeader(fileType)
                }
            });
        } catch (error) {
            return new Response("404 not found", {
                status: 404
            });
        }
    }

    //请求处理
    public mapRequest(req: Request) {
        const url = req.url;
        const urlMatchStaticSource = url.match(/(\/[\w-_]+)+\.\w+$/);
        // 判断静态资源
        if (urlMatchStaticSource) {
            return this.mapStaticSourceRequest(urlMatchStaticSource[0]);
        }
        // 去除queryString
        const queryStringReg = /(?<=^(https?|ws):\/\/?(\w+\.)?(\w+\.\w+|\w+)(:\d+)?((\/[\w-_]+)+\/?)?)\?.*/g;
        const path = url.replace(queryStringReg, "");
        // 获取path
        let pathMatchResult = path.match(/(?<=(^(https?|ws):\/\/)?(\w+\.)?(\w+\.\w+|\w+)(:\d+)?)(\/[\w-_]+)*\/?$/ig);
        let mathedPath = ""
        if (pathMatchResult) {
            mathedPath = mathedPath.replace(/\/$/, "");
            mathedPath = pathMatchResult[0];
            if (this.docEnable && mathedPath === "/rain-doc/getInfo") {
                return new Response(JSON.stringify(mapToObject(this.pathMap)), {
                    headers: {
                        "content-Type": getFileResourceHeader("json")
                    }
                });
            }
            if (mathedPath === '/' && this.staticEnable) return this.mapStaticSourceRequest(this.staticIndex);
        } else {
            return new Response("404 not found", {
                status: 404
            });
        }
        return this.servelet(req, mathedPath);
    }
}


export default RequestMapper;