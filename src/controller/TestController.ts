import { Controller, GetMapping, PostMapping, Value, AutoWired, Param,RequestBody} from '../../rain/index.ts';
import UserService from '../service/UserService.ts'

@Controller("/test")
export default  class TestController {

    @AutoWired(UserService)
    private userService!: UserService;

    @GetMapping("/start")
    public async login() {
        const result = await this.userService.test();
        console.log(result);
        return {
            code: 200,
            message: "测试完成",
            data: result
        }
    }
}