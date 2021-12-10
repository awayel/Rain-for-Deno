import { pathMap, containerMap } from './Container.ts'
const basePath = "..";
const scannerSource = async (srcPath: string) => {
    for await (const dirEntry of Deno.readDir(srcPath)) {
        if (dirEntry.isDirectory) {
            await scannerSource(srcPath + "/" + dirEntry.name);
        } else if (dirEntry.isFile) {
            const path = (basePath + srcPath.slice(1) + "/" + dirEntry.name);
            console.log("加载中:  ", path);
            const ClassModule = await import(path);
            const Class = ClassModule.default;
            if (Class.prototype && Class.prototype.constructor === Class) {
                let instance = new Class();
                if (containerMap.get(Class.prototype) === true) containerMap.set(Class.prototype, instance);
                let mapper = pathMap.get(Class.prototype.constructor.name);
                if (mapper) mapper.setInstance(instance);
            }
        }
    }
    return Promise.resolve(true);
}

export default scannerSource;
