import { Response, NextFunction, Request } from 'express';
import GenericResponse from '../../utils/responses';

export const petStructure = async (req: any, res: Response, next: NextFunction) => {

    if(!req.body.name) {
        return res.status(400).json(GenericResponse.error({},'Es necesario el nombre de la mascota'))
    } 
    /*if (!req.body.Owner) {  
        return res.status(400).json(GenericResponse.error({},'Es necesario el identificador de dueño'))
    }*/

    return next();
}