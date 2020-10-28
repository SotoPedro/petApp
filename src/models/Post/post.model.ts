import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import IPost from './post.interface';

const postSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: [true,"User id is required"]
    },
    petName: {
        type: String,
        required: [true, "Pet Name is required"]
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

postSchema.plugin(uniqueValidator,{meesage: "El {PATH} {VALUE} ya existe"});

export const Post = model<IPost>('Post',postSchema);