"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blogs_validation_1 = require("./blogs.validation");
const blogs_controller_1 = require("./blogs.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const BlogRouter = (0, express_1.Router)();
BlogRouter.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blogs_validation_1.blogCreationSchema), blogs_controller_1.BlogController.createBlog);
BlogRouter.get('/', blogs_controller_1.BlogController.getAllBlogs);
BlogRouter.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blogs_validation_1.blogUpdateSchema), blogs_controller_1.BlogController.updateBlog);
BlogRouter.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blogs_validation_1.blogUpdateSchema), blogs_controller_1.BlogController.deleteBlog);
exports.default = BlogRouter;
