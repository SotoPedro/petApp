import { Document } from 'mongoose';

export default interface IPet extends Document {
    _id: string;
    name: string;
    breed: string;
    chars: string
    age: number;
    createdAt: Date;
    updatedAt: Date;
    alive: boolean;
}
