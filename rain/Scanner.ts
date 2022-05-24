import ApplicationServe, { PathMember } from './ApplicationServe.ts'

class Scanner {
    private basePath: string = "..";
    private containerMap: Map<Object, any>;
    private pathMap: Map<string, PathMember>;
    private applicationServe: ApplicationServe;
    constructor(applicationServe: ApplicationServe, basePath?: string) {
        basePath && (this.basePath = basePath);
        this.applicationServe = applicationServe;
        // this.addFileListener();
        this.containerMap = applicationServe.getContainerMap();
        this.pathMap = applicationServe.getPathMap();
    }


    public async scannerSource(srcPath: string) {
        for await (const dirEntry of Deno.readDir(srcPath)) {
            if (dirEntry.isDirectory) {
                await this.scannerSource(srcPath + "\\" + dirEntry.name);
            } else if (dirEntry.isFile) {
                const path = srcPath.slice(1) + "\\" + dirEntry.name;
                await this.loadFile(path, dirEntry.name);
            }
        }
        return Promise.resolve(true);
    }



    private async loadFile(path: string, fileName: string) {
        if (/.ts$/.test(fileName)) {
            const ClassModule = await import(this.basePath + path);
            const Clazz = ClassModule.default;
            if (Clazz && Clazz.prototype && Clazz.prototype.constructor === Clazz && typeof Clazz === 'function') {
                const instance = new Clazz();
                this.containerMap.get(Clazz.prototype) && this.containerMap.set(Clazz.prototype, instance);
                const mapper = this.pathMap.get(Clazz.prototype.constructor.name);
                mapper && mapper.setInstance(instance);
            }
        } else if (fileName === "Application.config.json") {
            const config = JSON.parse(Deno.readTextFileSync(Deno.cwd() + path));
            this.applicationServe.setConfiguration(config);
        }
    }

    private async addFileListener() {
        let isModiefing = false;
        const watcher = Deno.watchFs("src");
        for await (const event of watcher) {
            if (!isModiefing) {
                isModiefing = true;
            }
            // console.log(">>>> event", event);
        }
    }
}

export default Scanner;
