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
        @Param("star", "number") star: number,
        @Param("ddd") ddd: number
    ) {
        console.log(star);
        console.log(ddd);
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
        @Param("ddd", "string") userName: string,
        @Param("ddd2") name: string
    ) {
        console.log(userName, name);
        return {
            code: 200,
            message: "获取成功",
            type: "post"
        }
    }

}

export default ApiController;