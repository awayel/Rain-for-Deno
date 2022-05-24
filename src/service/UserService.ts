import { Service, AutoWired } from '../../rain/index.ts'
import KindService from './KindService.ts'
import DataBaseConnection from '../config/DataBaseConnection.ts'
import UserDao from '../dao/UserDao.ts'
import UserUtag from '../dao/relationships/UserUtag.ts'
import User from '../entity/User.ts'

@Service
class UserService {
    @AutoWired(KindService)
    private kindService!: KindService

    async getInfo(id: number) {
        // await DataBaseConnection
        const user = await UserDao.select('id', 'uuid', 'aliasName', 'account', 'createTime').where({
            id
        }).get();
        return user;
    }

    async addUser(user: User) {
        console.log(user, user.account, typeof user);

        return await UserDao.create([user as any]);
    }

    async test() {
        return UserUtag.create([
            { userDaoId: 1, utagDaoId: 1 },
            { userDaoId: 5, utagDaoId: 1 }
        ]);
    }

}

export default UserService;