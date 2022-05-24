import { Relationships } from 'https://deno.land/x/denodb@v1.0.40/mod.ts';
import UserDao from '../UserDao.ts'
import UtagDao from '../UtagDao.ts'
import { Repository } from '../../../rain/index.ts'

const UserUtagOr = Relationships.manyToMany(UtagDao, UserDao);

@Repository
class UserUtag extends UserUtagOr{}

export default UserUtag;