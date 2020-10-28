import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import IPet from "./pet.interface";

const petSchema = new Schema ({
<<<<<<< HEAD
    Owner: {
        type: Schema.Types.ObjectId,
       // required: [true, 'Se requiere la identificación del dueño']
       default: null
=======
    owner: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID del dueño es requerido']
>>>>>>> d19df192428eb35f57ad4eff0d9e7e07c6ed193c
    },
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    age: {
        type: Number,
<<<<<<< HEAD
        required: [true, 'Se requiere la edad']
=======
        required: [true, 'La edad es requerida']
>>>>>>> d19df192428eb35f57ad4eff0d9e7e07c6ed193c
    },
    breed: {
        type: String,
        required: [true, 'La raza es requerida <3']
    },
<<<<<<< HEAD
    char: {
        type: String,
        default: null
=======
    chars: {
        type: String,
        default: null,
    },
    alive: {
        type: Boolean,
        default: true
>>>>>>> d19df192428eb35f57ad4eff0d9e7e07c6ed193c
    }
}, {
    timestamps: {
        createdAt: 'createdAt'
    },
    versionKey: false
});

<<<<<<< HEAD
petSchema.plugin(uniqueValidator, {message: 'El {PATH} {VALUE} ya existe'});

export const Pet = model<IPet>('Pet',petSchema);
=======
petSchema.index({createdAt: 1});
petSchema.index({alive: 1});
petSchema.index({name: 1});
petSchema.index({name: 1, alive: 1, owner: 1}, {unique: true, partialFilterExpression: {
    alive: true
}});

petSchema.plugin(uniqueValidator, {message: 'El {PATH} {VALUE} ya existe'});

export const Pet = model<IPet>('Pet', petSchema);
>>>>>>> d19df192428eb35f57ad4eff0d9e7e07c6ed193c
