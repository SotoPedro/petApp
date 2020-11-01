import { Router, Response } from "express";
import GenericResponse from '../../utils/responses';
import { filters } from "../../middlewares/filters";
import postController from './post.controller';
import userController from '../User/user.controller';

const PostRoutes = Router();

PostRoutes.get('/',(req: any,res: Response) => { res.send("From Post Route")});

PostRoutes.post('', [],async (req: any, res: Response) => {

    try {

        const user: any = await userController.getOne({ _id: req.body.owner }, false, false);
        delete req.body.owner;

        const newPost = req.body;
        const post = await postController.save(newPost);

        user.posts.push(post._id);
        await user.save();

        return res.status(200).json(GenericResponse.success(post, 'Se guardó el post correctamente'));

    } catch (err) {
        return res.status(400).json(GenericResponse.error(err, 'Error al guardar el post'));
    }
});

PostRoutes.get('/list', [filters], async (req: any, res: Response) => {

    try {

        if(req.query.search) {
            req.query.filters.name = req.query.search;
        }

        const [posts, count] = await postController.getAll(req.query.limit, req.query.skip, req.query.filters, req.query.all, true);

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
        }, 'Se obtuvieron los posts correctamente'));
    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, 'Error al obtener los posts'));
    }
});

PostRoutes.put('/:postId', [], async (req: any, res: Response) => {

    try {

        let post = req.body;

        post = await postController.update(post, {_id: req.params.postId});

        return res.status(200).json(GenericResponse.success(post, 'Se actualizó el post correctamente'));

    } catch (error) {       
        return res.status(400).json(GenericResponse.error(error, 'Error al actualizar el post'));
    }
});


PostRoutes.delete('/:postId', [], async (req: any, res: Response) => {

    try {
        
        const pet = await postController.delete(null, {_id: req.params.postId});

        if(!pet) {
            return res.status(410).json(GenericResponse.error({}, "El post que desea eliminar no existe"));
        }

        return res.status(200).json(GenericResponse.success(pet, "Se eliminó el post correctamente"));

    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al eliminar el post"));
    }
});

PostRoutes.get('/single/:postId', [], async (req: any, res: Response) => {

    try {
        
        const pet = await postController.getOne({_id: req.params.postId}, true);
        
        if(!pet) {
            return res.status(410).json(GenericResponse.error({}, "el post que desea obtener no existe"));
        }
        
        return res.status(200).json(GenericResponse.success(pet, "Se obtuvo el post correctamente"));

    } catch (error) {
        return res.status(400).json(GenericResponse.error(error, "Error al obtener el post"));
    }
});


export default PostRoutes;