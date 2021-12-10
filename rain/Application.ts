import { serve } from "https://deno.land/std@0.117.0/http/server.ts";
import requestMapper from './RequestMapper.ts'

console.log("服务器已运行：http://localhost:8000/");
const serveStart = () => {
    serve((req: Request) => {
        return requestMapper(req);
    }, { addr: ":8000" });
}

export default serveStart;
