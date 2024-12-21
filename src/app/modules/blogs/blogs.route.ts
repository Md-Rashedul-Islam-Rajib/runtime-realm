import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogCreationSchema, blogUpdateSchema } from './blogs.validation';
import { BlogController } from './blogs.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const BlogRouter: Router = Router();

BlogRouter.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogCreationSchema),
  BlogController.createBlog,
);

BlogRouter.get('/', BlogController.getAllBlogs);

BlogRouter.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogUpdateSchema),
  BlogController.updateBlog,
);

BlogRouter.delete(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogUpdateSchema),
  BlogController.deleteBlog,
);

export default BlogRouter;
