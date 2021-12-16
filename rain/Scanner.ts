import ApplicationServe, { PathMember } from './ApplicationServe.ts'

class Scanner {
    private basePath: string = "..";
    private containerMap: Map<Object, any>;
    private pathMap: Map<string, PathMember>;
    private applicationServe: ApplicationServe;
    constructor(applicationServe: ApplicationServe, basePath?: string) {
        if (basePath !== undefined) this.basePath = basePath;
        this.applicationServe = applicationServe;
        this.containerMap = applicationServe.getContainerMap();
        this.pathMap = applicationServe.getPathMap();
    }


    public async scannerSource(srcPath: string) {
        for await (const dirEntry of Deno.readDir(srcPath)) {
            if (dirEntry.isDirectory) {
                await this.scannerSource(srcPath + "/" + dirEntry.name);
            } else if (dirEntry.isFile) {
                const path = srcPath.slice(1) + "/" + dirEntry.name;
                this.loadFile(path, dirEntry.name);
            }
        }
        return Promise.resolve(true);
    }
    

    private async loadFile(path: string, fileName: string) {
        if (/.ts$/.test(fileName)) {
            const ClassModule = await import(this.basePath + path);
            const Class = ClassModule.default;
            if (Class.prototype && Class.prototype.constructor === Class) {
                let instance = new Class();
                if (this.containerMap.get(Class.prototype) === true) this.containerMap.set(Class.prototype, instance);
                let mapper = this.pathMap.get(Class.prototype.constructor.name);
                if (mapper) mapper.setInstance(instance);
            }
        } else if (fileName === "Application.config.json") {
            const config = JSON.parse(Deno.readTextFileSync(Deno.cwd() + path));
            this.applicationServe.setConfiguration(config);
        }
    }
}

export default Scanner;
