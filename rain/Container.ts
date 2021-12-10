interface MappingMember {
    path: string;
    name: string;
    method: string;
}
interface ParamInfo {
    paramType: string;
    paramName: string
}

class ContainerMember {
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


let pathMap = new Map<string, ContainerMember>();
let containerMap = new Map<Object, any>();
let autoWiredMap = new Map<any, Map<string, any>>();
let valueMap = new Map<any, Map<string, any>>();


export {
    ContainerMember,
    pathMap,
    containerMap,
    valueMap,
    autoWiredMap,
};
export type { MappingMember,ParamInfo };
