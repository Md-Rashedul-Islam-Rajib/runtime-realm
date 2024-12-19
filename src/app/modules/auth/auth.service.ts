import { UserModel } from "../user/user.model";
import { TUser } from "../user/user.types";
import { TLoginUser } from "./auth.types";
import { preValidatingUser } from "./auth.utilities";

export class AuthServices {
    static async registerUser( payload: TUser ) { 
        const userExists = await UserModel.isUserExists(payload.email);
        if (userExists) {
            throw new Error("this user already registered");
        }
        const result = await UserModel.create(payload);
        return result;
    };

    static async loginUser(payload: TLoginUser) {
        const user = await preValidatingUser(payload.email);

        const isPasswordCorrect = await UserModel.isPasswordMatched(
            payload?.password,
            user?.password,
        );
        
        if (!isPasswordCorrect) {
            throw new Error('password is incorrect');
        }

    }
}
