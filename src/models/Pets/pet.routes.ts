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

        if(!pet) {
            return res.status(410).json(GenericResponse.error(req.body, "La mascota que desea modificar no existe"));
        }

        // if(req.image) {

        //     const file: any = req.files.image;

        //     const data = aws.generateKey(file.name, `clubs`);
    
        //     const [fileUploaded] = await fileController.save(req.image, file, data.Key, data.fileName);

        //     club.image = fileUploaded._id;

        //     await club.save();
        // }
        
        return res.status(200).json(GenericResponse.success(pet, "Se ha modificado el club correctamente"));

    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al modificar el club"));
    }
});

PetRoutes.delete('/:petId', [], async (req: any, res: Response) => {

    try {
        
        const pet = await petController.delete(req.user, {_id: req.params.petId});

        if(!pet) {
            return res.status(410).json(GenericResponse.error({}, "La mascota que desea eliminar no existe"));
        }

        return res.status(200).json(GenericResponse.success(pet, "Se eliminó la mascota correctamente"));

    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al eliminar el club"));
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
        return res.status(400).json(GenericResponse.error(error, "Error al obtener el club"));
    }
});

export default PetRoutes;