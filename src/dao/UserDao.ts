import { DataTypes,Model } from 'https://deno.land/x/denodb@v1.0.40/mod.ts';
import { Repository } from '../../rain/index.ts'
import UtagDao from './UtagDao.ts'

@Repository
export default class UserDao extends Model {
    static table = 'users';
    static timestamps = true;

    static fields = {
        id: { primaryKey: true, autoIncrement: true },
        uuid: DataTypes.UUID,
        account: DataTypes.STRING,
        aliasName: DataTypes.STRING,
        upwd: DataTypes.STRING,
        experience: DataTypes.INTEGER,
        createTime: DataTypes.TIMESTAMP,
        modifiedTime: DataTypes.TIMESTAMP,
    };

    static defaults = {
        flightDuration: 2.5,
    };

    static utag() {
        return this.hasMany(UtagDao);
    }
}