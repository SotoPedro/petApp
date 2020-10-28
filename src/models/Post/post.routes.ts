import { Router, Response } from "express";
import GenericResponse from '../../utils/responses';
import { filters } from "../../middlewares/filters";
import postController from './post.controller';
import { imageIncluded } from "../../middlewares/files";
import { Post } from "./post.model";

const PostRoutes = Router();

PostRoutes.get('/',(req: any,res: Response) => { res.send("From Post Route")});

PostRoutes.post('',[imageIncluded],async (req: any, res: Response) => {

    try {
        const newPost = req.body;

        const post = await postController.save(newPost);

        return res.status(200).json(GenericResponse.success(post, 'Se ha generado el post'));
    } catch (err) {
        return res.status(400).json(GenericResponse.error(err,"No se pudo guardar el post"));
    }
});

PostRoutes.get('/list', [filters], async (req: any, res: Response) => {

    try {

        if(req.query.search) {
            req.query.filters.name = req.query.search;
        }
        if(req.query.unit) {
            req.query.filters.unit = req.query.unit;
        }

        const [posts, count] = await postController.getAll(req.query.limit, req.query.skip, req.query.filters, req.query.all, req.query.populate);

        let pagination = {};

        if(!req.query.all) {
            const pages = Math.ceil((count / req.query.limit ));

            pagination = {
                perPage: req.query.limit,
                pages
            };
        }
        
        return res.status(200).json(GenericResponse.success({
            posts,
            count,
            ...pagination
        }, "Se obtuvieron las publicaciones correctamente"));
    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al obtener las mascotas"));
    }
});

PostRoutes.put('/:postId', [imageIncluded], async (req: any, res: Response) => {

    try {

        let post = req.body;

        post = await postController.update(post, {_id: req.params.postId});

        return res.status(200).json(GenericResponse.success(post,'Post Actualizado'));

    } catch (error) {
        //await session.abortTransaction();
        //session.endSession();        
        return res.status(400).json(GenericResponse.error(error,'Error al quitar el post'));
    }
});


export default PostRoutes;