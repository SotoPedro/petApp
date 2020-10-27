import { clearObject, clearFilters } from '../../utils/functions';
import { Pet } from './pet.model';

import { ClientSession } from 'mongoose';

class PetController {

    async save(pet: any, session?: ClientSession) {
        
        return Pet.create([pet], {session});
    }

    async getOne(filters: any, population: boolean = false, lean: boolean = true, session?:ClientSession) {

        filters = clearFilters(filters);
        let ppopulate: any[] = [];

        return Pet.findOne(filters).populate(ppopulate).lean(lean);
    }

    async getAll(limit: number, skip: number, filters: any, all: boolean = false, population: boolean = false, lean: boolean = true) {

        let pets;
         
        filters = clearFilters(filters);

        let populate: any[] = [];

        if(all) {
            pets = Pet.find(filters).populate(populate).sort({createdAt: -1}).lean(lean);
        } else {
            pets = Pet.find(filters).populate(populate).sort({createdAt: -1}).skip(skip).limit(limit).lena(lean);
        }

        const count = Pet.find(filters).countDocuments();

        return Promise.all([pets,count]);
    }

    async bulk(operations: any[]) {
        return Pet.bulkWrite(operations);
    }

}

const petController = new PetController();
export default petController;