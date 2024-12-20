import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const AdminRouter: Router = Router();

AdminRouter.post('/register', AdminControllers.registerAdmin);

AdminRouter.post('/login', AdminControllers.loginAdmin);

AdminRouter.patch('/user/:userId/block',AdminControllers.blockUser);

export default AdminRouter;