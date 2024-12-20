import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.types";

const adminSchema = new Schema<TAdmin>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export const AdminModel = model<TAdmin>('Admin',adminSchema);