import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogCreationSchema } from "./blogs.validation";
import { BlogController } from "./blogs.controller";

const BlogRouter: Router = Router();

BlogRouter.post('/',validateRequest(blogCreationSchema), BlogController.createBlog);

export default BlogRouter;