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
        return {
            code: 200,
            message: "获取成功",
            data: {
                name: star,
                userInfo: ddd
            }
        }
    }


    @PostMapping("/post")
    public postUserInfo(
        @Param("userName") username: string,
        @Param("upwd") upwd: string,
    ) {
        console.log("123")
        return {
            code: 200,
            message: "获取成功",
            type: "post"
        }
    }

}

export default ApiController;