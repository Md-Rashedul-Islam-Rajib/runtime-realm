import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const AdminRouter: Router = Router();

AdminRouter.post('/register', AdminControllers.registerAdmin);

AdminRouter.post('/login', AdminControllers.loginAdmin);

AdminRouter.patch('/user/:userId/block',auth(USER_ROLE.admin),AdminControllers.blockUser);

export default AdminRouter;