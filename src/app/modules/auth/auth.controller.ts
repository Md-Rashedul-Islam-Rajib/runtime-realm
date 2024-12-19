import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { AuthServices } from './auth.service';

export class AuthControllers {
  static registerUser = catchAsync(async (req, res) => {
    const data = await AuthServices.registerUser(req.body);
    sendResponse(res, 201, true, 'User registered Successfully', data);
  });

  static loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    const data = { token: accessToken };
    sendResponse(res, 200, true, 'User logged in successfully', data);
  });
}
