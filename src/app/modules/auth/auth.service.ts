import { UserModel } from "../user/user.model";
import { TUser } from "../user/user.types";

export class AuthServices {
    static async registerUser( payload: TUser ) { 
        const userExists = await UserModel.isUserExists(payload.email);
        if (userExists) {
            throw new Error("this user already registered");
        }
        const result = await UserModel.create(payload);
        return result;
    };
}
