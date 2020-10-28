import { Router, Response } from "express";
import GenericResponse from '../../utils/responses';
import { filters } from "../../middlewares/filters";
import petController from "./pet.controller";
import { imageIncluded } from "../../middlewares/files";

const PetRoutes = Router();

PetRoutes.get('/',(req, res ) => { res.send("From PetRoutes")});

PetRoutes.post('',[imageIncluded],async (req: any, res: Response) => {

    try {

        const newPet = req.body;        

        const pet = await petController.save(newPet);

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
        if(req.query.unit) {
            req.query.filters.unit = req.query.unit;
        }

        const [pets, count] = await petController.getAll(req.query.limit, req.query.skip, req.query.filters, req.query.all, req.query.populate);

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

PetRoutes.put('/:petId', [imageIncluded], async (req: any, res: Response) => {

    try {

        let pet = req.body;

        pet = await petController.update(pet, {_id: req.params.petId});

        return res.status(200).json(GenericResponse.success(pet,'Mascota almacenada en la bd'));

    } catch (error) {
        await session.abortTransaction();
        session.endSession();        
        return res.status(400).json(GenericResponse.error(error,'Error al guardar su mascota'));
    }
});

export default PetRoutes;