import { Document } from 'mongoose';

export default interface IPost extends Document {
    _id: string;
    content: string;
    owner: string;
    pet: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    alive: boolean;
}