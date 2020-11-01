import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import IPet from "./pet.interface";

const petSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    age: {
        type: Number,
        required: [true, 'La edad es requerida']
    },
    breed: {
        type: String,
        required: [true, 'La raza es requerida <3']
    },
    chars: {
        type: String,
        default: null,
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
petSchema.index({createdAt: 1});
petSchema.index({alive: 1});
petSchema.index({name: 1});

petSchema.plugin(uniqueValidator, {message: 'El {PATH} {VALUE} ya existe'});

export const Pet = model<IPet>('Pet', petSchema);

