import { StatusFullError } from './../../class/statusFullError';
import config from '../../config';
import { TLoginUser } from '../auth/auth.types';
import { createToken, preValidatingUser } from '../auth/auth.utilities';
import { UserModel } from '../user/user.model';
import { TUser } from '../user/user.types';
import { TBlogs } from '../blogs/blogs.types';
import { BlogModel } from '../blogs/blogs.model';

export class AdminServices {
  static async registerAdmin(payload: TUser) {
    const adminCount = await UserModel.findOne({ role: 'admin' });
    if (adminCount) {
      throw new StatusFullError(
        'AuthenticationError',
        'admin already registered',
        false,
        403,
      );
    }
    const result = await UserModel.create(payload);
    return result;
  }

  static async loginAdmin(payload: TLoginUser) {
    const admin = await preValidatingUser(payload.email);

    const isPasswordCorrect = await UserModel.isPasswordMatched(
      payload?.password,
      admin?.password,
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
      email: admin.email,
      role: admin.role,
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

  static async blockUser(id: string, payload: Pick<TUser, 'isBlocked'>) {
    const user = preValidatingUser(id);
    if (!user) {
      throw new StatusFullError(
        'NotFoundError',
        'user is not found',
        false,
        400,
      );
    }
    const result = await UserModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return result;
  }

  static async deleteBlog(id: string, payload: Pick<TBlogs, 'isDeleted'>) {
    const isBlogExists = await BlogModel.findById(id);
    if (!isBlogExists) {
      throw new StatusFullError(
        'NotFoundError',
        'blog is not found',
        false,
        400,
      );
    }
    if (isBlogExists.isDeleted) {
      throw new StatusFullError(
        'ValidationError',
        'blog is already deleted',
        false,
        400,
      );
    }
    const result = await BlogModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return result;
  }
}
