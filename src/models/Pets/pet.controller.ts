import { clearObject, clearFilters } from '../../utils/functions';
import { Pet } from './pet.model';

import { ClientSession } from 'mongoose';

class PetController {
    
    async save(pet: any) {
        return Pet.create(pet);
    }

    async update(pet: any, filters: any, newsChanged = true, lean: boolean = true) {

        pet = clearObject(pet);

        filters = clearFilters(filters);

        return Pet.findOneAndUpdate(filters, pet, {new: newsChanged}).lean(lean);
    }

    async delete(user: any, filters: any, newsChanged = true, lean: boolean = true) {

        const pet = {
            alive: false,
        };

        filters = clearFilters(filters);

        return Pet.findOneAndUpdate(filters, pet, {new: newsChanged}).lean(lean);
    }

    async getOne(filters: any, population: boolean = false, lean: boolean = true) {

        filters = clearFilters(filters);

        let populate: any[] = [];

        if(population) {
            populate = [
                //
            ];
        }

        return Pet.findOne(filters).populate(populate).lean(lean);
    }

    async getAll(limit: number, skip: number, filters: any, all: boolean = false, population: boolean = false, lean: boolean = true) {

        let pets;

        filters = clearFilters(filters);

        let populate: any[] = [];

        if(population) {
            populate = [
                //
            ];
        }

        if(all) {
            pets = Pet.find(filters).populate(populate).sort({createdAt: -1}).lean(lean);
        } 
        else {
            pets = Pet.find(filters).populate(populate).sort({createdAt: -1}).skip(skip).limit(limit).lean(lean);
        }

        const count = Pet.find(filters).countDocuments();

        return Promise.all([pets, count]);
        
    }

}

const petController = new PetController();
export default petController;