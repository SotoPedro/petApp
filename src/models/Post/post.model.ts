import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import IPost from './post.interface';

const postSchema = new Schema({
    content: {
        type: String,
        required: [true, 'El contenido es requerido']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El ID del dueño es requerido']
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: [true, 'El ID de la mascota es requerido']
    },
    status: {
        type: Boolean,
        default: true
    },
    alive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt'
    },
    versionKey: false
});
postSchema.index({alive: 1});
postSchema.index({owner: 1});
postSchema.index({owner: 1, pet: 1, alive: 1}, {unique: true, partialFilterExpression: {
    alive: true
}});

postSchema.plugin(uniqueValidator,{meesage: "El {PATH} {VALUE} ya existe"});

export const Post = model<IPost>('Post',postSchema);