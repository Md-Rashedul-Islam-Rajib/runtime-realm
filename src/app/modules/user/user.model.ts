import { model, Schema } from "mongoose";
import { TUser } from "./user.types";

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
        },
        
        email: {
                type: String,
                required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['admin','user']
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
        
    }, {
        timestamps: true,
        versionKey: false
    }
);

export const UserModel = model<TUser>('user',userSchema);