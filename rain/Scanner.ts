import ApplicationServe, { PathMember } from './ApplicationServe.ts'

class Scanner {
    private basePath: string = "..";
    private containerMap: Map<Object, any>;
    private pathMap: Map<string, PathMember>;
    constructor(applicationContaienr: ApplicationServe, basePath?: string) {
        if (basePath !== undefined) this.basePath = basePath;
        this.containerMap = applicationContaienr.getContainerMap();
        this.pathMap = applicationContaienr.getPathMap();
    }
    async scannerSource(srcPath: string) {
        for await (const dirEntry of Deno.readDir(srcPath)) {
            if (dirEntry.isDirectory) {
                await this.scannerSource(srcPath + "/" + dirEntry.name);
            } else if (dirEntry.isFile) {
                const path = (this.basePath + srcPath.slice(1) + "/" + dirEntry.name);
                console.log("加载中:  ", path);
                const ClassModule = await import(path);
                const Class = ClassModule.default;
                if (Class.prototype && Class.prototype.constructor === Class) {
                    let instance = new Class();
                    if (this.containerMap.get(Class.prototype) === true) this.containerMap.set(Class.prototype, instance);
                    let mapper = this.pathMap.get(Class.prototype.constructor.name);
                    if (mapper) mapper.setInstance(instance);
                }
            }
        }
        return Promise.resolve(true);
    }
}

export default Scanner;
