import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.types';
import config from '../config';
import { preValidatingUser } from '../modules/auth/auth.utilities';
import catchAsync from '../utilities/catchAsync';

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, _res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new Error('You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId} = decoded;

    const user = await preValidatingUser(userId);

    if (roles && !roles.includes(role)) {
      throw new Error('you are not authorized');
    }

    req.user = decoded;
    next();
  });
};

export default auth;
