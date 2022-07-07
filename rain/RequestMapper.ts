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
    private profile: string;
    private staticFileCache = new Map<string, Uint8Array>();
    private isSinglePageApplication: boolean;
    constructor(ApplicationServe: ApplicaitionContainer, staticeDir?: string) {
        staticeDir && (this.staticeDir = staticeDir);
        const staticSource = ApplicationServe.getConfiguration().static;
        this.staticEnable = staticSource.enable;
        this.staticIndex = staticSource.index;
        this.rainContainer = ApplicationServe.getRainContainer();
        this.pathMap = ApplicationServe.getPathMap();
        this.docEnable = ApplicationServe.getConfiguration().doc.enable;
        this.docURL = ApplicationServe.getConfiguration().doc.url;
        this.profile = ApplicationServe.getConfiguration().static.profile;
        this.isSinglePageApplication = ApplicationServe.getConfiguration().static.isSinglePageApplication;
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
                body = await req.json();
                paramsList.push(body);
            } else if (contentType === "multipart/form-data") {
                const formData = await req.formData();
                formData.forEach((value, key) => {
                    body[key] = value;
                })
                RequestMapper.mapParams(body, paramsMap, paramsList);
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
        let result: any;
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
        if (result instanceof File) {
            return new Response(result);
        } else {
            return new Response(JSON.stringify(result));
        }
    }

    //静态资源匹配
    private mapStaticSourceRequest(fileSource: string) {

        let staticeSourcePath = "";
        if (this.docEnable && fileSource.match(/^\/rain-doc\//)) {
            staticeSourcePath = this.basePath + "/rain/resource/doc" + fileSource.replace(/^\/rain-doc/, '');
        } else {
            staticeSourcePath = this.basePath + this.staticeDir + fileSource.replace(this.profile, '');
        }
        try {
            let resource: Uint8Array | undefined;
            resource = this.staticFileCache.get(staticeSourcePath);
            if (!resource) {
                resource = Deno.readFileSync(staticeSourcePath);
                this.staticFileCache.set(staticeSourcePath, resource);
            }
            const fileType = fileSource.match(/(?<=\.)\w+$/)![0];
            return new Response(resource, {
                headers: {
                    "content-Type": getFileResourceHeader(fileType)
                }
            });
        } catch {
            return new Response("404 not found", {
                status: 404
            });
        }
    }

    //请求处理
    public mapRequest(req: Request) {
        const url = req.url;
        const urlMatchStaticSource = url.match(/(\/[\w-_]+)+(\.\w+)+$/);
        //判断静态资源
        if (urlMatchStaticSource) {
            return this.mapStaticSourceRequest(urlMatchStaticSource[0]);
        }
        // 去除queryString
        const queryStringReg = /(?<=^(https?|ws):\/\/?(\w+\.)?(\w+\.\w+|\w+)(:\d+)?((\/[\w-_]+)+\/?)?)\?.*/g;
        const path = url.replace(queryStringReg, "");
        // 匹配单页面应用
        if (this.isSinglePageApplication && path.match(this.profile)) {
            return this.mapStaticSourceRequest("/index.html");
        }
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