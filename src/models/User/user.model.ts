import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import IUser from './user.interface';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    phone: {
        type: String,
        default: null
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        default: null
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        default: null
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        validate: {
            validator: function(v: string) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
            },
            message: props => `${props.value} no es un correo valido`
        },
        default: null
    },
    pets: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        default: null
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    }],
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

userSchema.index({createdAt: 1});
userSchema.index({alive: 1});
userSchema.index({name: 1});
userSchema.index({lastName: 1});
userSchema.index({rol: 1});
userSchema.index({phone: 1});
userSchema.index({email: 1});

userSchema.method("comparePassword", function (password: string = ""): boolean {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }
});

userSchema.plugin(uniqueValidator, {message: 'El {PATH} {VALUE} ya existe'});

export const User = model<IUser>('User', userSchema);