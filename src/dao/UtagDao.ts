import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.0.40/mod.ts';
import { Repository } from '../../rain/index.ts'
import UserDao from './UserDao.ts'

@Repository
export default class Utag extends Model {
    static table = 'utag';
    static timestamps = true;

    static fields = {
        id: { primaryKey: true, autoIncrement: true },
        tagName: DataTypes.STRING,
        createTime: DataTypes.TIMESTAMP,
        modifiedTime: DataTypes.TIMESTAMP,
    };

    static defaults = {
        flightDuration: 2.5,
    };

    static user() {
        return this.hasMany(UserDao);
    }
}