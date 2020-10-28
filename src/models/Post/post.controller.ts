import { clearObject, clearFilters } from '../../utils/functions';
import { Post } from './post.model';
import { filter } from 'compression';

class PostController {

    async save(post: any) {

        return Post.create(post);

    }
    
    async update(user: any, filters: any, newsChanged = true, lean: boolean = true) {

        const post  = {
            status: false,
        }        

        filters = clearFilters(filters);

        return Post.findOneAndUpdate(filters,post,{new: newsChanged}).lean(lean);
    }

    async delete(user: any, filters: any, newsChanged = true, lean: boolean = true) {

        const post  = {
            alive: false,
        }        

        filters = clearFilters(filters);

        return Post.findOneAndUpdate(filters,post,{new: newsChanged}).lean(lean);
    }    
}

const postController = new PostController();

export default postController;