"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const blogs_route_1 = __importDefault(require("../modules/blogs/blogs.route"));
const admin_route_1 = __importDefault(require("../modules/admin/admin.route"));
const router = (0, express_1.Router)();
const allRoutes = [
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/blogs',
        route: blogs_route_1.default,
    },
    {
        path: '/admin',
        route: admin_route_1.default,
    },
];
allRoutes.forEach((singleRoute) => router.use(singleRoute.path, singleRoute.route));
exports.default = router;
