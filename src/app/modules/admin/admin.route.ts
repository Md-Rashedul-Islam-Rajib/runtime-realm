import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const AdminRouter: Router = Router();

AdminRouter.post('/register',AdminControllers.registerAdmin);

export default AdminRouter;