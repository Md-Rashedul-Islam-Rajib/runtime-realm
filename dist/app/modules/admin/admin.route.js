"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const AdminRouter = (0, express_1.Router)();
AdminRouter.post('/register', admin_controller_1.AdminControllers.registerAdmin);
AdminRouter.post('/login', admin_controller_1.AdminControllers.loginAdmin);
AdminRouter.patch('/users/:userId/block', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.AdminControllers.blockUser);
AdminRouter.delete('/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.AdminControllers.deleteBlog);
exports.default = AdminRouter;
