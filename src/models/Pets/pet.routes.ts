import { Router, Response } from "express";
import GenericResponse from '../../utils/responses';
import { filters } from "../../middlewares/filters";
import petController from "./pet.controller";
import userController from '../User/user.controller';

const PetRoutes = Router();

PetRoutes.get('/',(req, res ) => { res.send("From PetRoutes")});

PetRoutes.post('', [],async (req: any, res: Response) => {

    try {

        if(!req.body.owner) return res.status(400).send(GenericResponse.error({}, 'Error, se necesita un ID de un dueño'));

        const user: any = await userController.getOne({ _id: req.body.owner }, false, false);
        delete req.body.owner;

        const newPet = req.body;        
        const pet = await petController.save(newPet);
        
        user.pets.push(pet._id);
        await user.save();

        return res.status(200).json(GenericResponse.success(pet, 'Se guardó el registro correctamente'));

    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, 'Error al guardar la mascota'));
    }
});

PetRoutes.get('/list', [filters], async (req: any, res: Response) => {

    try {

        if(req.query.search) {
            req.query.filters.name = req.query.search;
        }

        const [pets, count] = await petController.getAll(req.query.limit, req.query.skip, req.query.filters, req.query.all, true);

        let pagination = {};

        if(!req.query.all) {
            const pages = Math.ceil((count / req.query.limit ));

            pagination = {
                perPage: req.query.limit,
                pages
            };
        }
        
        return res.status(200).json(GenericResponse.success({
            pets,
            count,
            ...pagination
        }, "Se obtuvieron las mascotas correctamente"));
    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al obtener las mascotas"));
    }
});


PetRoutes.put('/:petId', [], async (req: any, res: Response) => {
    
    try {
        
        let pet = req.body;
        
        pet = await petController.update(pet, {_id: req.params.petId});
        
        return res.status(200).json(GenericResponse.success(pet, 'Se guardó la mascota correctamente'));

    } catch (error) {     
        return res.status(400).json(GenericResponse.error(error, 'Error al guardar la mascota'));
    }
});

PetRoutes.delete('/:petId', [], async (req: any, res: Response) => {

    try {
        
        const pet = await petController.delete(null, {_id: req.params.petId});

        if(!pet) {
            return res.status(410).json(GenericResponse.error({}, "La mascota que desea eliminar no existe"));
        }

        return res.status(200).json(GenericResponse.success(pet, "Se eliminó la mascota correctamente"));

    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al eliminar la mascota"));
    }
});

PetRoutes.get('/single/:petId', [], async (req: any, res: Response) => {

    try {
        
        const pet = await petController.getOne({_id: req.params.petId}, true);
        
        if(!pet) {
            return res.status(410).json(GenericResponse.error({}, "La mascota que desea obtener no existe"));
        }
        
        return res.status(200).json(GenericResponse.success(pet, "Se obtuvo la mascota correctamente"));

    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al obtener la mascota"));
    }
});

export default PetRoutes;