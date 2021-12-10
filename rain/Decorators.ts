import { pathMap, containerMap, ContainerMember, valueMap, autoWiredMap, ParamInfo } from './Container.ts'

const initPathMapper = (pathMap: Map<Object, ContainerMember>, mapperName: string, proto: any) => {
    let mapper = pathMap.get(mapperName);
    if (mapper === undefined) {
        mapper = new ContainerMember();
        pathMap.set(mapperName, mapper);
        containerMap.set(proto, true);
    }
    return mapper;
}

const mapping = (path: string, method: string) => {
    return (proto: any, key: string) => {
        console.log("初始mappering:  " + key);
        const mapper = initPathMapper(pathMap, proto.constructor.name, proto);
        mapper.addChildren({
            name: key,
            method,
            path
        });
    }
}

const valueMapping = (map: Map<any, Map<string, any>>, proto: any) => {
    let mapper = map.get(proto);
    if (mapper == undefined) {
        mapper = new Map<any, Map<string, any>>();
        map.set(proto, mapper);
    }
    return mapper;
}


const Controller = <T extends new (...args: any[]) => {}>(path: string) => {
    return (constructor: T) => {
        console.log("初始Controller:  " + constructor.name);
        const mapper = initPathMapper(pathMap, constructor.name, constructor.prototype);
        mapper.setPath(path);
    }
}

const GetMapping = (path: string) => mapping(path, "GET");

const PostMapping = (path: string) => mapping(path, "POST");

const Value = <T>(value: T) => (proto: any, key: string) => {
    const mapper = valueMapping(valueMap, proto);
    mapper.set(key, value);
}
const AutoWired = <T extends new (...args: any[]) => {}>(constructor: T) => {
    return (proto: any, key: string) => {
        const mapper = valueMapping(autoWiredMap, proto);
        mapper.set(key, constructor.prototype);
    }
}

const Service = <T extends new (...args: any[]) => {}>(constructor: T) => {
    containerMap.set(constructor.prototype, true);
}

const Param = (paramName: string, paramType?:string) => {
    return (proto: any, functionKey: string, paramIndex: number) => {
        console.log("初始params:  " + functionKey);
        const mapper = initPathMapper(pathMap, proto.constructor.name, proto);
        const paramsMap = mapper.getParamsMap();
        let functionParamsMap = paramsMap.get(functionKey);
        if (functionParamsMap === undefined) {
            functionParamsMap = new Map<number, ParamInfo>();
            paramsMap.set(functionKey, functionParamsMap);
        }
        functionParamsMap.set(paramIndex, {
            paramName,
            paramType: paramType ?? "string"
        });
    }
}




export {
    Controller,
    GetMapping,
    PostMapping,
    Value,
    AutoWired,
    Service,
    Param
}