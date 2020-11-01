import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import IPost from './post.interface';

const postSchema = new Schema({
    content: {
        type: String,
        required: [true, 'El contenido es requerido']
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

postSchema.plugin(uniqueValidator,{ message: "El {PATH} {VALUE} ya existe" });

export const Post = model<IPost>('Post',postSchema);