import { Controller, GetMapping, PostMapping, Value, AutoWired, Param } from '../../rain/index.ts';
import UserService from '../service/UserService.ts'

@Controller("/api")
class ApiController {
    @Value("Ding")
    private name!: string;

    @AutoWired(UserService)
    private userService!: UserService;

    @GetMapping("/get")
    public getUserInfo(
        @Param("rain") star: number,
        @Param("deno") ddd: number
    ) {
        console.log(star, ddd);
        return {
            code: 200,
            message: "获取成功",
            data: {
                name: this.name,
                userInfo: this.userService
            }
        }
    }


    @PostMapping("/post")
    public postUserInfo(
        @Param("rain", "string") rain: string,
        @Param("denoVersion", "number") denoVersion: string
    ) {
        console.log(rain,denoVersion);
        return {
            code: 200,
            message: "获取成功",
            type: "post"
        }
    }

}

export default ApiController;