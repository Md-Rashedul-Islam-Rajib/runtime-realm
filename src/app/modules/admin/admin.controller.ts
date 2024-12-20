import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AdminServices } from "./admin.service";

export class AdminControllers {
  static registerAdmin = catchAsync(async (req, res) => {
    const data = await AdminServices.registerAdmin(req.body);
    sendResponse(res, 201, true, 'Admin registered Successfully', data);
  });

  static loginAdmin = catchAsync(async (req, res) => {
    const result = await AdminServices.loginAdmin(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });

    const data = { token: accessToken };
    sendResponse(res, 200, true, 'Login successful', data);
  });

    
    static blockUser = catchAsync(async (req, res) => {
       await AdminServices.blockUser(req.params.userId, req.body);
        sendResponse(res,200,true,"User blocked successfully");
    });
    
    static deleteBlog = catchAsync(async (req, res) => { 
        await AdminServices.deleteBlog(req.params.id, req.body);
        sendResponse(res,200,true,"Blog deleted successfully");
    });
}