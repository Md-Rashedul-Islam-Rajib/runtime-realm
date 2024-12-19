import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { BlogServices } from "./blogs.service";

export class BlogController {
    static createBlog = catchAsync(async (req, res) => { 
        const result = await BlogServices.createBlog(req.body);
        const data = { result };
        sendResponse(res, 201,true,"Blog created successfully", data);
    });
}