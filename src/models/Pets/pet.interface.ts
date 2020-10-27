import { Document } from 'mongoose';

export default interface IPet extends Document {
    _id: string;
    Owner: string
    name: string;
    age: number;
    race: string;
    char: string
}
