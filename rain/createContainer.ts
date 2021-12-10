import scannerSource from "./Scanner.ts"
import { pathMap, containerMap, valueMap, autoWiredMap, ParamInfo } from './Container.ts'

const srcPath = "./src";

await scannerSource(srcPath);

interface PathMapper {
    target: Object;
    fn: string;
    params: Map<number, ParamInfo>;
}

let rainContainer = new Map<string, PathMapper>();
for (const [key, member] of pathMap) {
    const children = member.getChildren();
    const instance = member.getInstance();
    for (let i = 0; i < children.length; i++) {
        const element = children[i];
        rainContainer.set("#" + element.method + "#" + member.getPath() + element.path, {
            target: instance,
            fn: element.name,
            params: member.getParamsMap().get(element.name) ?? new Map<number, ParamInfo>()
        });
    }
}

// 初始化容器值value
for (const [key, member] of valueMap) {
    const instance = containerMap.get(key);
    for (const [key2, value] of member) {
        instance[key2] = value;
    }
}

// 初始化容器值value
for (const [key, member] of autoWiredMap) {
    const instance = containerMap.get(key);
    for (const [valueKey, value] of member) {
        const instanceValue = containerMap.get(value);
        if (instanceValue) {
            instance[valueKey] = instanceValue;
        } else {
            console.warn(`${key.constructor.name}:未找到装配项 ${valueKey}`);
        }
    }
}

export default rainContainer;
