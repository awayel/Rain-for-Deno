import DataBaseConfiguration from './inter/DataBaseConfiguration.ts'

type ContentType = "multipart/form-data" | "application/json" | "application/x-www-form-urlencoded";
interface MappingMember {
    path: string;
    name: string;
    method: string;
    contentType: ContentType
}
interface ParamInfo {
    paramType: string;
    paramName: string
}


interface PathMapper {
    target: Object;
    fn: string;
    contentType:ContentType
    params: Map<number, ParamInfo>;
}

interface ApplicationConfig {
    port?: number;
    static?: {
        enable?: boolean;
        index?: string;
    };
    doc?: {
        enable?: boolean;
    }
}

interface FilterInfo {
    path: string;
    name: string;
    proto: any;
}


class PathMember {
    private path: string = "";
    private children: Array<MappingMember> = [];
    private instance: any = {};
    private initValues: Map<string, any> = new Map();
    private autoWiredMap: Map<string, any> = new Map();
    private paramsMap: Map<string, Map<number, ParamInfo>> = new Map();

    setPath(path: string) {
        this.path = path;
    }
    getPath() {
        return this.path
    }
    addChildren(member: MappingMember) {
        this.children.push(member);
    }
    getChildren() {
        return this.children;
    }
    setInstance(instance: Object) {
        this.instance = instance;
    }
    getInstance() {
        return this.instance;
    }
    getInitValues() {
        return this.initValues;
    }
    getAutoWiredMap() {
        return this.autoWiredMap;
    }
    getParamsMap() {
        return this.paramsMap;
    }
}

const pathMap = new Map<string, PathMember>();
const containerMap = new Map<Object, any>();
const configurationMap = new Map<Object, any>();
const autoWiredMap = new Map<any, Map<string, any>>();
const valueMap = new Map<any, Map<string, any>>();
const filterArray: Array<FilterInfo> = [];
const repositoryMap = new Map<any, any>();

class ApplicationServe {
    private pathMap = pathMap;
    private containerMap = containerMap;
    private autoWiredMap = autoWiredMap;
    private valueMap = valueMap;
    private rainContainer = new Map<string, PathMapper>();
    private filterArray = filterArray;
    private repositoryMap = repositoryMap;
    private configurationMap = configurationMap;
    private configuration = {
        port: 8000,
        static: {
            enable: false,
            index: "index.html"
        },
        doc: {
            enable: false,
            url: "/rain-doc/index.html"
        }
    };

    public getPathMap() {
        return this.pathMap;
    }
    public getContainerMap() {
        return this.containerMap;
    }
    public getAutoWiredMap() {
        return this.autoWiredMap;
    }
    public getValueMap() {
        return this.valueMap;
    }
    public getRainContainer() {
        return this.rainContainer;
    }
    public getConfiguration() {
        return this.configuration;
    }
    public setConfiguration(configuration: ApplicationConfig) {
        configuration.port && (this.configuration.port = configuration.port);
        if (configuration.static) {
            configuration.static.enable && (this.configuration.static.enable = configuration.static.enable);
            configuration.static.index && (this.configuration.static.index = configuration.static.index);
        }
        if (configuration.doc) {
            configuration.doc.enable && (this.configuration.doc.enable = configuration.doc.enable);
        }
    }

    public getRepository() {
        return this.repositoryMap;
    }
    public getConfigurations() {
        return this.configurationMap;
    }

    public init() {
        for (const [key, member] of this.pathMap) {
            const children = member.getChildren();
            const instance = member.getInstance();
            for (let i = 0; i < children.length; i++) {
                const element = children[i];
                this.rainContainer.set("#" + element.method + "#" + member.getPath() + element.path, {
                    target: instance,
                    fn: element.name,
                    contentType: element.contentType,
                    params: member.getParamsMap().get(element.name) ?? new Map<number, ParamInfo>()
                });
            }
        }
        // 初始化Configuration
        for (const [key, member] of this.configurationMap) {
            const instance = this.containerMap.get(key);
            const daoList: any[] = [];
            for (const key of this.repositoryMap.keys()) {
                daoList.push(key);
            }            
            // daoList.sort(dao=>{
            //     if(typeof dao.prototype ==="")
            // })
            instance.init(daoList);
        }

        // 初始化容器组件value
        for (const [key, member] of this.valueMap) {
            const instance = this.containerMap.get(key);
            for (const [key2, value] of member) {
                instance[key2] = value;
            }
        }


        // 初始化容器组件autoWired
        for (const [key, member] of this.autoWiredMap) {
            const instance = this.containerMap.get(key);
            for (const [valueKey, value] of member) {
                const instanceValue = this.containerMap.get(value);
                instanceValue ? instance[valueKey] = instanceValue :
                    console.warn(`%c${key.constructor.name}:could not find autowired component -- ${valueKey}`, "color:red");
            }
        }
    }
}

