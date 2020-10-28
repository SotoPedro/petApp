import mongoose from 'mongoose';
import config from './utils/config';
import { User } from './models/User/user.model';
import { Pet } from './models/Pets/pet.model';
import { Post } from './models/Post/post.model';

export default class DB {

    private static _instance: DB;
    db: mongoose.Connection;

    private constructor() {
        mongoose.Promise = global.Promise;

        mongoose.connect(
            config.database,
            { 
                useNewUrlParser: true, 
                useCreateIndex: true, 
                useUnifiedTopology: true, 
                useFindAndModify: false
            }
        );

        this.db = mongoose.connection;
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    open() {
        this.db.on('error', () => { console.log('Error al conectarse a la base de datos') });
        this.db.once('open', async () => { 
            await this.syncIndexes();
            console.log('Base de datos corriendo')
         });
    }

    private async syncIndexes() {
        return Promise.all([
            User.syncIndexes(),
            Pet.syncIndexes(),
            Post.syncIndexes(),
        ]).catch(err => console.log(err));
    }
}