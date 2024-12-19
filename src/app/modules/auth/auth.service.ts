

import { Document } from "mongoose";
import { UserModel } from "../user/user.model";
import { TUser } from "../user/user.types";

export class AuthServices {
    static async registerUser( payload: TUser & Document ) { 
        const userExists = await UserModel.isUserExists(payload._id as string);
        if (userExists) {
            throw new Error("this user already registered");
        }
        const user
    };
}
