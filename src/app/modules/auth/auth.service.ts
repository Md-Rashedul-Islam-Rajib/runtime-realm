import { StatusFullError } from '../../class/statusFullError';
import { UserModel } from '../user/user.model';
import { TUser } from '../user/user.types';
import { TLoginUser } from './auth.types';
import { createToken, preValidatingUser } from './auth.utilities';
import config from '../../config';

export class AuthServices {
  static async registerUser(payload: TUser) {
    const userExists = await UserModel.isUserExists(payload.email);
    if (userExists) {
      throw new Error('this user already registered');
    }
    const data = await UserModel.create(payload);
    const { _id, name, email } = data;
    const result = { _id, name, email };
    return result;
  }

  static async loginUser(payload: TLoginUser) {
    const user = await preValidatingUser(payload.email);

    const isPasswordCorrect = await UserModel.isPasswordMatched(
      payload?.password,
      user?.password,
    );

    if (!isPasswordCorrect) {
      throw new StatusFullError(
        'AuthenticationError',
        'Password is incorrect',
        true,
        401,
      );
    }

    const jwtPayload = {
      email: user.email,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret,
      config.jwt_access_expires_in,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret,
      config.jwt_refresh_expires_in,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
