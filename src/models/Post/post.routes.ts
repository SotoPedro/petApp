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

export default PostRoutes;