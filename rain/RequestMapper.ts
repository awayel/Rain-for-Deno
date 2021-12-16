import { getFileResourceHeader } from './FileResource.ts'
import ApplicaitionContainer, { ParamInfo, PathMapper } from './ApplicationServe.ts'
class RequestMapper {
    private basePath = Deno.cwd();
    private staticeDir = "/static"
    private decoder = new TextDecoder();
    private rainContainer: Map<string, PathMapper>;
    constructor(ApplicationServe: ApplicaitionContainer, staticeDir?: string) {
        if (staticeDir) this.staticeDir = staticeDir;
        this.rainContainer = ApplicationServe.getRainContainer();
    }

    //参数类型转换
    parseParamsType(value: any, type: string) {
        if (type === "number") {
            return Number(value);
        } else if (type === "string") {
            return value + "";
        } else {
            return value;
        }
    }

    //获取请求参数列表
    async getRequestParams(req: Request, paramsMap: Map<number, ParamInfo>) {
        const { method, url } = req;
        const contentType = req.headers.get('content-type');
        let paramsList: Array<any> = [];
        if (method === "POST") {
            if (contentType === "application/json") {
                const stream = await req.body?.getReader().read();
                if (stream?.value) {
                    const json = this.decoder.decode(stream?.value);
                    try {
                        const body = JSON.parse(json);
                        for (const [key, paramInfo] of paramsMap) {
                            paramsList[key] = this.parseParamsType(body[paramInfo.paramName], paramInfo.paramType);
                        }
                    } catch (error) {
                        throw new Error("JSON error: " + json);
                    }
                }
            }
            if (contentType?.includes("multipart/form-data;")) {
                const stream = await req.body?.getReader().read();
                if (stream?.value) {
                    const bodyString = this.decoder.decode(stream?.value);
                    const boundary = bodyString.match(/^[\w\d-=]+/)![0];
                    const regString = `(?<=Content-Disposition:\\sform-data;\\sname="[a-zA-Z_$][a-zA-Z0-9]*"\\s+).*(?=\\s+${boundary})`;
                    const valueRegExp = new RegExp(regString, 'g');
                    const values = bodyString.match(valueRegExp);
                    const keyRegExp = /(?<=Content-Disposition:\sform-data;\sname=")[a-zA-Z_$][a-zA-Z0-9]*(?="\s+)/g
                    const keys = bodyString.match(keyRegExp);
                    if (keys && values) {
                        let body: any = {};
                        for (let i = 0; i < keys.length; i++) {
                            const key = keys[i];
                            body[key] = values[i];
                        }
                        for (const [key, paramInfo] of paramsMap) {
                            paramsList[key] = this.parseParamsType(body[paramInfo.paramName], paramInfo.paramType);
                        }
                    }
                }
            }
        } else if (method === "GET") {
            const queryStringReg = /(?<=^(https?|ws):\/\/?(\w+\.)?(\w+\.\w+|\w+)(:\d+)?((\/\w+)+\/?)?\?)([\w$_]+(=[%\w]+)?&?)+$/g;
            const queryStringMatchResult = url.match(queryStringReg);
            if (queryStringMatchResult) {
                const queryString = queryStringMatchResult[0];
                const queryStringItemList = queryString.split("&");
                const queryList: Array<Array<string>> = [];
                queryStringItemList.forEach(query => {
                    queryList.push(query.split("="));
                })
                const body: any = {};
                for (let i = 0; i < queryList.length; i++) {
                    const query = queryList[i];
                    if (query[0]) {
                        body[query[0]] = query[1] ?? undefined;
                    }
                }
                for (const [key, paramInfo] of paramsMap) {
                    paramsList[key] = this.parseParamsType(body[paramInfo.paramName], paramInfo.paramType);
                }
            }
        }
        return paramsList;
    }

    //RESTful服务
    async servelet(req: Request, path: string) {
        const { method, url } = req;
        // 参数数组
        const mapper = this.rainContainer.get("#" + method + "#" + path);
        let result: Object;
        if (mapper) {
            try {
                const paramsList = await this.getRequestParams(req, mapper.params);
                result = (mapper.target as any)[mapper.fn](...paramsList);
            } catch (error) {
                return new Response(error, {
                    status: 400
                });
            }
        }
        else {
            return new Response("404 not found", {
                status: 404
            });
        }
        return new Response(JSON.stringify(result));
    }

    //请求处理
    mapRequest(req: Request) {
        const url = req.url;
        const urlMatchStaticSource = url.match(/(\/\w+)+\.\w+$/);
        // 判断静态资源
        if (urlMatchStaticSource) {
            const staticeSourcePath = (this.basePath + this.staticeDir + urlMatchStaticSource[0]).replaceAll(/\//ig, "\\");
            // console.log("静态资源：", staticeSourcePath);
            try {
                const resource = Deno.readFileSync(staticeSourcePath);
                const fileType = urlMatchStaticSource[0].match(/(?<=\.)\w+$/)![0];
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
        // 去除queryString
        const queryStringReg = /(?<=^(https?|ws):\/\/?(\w+\.)?(\w+\.\w+|\w+)(:\d+)?((\/\w+)+\/?)?)\?.*/g;
        const path = url.replace(queryStringReg, "");
        // 获取path
        let pathMatchResult = path.match(/(?<=(^(https?|ws):\/\/)?(\w+\.)?(\w+\.\w+|\w+)(:\d+)?)(\/\w+)+\/?$/ig);
        // console.log(path);
        let pathMatch = ""
        if (pathMatchResult) {
            pathMatch = pathMatchResult[0];
            pathMatch = pathMatch.replace(/\/$/, "");
        } else {
            return new Response("404 not found", {
                status: 404
            });
        }
        return this.servelet(req, pathMatch);
    }

}


export default RequestMapper;