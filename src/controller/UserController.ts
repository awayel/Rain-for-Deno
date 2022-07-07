import { Controller, PostMapping, AutoWired, Param,RequestBody} from '../../rain/index.ts';
import UserService from '../service/UserService.ts'
import User from '../entity/User.ts'

@Controller("/userController")
class UserController {

    @AutoWired(UserService)
    private userService!: UserService;

    @PostMapping("/login","multipart/form-data")
    public async login(@Param('id', 'number') id: number) {
        const user = await this.userService.getInfo(id);
        return {
            code: 200,
            message: "登录成功",
            data: user
        }
    }

    @PostMapping("/addUser","application/json")
    public async addUser(@RequestBody user: User) {
        const result =  await this.userService.addUser(user);
        return {
            code: 200,
            message: "登录成功",
            data: result
        }
    }
}

export default UserController;