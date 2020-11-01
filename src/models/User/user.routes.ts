import { Router, Response } from "express";
import GenericResponse from '../../utils/responses';
import { filters } from "../../middlewares/filters";
import userController from "./user.controller";
import { imageIncluded } from "../../middlewares/files";
// import aws from "../../services/aws.service";
// import fileController from "../File/file.controller";
import bcrypt from 'bcryptjs';
// import { 
//     createConfigUsersAndGroups, 
//     viewConfigUsersAndGroups, 
//     editConfigUsersAndGroups, 
//     deleteConfigUsersAndGroups 
// } from "../../middlewares/permissions";
import { userStructure } from "./user.middleware";

const UserRoutes = Router();

UserRoutes.get('/',(req,res) => { res.send("From UserRoute")});

UserRoutes.post('', [userStructure, imageIncluded], async (req: any, res: Response) => {

    try {

        const newUser = req.body;

        newUser.password = bcrypt.hashSync(req.body.password.toString(), 10);

        // if(req.image) {

        //     const file: any = req.files.image;

        //     const data = aws.generateKey(file.name, `users/${newUser.name} ${newUser.lastName}`);
    
        //     const [fileUploaded] = await fileController.save(req.image, file, data.Key, data.fileName);

        //     newUser.image = fileUploaded._id;
        // }


        const [user] = await userController.save(newUser);

        return res.status(200).json(GenericResponse.success(user, 'Se guardó el usuario correctamente'));

    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al guardar el usuario"));
    }
});

UserRoutes.get('/list', [filters], async (req: any, res: Response) => {

    try {

        if(req.query.search) {
            req.query.filters.email = req.query.search;
        }

        const [users, count] = await userController.getAll(req.query.limit, req.query.skip, req.query.filters, req.query.all, true);

        let pagination = {};

        let totalItems = count ? count : 0

        if(!req.query.all) {
            const pages = Math.ceil((totalItems / req.query.limit ));

            pagination = {
                perPage: req.query.limit,
                pages
            };
        }
        
        return res.status(200).json(GenericResponse.success({
            users,
            count: totalItems,
            ...pagination
        }, "Se obtuvieron los usuarios correctamente"));
    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al obtener los usuarios"));
    }
});

UserRoutes.put('/:userId', [imageIncluded], async (req: any, res: Response) => {

    try {

        let user = req.body;

        [user] = await Promise.all([
            userController.update(user, {_id: req.params.userId}, true, false)
        ]);

        if(!user) {
            return res.status(410).json(GenericResponse.error(req.body, "El usuario que desea modificar no existe"));
        }

        // if(req.image) {

        //     const file: any = req.files.image;

        //     const data = aws.generateKey(file.name, `users/${user.name} ${user.lastName}`);
    
        //     const [fileUploaded] = await fileController.save(req.image, file, data.Key, data.fileName);

        //     user.image = fileUploaded._id;

        //     await user.save();
        // }
        
        return res.status(200).json(GenericResponse.success(user, "Se ha modificado el usuario correctamente"));
    } catch (error) {

        return res.status(400).json(GenericResponse.error(error, "Error al modificar el usuario"));
    }
});

UserRoutes.delete('/:userId', [], async (req: any, res: Response) => {

    try {
        
        const user = await userController.delete(req.user, {_id: req.params.userId});

        if(!user) {
            return res.status(410).json(GenericResponse.error({}, "El usuario que desea eliminar no existe"));
        }

        return res.status(200).json(GenericResponse.success(user, "Se elimino el usuario correctamente"));
    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al eliminar el usuario"));
    }
});

UserRoutes.get('/single/:userId', [], async (req: any, res: Response) => {

    try {

        const user = await userController.getOne({_id: req.params.userId}, true);

        if(!user) {
            return res.status(410).json(GenericResponse.error({}, "El usuario que desea obtener no existe"));
        }
        
        return res.status(200).json(GenericResponse.success(user, "Se obtuvo el usuario correctamente"));
    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al obtener el usuario"));
    }
});

export default UserRoutes;