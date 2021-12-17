import { Controller, GetMapping, Param } from '../../rain/ApplicationServe.ts'

@Controller("/test")
class TestController {

    @GetMapping("/get")
    public getTest(
        @Param("name") name: string
    ) {

        console.log(name);
        
        return {
            code: 200,
            msg: "dsadasd"
        }
    }
}


export default TestController;