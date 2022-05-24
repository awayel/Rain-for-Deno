import { DataTypes, Database, Model, MySQLConnector } from 'https://deno.land/x/denodb@v1.0.40/mod.ts';
import User from '../dao/UserDao.ts'
import { Configuration, DataBaseConfiguration, AutoWired } from '../../rain/index.ts'

@Configuration
export default class DataBaseConnection implements DataBaseConfiguration {
    private db: Database;
    constructor() {
        const connection = new MySQLConnector({
            host: 'localhost',
            username: 'root',
            port: 3307,
            password: '',
            database: 'cloudbooks',
        });
        this.db = new Database(connection);
    }
    init(models: (typeof Model)[]) {
        this.db.link(models);
    };
}


