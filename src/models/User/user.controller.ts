import { clearObject, clearFilters } from '../../utils/functions';
import { User } from './user.model';
//import { Rol } from '../Rol/rol.model';

import { ClientSession } from 'mongoose';

class UserController {

    async save(user: any, session?: ClientSession) {
        
        return User.create([user], {session});
    }

    async update(user: any, filters: any, newsChanged = true, lean: boolean = true, session?: ClientSession) {

        user = clearObject(user);

        filters = clearFilters(filters);

        return User.findOneAndUpdate(filters, user, {new: newsChanged}).lean(lean).session(session);
    }

    async delete(userLogged: any, filters: any, newsChanged = true, lean: boolean = true) {

        const user = {
            alive: false,
            status: false,
            updatedBy: userLogged._id
        };

        filters = clearFilters(filters);

        return User.findOneAndUpdate(filters, user, {new: newsChanged}).lean(lean);
    }

    async getOne(filters: any, population: boolean = false, lean: boolean = true, session?: ClientSession) {

        filters = clearFilters(filters);
        let populate:any[] = [];

        if(population) {
            populate = [
<<<<<<< HEAD
                //{ path: 'rol' },
=======
                // { path: 'rol' },
>>>>>>> 17af4426ea70bb895dca3f72823f70274f036c7a
            ];
        }

        return User.findOne(filters).populate(populate).lean(lean);
    }

    async getAll(limit: number, skip: number, filters: any, all: boolean = false, population: boolean = false, lean: boolean = true) {

        let users;

        filters = clearFilters(filters);

        let populate:any[] = [];

        if(population) {
            populate = [
<<<<<<< HEAD
                //{ path: 'rol' },
=======
                // { path: 'rol' },
>>>>>>> 17af4426ea70bb895dca3f72823f70274f036c7a
            ];
        }

        if(all) {
            users = User.find(filters).populate(populate).sort({createdAt: -1}).lean(lean);
        } else {
            users = User.find(filters).populate(populate).sort({createdAt: -1}).skip(skip).limit(limit).lean(lean);
        }

        const count = User.find(filters).countDocuments();

        return Promise.all([users, count]);
        
    }

    async bulk(operations: any[]) {
        return User.bulkWrite(operations);
    }
}

const userController = new UserController();
export default userController;