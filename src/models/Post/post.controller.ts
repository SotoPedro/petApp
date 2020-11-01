import { clearObject, clearFilters } from '../../utils/functions';
import { Post } from './post.model';

class PostController {

    async save(post: any) {

        return Post.create(post);

    }
    
    async update(post: any, filters: any, newsChanged = true, lean: boolean = true) {     

        post = clearObject(post);

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

    async getOne(filters: any, population: boolean = true, lean: boolean = true) {

        filters = clearFilters(filters);

        let populate: any[] = [];

        if(population) {
            populate = [
                // { path: 'owner' },
                { path: 'pet' }
            ];
        }

        return Post.findOne(filters).populate(populate).lean(lean);
    }

    async getAll(limit: number, skip: number, filters: any, all: boolean = false, population: boolean = false, lean: boolean = true) {

        let posts;

        filters = clearFilters(filters);

        let populate: any[] = [];

        if(population) {
            populate = [
                // { path: 'owner' },
                { path: 'pet' }
            ];
        }

        if(all) {
            posts = Post.find(filters).populate(populate).sort({createdAt: -1}).lean(lean);
        } 
        else {
            posts = Post.find(filters).populate(populate).sort({createdAt: -1}).skip(skip).limit(limit).lean(lean);
        }

        const count = Post.find(filters).countDocuments();

        return Promise.all([posts, count]);
        
    }
}

const postController = new PostController();

export default postController;