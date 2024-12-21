import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const AdminRouter: Router = Router();

AdminRouter.post('/register', AdminControllers.registerAdmin);

AdminRouter.post('/login', AdminControllers.loginAdmin);

AdminRouter.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockUser,
);

AdminRouter.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  AdminControllers.deleteBlog,
);

export default AdminRouter;
