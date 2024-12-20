import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userCreationSchema } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const AuthRouter: Router = Router();

AuthRouter.post('/register', validateRequest(userCreationSchema), AuthControllers.registerUser);

AuthRouter.post('/login',auth(USER_ROLE.admin), AuthControllers.loginUser);

export default AuthRouter;