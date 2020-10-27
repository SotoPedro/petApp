import { Router, Response } from "express";
import GenericResponse from '../../utils/responses';
import { filters } from "../../middlewares/filters";
import petController from "./Pet.controller";
import { imageIncluded } from "../../middlewares/files";

import { petStructure } from "./pet.middleware";
import DB from "../../db";
import { Pet } from "./pet.model";

const db = DB.instance;

const PetRoutes = Router();

PetRoutes.get('/',(req, res ) => { res.send("From PetRoutes")});

PetRoutes.post('',[petStructure,imageIncluded],async (req: any, res: Response) => {

    const session = await db.db.startSession();

    session.startTransaction();

    try {

        const newPet = req.body;        

        const [pet] = await petController.save(newPet,session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(GenericResponse.success({},'Mascota almacenada en la bd'));

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        return res.status(400).json(GenericResponse.error({},'Error al guardar su mascota'));
    }
});

export default PetRoutes;