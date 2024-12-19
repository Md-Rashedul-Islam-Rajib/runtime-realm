import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AuthServices } from "./auth.service";

export class AuthControllers {
    static registerUser = catchAsync(async (req, res) => {
        const result = await AuthServices.registerUser(req.body);
        sendResponse(res,201,true,"User registered Successfully",result);
    });
}