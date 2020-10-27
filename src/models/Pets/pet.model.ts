import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import IPet from "./Pet.interface";

const PetSchema = new Schema ({
    Owner: {
        type: Schema.Types.ObjectId,
       // required: [true, 'Se requiere la identificación del dueño']
    },
    name: {
        type: String,
        required: [true, 'Se requiere el nombre de la mascota']
    },
    age: {
        type: Schema.Types.Number,
        required: [true, 'Se requiere la edad']
    },
    race: {
        type: String,
        required: [true, 'Se requiere una raza']
    },
    char: {
        type: String
    }
});

PetSchema.plugin(uniqueValidator, {message: 'El {PATH} {VALUE} ya existe'});

export const Pet = model<IPet>('Pet',PetSchema);