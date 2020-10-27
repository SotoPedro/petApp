import { Response, NextFunction, Request } from 'express';
import GenericResponse from '../../utils/responses';

export const userStructure = async (req: any, res: Response, next: NextFunction) => {

    if(!req.body.name || !req.body.lastName) {
        return res.status(400).json(GenericResponse.error({}, 'Es necesario enviar el nombre y el apellido del usuario'));
    }
    if(!req.body.password) {
        return res.status(400).json(GenericResponse.error({}, 'Es necesario enviar la contraseña'));
    }

    return next();
};