"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post('/register', (0, validateRequest_1.default)(user_validation_1.userCreationSchema), auth_controller_1.AuthControllers.registerUser);
AuthRouter.post('/login', auth_controller_1.AuthControllers.loginUser);
exports.default = AuthRouter;
