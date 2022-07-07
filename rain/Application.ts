import { serve } from "https://deno.land/std@0.117.0/http/server.ts";
import ApplicationServe from './ApplicationServe.ts'
import RequestMapper from './RequestMapper.ts'
import Scanner from './Scanner.ts'


// export default serveStart;

class Application {

    private ApplicationServe: ApplicationServe = new ApplicationServe();
    private srcPath: string = "./src";
    constructor() {
        console.log(`☔ Rain for deno ☔ beta 0.0.4`);
        this.scannerSource();
    }

    async scannerSource() {
        const scanner = new Scanner(this.ApplicationServe, "..");
        await scanner.scannerSource(this.srcPath);
        this.ApplicationServe.init();
        this.startServe();
    }

    startServe() {
        const port = this.ApplicationServe.getConfiguration().port;
        const requestMapper = new RequestMapper(this.ApplicationServe);
        serve((req: Request) => {
            return requestMapper.mapRequest(req);
        }, { addr: `:${port}` });
        console.info(`🌈 Application running at ：%chttp://localhost:${port}/`, "color:#00c920");
        console.info(`🌂 Api document at ：%chttp://localhost:${port}/rain-doc/index.html`, "color:#00c920");
        // console.log(this.ApplicationServe.getRepository());
    }
}

export default Application;