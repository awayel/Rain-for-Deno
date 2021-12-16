import { serve } from "https://deno.land/std@0.117.0/http/server.ts";
import ApplicationConfig from './ApplicationConfig.ts'
import ApplicationServe from './ApplicationServe.ts'
import RequestMapper from './RequestMapper.ts'
import Scanner from './Scanner.ts'


// export default serveStart;

class Application {
    private applicationConfig: ApplicationConfig | null = null;
    private ApplicationServe: ApplicationServe = new ApplicationServe();
    private srcPath: string = "./src";
    private requestMapper: RequestMapper = new RequestMapper(this.ApplicationServe);
    constructor() {
        this.scannerSource();
    }
    async scannerSource() {
        const scanner = new Scanner(this.ApplicationServe, "..");
        await scanner.scannerSource(this.srcPath);
        this.ApplicationServe.init();
        this.startServe();
    }
    startServe() {
        console.log("服务器已运行：%chttp://localhost:8000/", "color:#00c920");
        serve((req: Request) => {
            return this.requestMapper.mapRequest(req);
        }, { addr: ":8000" });
    }
}

export default Application;