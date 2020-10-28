import { Document } from 'mongoose';

export default interface IPost extends Document {
    _id: string;
    owner: string;
    petName: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    alive: boolean;

}