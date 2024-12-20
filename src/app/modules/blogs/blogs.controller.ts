import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { BlogServices } from "./blogs.service";

export class BlogController {
    static createBlog = catchAsync(async (req, res) => { 
        const data = await BlogServices.createBlog(req.body,req.user?.email);
        sendResponse(res, 201,true,"Blog created successfully", data);
    });
    
    static updateBlog = catchAsync(async (req, res) => { 
        const data = await BlogServices.updateBlog(req.params.id, req.body,req.user?.email);
        // const data = { result };
        sendResponse(res, 200,true,"Blog updated successfully", data);
    });

    static deleteBlog = catchAsync(async (req, res) => { 
        await BlogServices.deleteBlog(req.params.id,req.user?.email);
        sendResponse(res, 200,true,"Blog deleted successfully");
    });
}