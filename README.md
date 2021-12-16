# Rain for Deno 基于装饰器的IOC服务器框架

装饰器类似于java的springMVC框架注释用法，带有@Controller装饰器的导出类，可被扫描到并装配至容器内。
部分装饰器用法受限于装饰器本身，而不同于springMVC，如@AutoWired需要传入类名，@Param需要加上参数名。
提供装饰器：Controller, GetMapping, PostMapping, Value, AutoWired, Param

## 使用说明

依赖：
Deno： https://deno.land/

1. git clone https://github.com/awayel/Rain-for-Deno.git
2. deno run --allow-net --allow-read --allow-write app.ts

## example 例如：


```typescript
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
```
