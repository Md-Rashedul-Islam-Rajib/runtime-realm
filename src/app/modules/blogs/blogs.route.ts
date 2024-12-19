import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogCreationSchema, blogUpdateSchema } from "./blogs.validation";
import { BlogController } from "./blogs.controller";

const BlogRouter: Router = Router();

BlogRouter.post('/',validateRequest(blogCreationSchema), BlogController.createBlog);

BlogRouter.patch('/:id',validateRequest(blogUpdateSchema), BlogController.updateBlog);

export default BlogRouter;