1. git clone https://github.com/awayel/Rain-for-Deno.git
2. deno run --allow-net --allow-read --allow-write app.ts

装饰器类似于java的springMVC框架装饰器用法，加有@Controller装饰器的导出类，可被扫描到并装配至容器内。
部分装饰器用法受限于装饰器本身，而不同于springMVC，如@AutoWired需要传入类名，@Param需要加上参数名。

# example 例如：

import { Controller, GetMapping, PostMapping, Value, AutoWired, Param } from
'../../rain/Decorators.ts' import UserService from '../service/UserService.ts'

@Controller("/api") class UserController { @Value("Ding") private name!: string;

    @AutoWired(UserService)
    private userService!: UserService;

    @GetMapping("/get")
    public getUserInfo() {
        return {
            code: 200,
            message: "success",
            data: {
                name: this.name,
                userInfo: this.userService
            }
        }
    }


    @PostMapping("/post")
    public postUserInfo(
        @Param("userName", "string") userName: string,
        @Param("upwd") name: string
    ) {
        console.log(userName, name);
        return {
            code: 200,
            message: "success",
            type: "post"
        }
    }

}

export default UserController;
