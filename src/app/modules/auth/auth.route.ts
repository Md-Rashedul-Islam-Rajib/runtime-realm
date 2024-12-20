import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userCreationSchema } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";

const AuthRouter: Router = Router();

AuthRouter.post('/register', validateRequest(userCreationSchema), AuthControllers.registerUser);

AuthRouter.post('/login', AuthControllers.loginUser);

export default AuthRouter;