import { Document } from 'mongoose';

export default interface IUser extends Document {
    _id: string;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    rol: string;
    createdAt: Date;
    updatedAt: Date;
    alive: boolean;
    comparePassword(password: string): boolean;
}