function initPathMapper(pathMap: Map<Object, PathMember>, mapperName: string, proto: any) {
    let mapper = pathMap.get(mapperName);
    if (mapper === undefined) {
        mapper = new PathMember();
        pathMap.set(mapperName, mapper);
        containerMap.set(proto, true);
    }
    return mapper;
}

function mapping(path: string, method: string, contentType?: ContentType) {
    return (proto: any, key: string) => {
        const mapper = initPathMapper(pathMap, proto.constructor.name, proto);
        mapper.addChildren({
            name: key,
            method,
            path,
            contentType: contentType ? contentType : "application/json"
        });
    }
}

function valueMapping(map: Map<any, Map<string, any>>, proto: any) {
    let mapper = map.get(proto);
    if (mapper == undefined) {
        mapper = new Map<any, Map<string, any>>();
        map.set(proto, mapper);
    }
    return mapper;
}


function Controller<T extends new (...args: any[]) => {}>(path: string) {
    return (constructor: T) => {
        console.log(" 💧 [ Controller ] loading:  " + constructor.name);
        const mapper = initPathMapper(pathMap, constructor.name, constructor.prototype);
        mapper.setPath(path);
    }
}

function Repository<T extends new (...args: any[]) => {}>(constructor: T) {
    containerMap.set(constructor.prototype, true);
    repositoryMap.set(constructor, true);
}

function GetMapping(path: string) { return mapping(path, "GET") };

function PostMapping(path: string, contentType?: ContentType) { return mapping(path, "POST", contentType ? contentType : "application/json") };

function Value<T>(value: T) {
    return (proto: any, key: string) => {
        const mapper = valueMapping(valueMap, proto);
        mapper.set(key, value);
    }
}
function AutoWired<T extends new (...args: any[]) => {}>(constructor: T) {
    return (proto: any, key: string) => {
        const mapper = valueMapping(autoWiredMap, proto);
        mapper.set(key, constructor.prototype);
    }
}

function Service<T extends new (...args: any[]) => {}>(constructor: T) {
    console.log("%c ❀ %c [ Service ] loading:  " + constructor.name, "color:pink", "color:#ffffff");
    containerMap.set(constructor.prototype, true);
}

function Configuration<T extends new (...args: any[]) => {}>(constructor: T) {
    console.log("🍀  [ Configuration ] loading:  " + constructor.name);
    containerMap.set(constructor.prototype, true);
    configurationMap.set(constructor.prototype, true);
}

function Param(paramName: string, paramType?: "number" | "string") {
    return (proto: any, functionKey: string, paramIndex: number) => {
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

function RequestBody(proto: any, functionKey: string, paramIndex: number) {
    const mapper = initPathMapper(pathMap, proto.constructor.name, proto);
    const paramsMap = mapper.getParamsMap();
    let functionParamsMap = paramsMap.get(functionKey);
    if (functionParamsMap === undefined) {
        functionParamsMap = new Map<number, ParamInfo>();
        paramsMap.set(functionKey, functionParamsMap);
    }
    functionParamsMap.set(paramIndex, {
        paramName: "",
        paramType: "object"
    });
}


function Filter(path: string) {
    return (proto: any, key: string) => {
        filterArray.push({
            path,
            proto,
            name: key
        });
    }
}


export {
    PathMember,
    Controller,
    GetMapping,
    PostMapping,
    Value,
    AutoWired,
    Service,
    Param,
    Repository,
    Configuration,
    RequestBody
};
export type { MappingMember, ParamInfo, PathMapper, ApplicationConfig,ContentType };

export default ApplicationServe;
