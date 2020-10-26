import { Response, NextFunction } from "express";
import GenericResponse from '../utils/responses';


export const imageRequired =  async (req: any, res: Response, next: NextFunction) => {

    if(!req.files || req.files.image) {
        return res.status(400).json(GenericResponse.error({}, 'Es necesario subir una imagen'));
    } else if(!req.files.image.mimeType?.includes('image')) {
        return res.status(400).json(GenericResponse.error({}, 'El archivo subido no es una imagen'));
    }

    req.image = {
        createdBy: '/**/',
        updatedBy: '/**/'
    };

    return next();
};

export const imageIncluded = async (req: any, res: Response, next: NextFunction) => {
    
    if(req.files) {
        if(!req.files.image) {
            return res.status(400).json(GenericResponse.error({}, 'La imagen viene en el campo incorrecto'));
        } else if(!req.files.image.mimeType?.includes('image')) {
            return res.status(400).json(GenericResponse.error({}, 'El archivo subido no es una imagen'));
        }
        
        req.image = {
            createdBy: '/**/',
            updatedBy: '/**/',
        };
    }
    
    return next();
};

export const imagesIncluded = async (req: any, res: Response, next: NextFunction) => {
    
    if(req.files) {
        if(!req.files.images) {
            return res.status(400).json(GenericResponse.error({}, 'La imagen viene en el campo incorrecto'));
        }

        req.files.images = new Array().concat(req.files.images);

        if(req.files.images.length > 15) {
            return res.status(400).json(GenericResponse.error({}, 'Sólo se aceptan 15 imágenes'));
        }

        let images = [];

        for(const image of req.files.images) {
            if(!image.mimeType?.includes('image')) {
                return res.status(400).json(GenericResponse.error({}, 'Sólo se pueden subir imágenes'));
            }

            images.push({
                createdBy: '/**/',
                updatedBy: '/**/'
            });
        }

        req.images = images;
    }

    return next();
};

export const imagesRequired = async (req: any, res: Response, next: NextFunction) => {

    if(!req.files || !req.files.images || !Array.isArray(req.files.images)) {
        return res.status(400).json(GenericResponse.error({}, 'Es necesario enviar al menos una imagen'));
    }

    return next();
};