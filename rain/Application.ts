import { serve } from "https://deno.land/std@0.117.0/http/server.ts";
import requestMapper from './RequestMapper.ts'

console.log("http://localhost:8000/");
serve((req: Request) => {
    return requestMapper(req);
}, { addr: ":8000" });