import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AdminServices } from "./admin.service";

export class AdminControllers {
  static registerAdmin = catchAsync(async (req, res) => {
    const data = await AdminServices.registerAdmin(req.body);
    sendResponse(res, 201, true, 'Admin registered Successfully', data);
  });
}