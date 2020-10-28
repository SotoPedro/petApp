import { Response, NextFunction, Request } from 'express';
import GenericResponse from '../../utils/responses';

export const postStructure = async (req: any, res: Response, next: NextFunction) => {

    if(!req.body.owner) {
        return res.status(400).json(GenericResponse.error({},"Es necesario el identificador del dueño"))
    }

    return next();
}