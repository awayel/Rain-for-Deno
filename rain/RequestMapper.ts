import { getFileResourceHeader } from './FileResource.ts'
import rainContainer from './createContainer.ts'
import { ParamInfo } from './Container.ts'

const basePath = Deno.cwd();
const staticeDir = "/static"
const decoder = new TextDecoder();

const parseParamsType = (value: any, type: string) => {
    if (typeof value === "string") {
        if (type === "number") {
            return new Number(value);
        } else if (type === "string") {
            return value;
        } else {
            return value;
        }
    } else {
        return value;
    }
}

const getRequestParams = async (req: Request, paramsMap: Map<number, ParamInfo>) => {
    const { method } = req;
    const contentType = req.headers.get('content-type');
    let paramsList: Array<any> = [];
    if (method === "POST") {
        if (contentType === "application/json") {
            const stream = await req.body?.getReader().read();
            if (stream?.value) {
                const body = JSON.parse(decoder.decode(stream?.value));
                for (const [key, paramInfo] of paramsMap) {
                    paramsList[key] = parseParamsType(body[paramInfo.paramName], paramInfo.paramType);
                }
            }
            // const reader = req.body?.getReader();
        }
        if (contentType?.includes("multipart/form-data;")) {
            const stream = await req.body?.getReader().read();
            if (stream?.value) {
                const bodyString = decoder.decode(stream?.value);
                const boundary = bodyString.match(/^[\w\d-=]+/)![0];
                const regString = `(?<=Content-Disposition:\\sform-data;\\sname="[a-zA-Z_$][a-zA-Z0-9]*"\\s+).*(?=\\s+${boundary})`;
                const valueRegExp = new RegExp(regString, 'g');
                const values = bodyString.match(valueRegExp);
                const keyRegExp = /(?<=Content-Disposition:\sform-data;\sname=")[a-zA-Z_$][a-zA-Z0-9]*(?="\s+)/g
                const keys = bodyString.match(keyRegExp);
                console.log(bodyString);
                
                if (keys && values) {
                    let body: any = {};
                    for (let i = 0; i < keys.length; i++) {
                        const key = keys[i];
                        body[key] = values[i];
                    }
                    for (const [key, paramInfo] of paramsMap) {
                        paramsList[key] = parseParamsType(body[paramInfo.paramName], paramInfo.paramType);
                    }
                }
            }
        }
    }

    return paramsList;
}

const servelet = async (req: Request, path: string) => {
    const { method, url } = req;
    // 参数数组

    const mapper = rainContainer.get("#" + method + "#" + path);
    let result: Object;
    if (mapper) {
        const paramsList = await getRequestParams(req, mapper.params);
        result = (mapper.target as any)[mapper.fn](...paramsList);
    }
    else result = path;
    return new Response(JSON.stringify(result));
}


const RequestMapper = (req: Request) => {
    const url = req.url;
    const urlMatchStaticSource = url.match(/(\/\w+)+\.\w+$/);
    if (urlMatchStaticSource) {
        const staticeSourcePath = (basePath + staticeDir + urlMatchStaticSource[0]).replaceAll(/\//ig, "\\");
        console.log(staticeSourcePath, "*************");
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
    let matchPathResult = url.match(/(?<=(^(https?|ws):\/\/)?(\w+\.)?(\w+\.\w+|\w+)(:\d+)?)(\/\w+)+\/?$/ig);
    let matchPath = "/"
    if (matchPathResult) {
        matchPath = matchPathResult[0];
        matchPath = matchPath.replace(/\/$/, "");
    }
    return servelet(req, matchPath);
}


export default RequestMapper;