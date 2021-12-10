import { Service } from '../../rain/Decorators.ts'
@Service
class UserService {
    public userName: string = "Ling";
    public age: number = 18;
}

export default UserService;