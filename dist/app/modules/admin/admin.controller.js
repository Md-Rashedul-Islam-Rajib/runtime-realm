"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const admin_service_1 = require("./admin.service");
class AdminControllers {
}
exports.AdminControllers = AdminControllers;
_a = AdminControllers;
AdminControllers.registerAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield admin_service_1.AdminServices.registerAdmin(req.body);
    (0, sendResponse_1.default)(res, 201, true, 'Admin registered Successfully', data);
}));
AdminControllers.loginAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminServices.loginAdmin(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
    });
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
    });
    const data = { token: accessToken };
    (0, sendResponse_1.default)(res, 200, true, 'Login successful', data);
}));
AdminControllers.blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield admin_service_1.AdminServices.blockUser(req.params.userId, req.body);
    (0, sendResponse_1.default)(res, 200, true, 'User blocked successfully');
}));
AdminControllers.deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield admin_service_1.AdminServices.deleteBlog(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, 'Blog deleted successfully');
}));
