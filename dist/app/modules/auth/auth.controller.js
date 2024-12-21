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
exports.AuthControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const auth_service_1 = require("./auth.service");
class AuthControllers {
}
exports.AuthControllers = AuthControllers;
_a = AuthControllers;
AuthControllers.registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield auth_service_1.AuthServices.registerUser(req.body);
    (0, sendResponse_1.default)(res, 201, true, 'User registered Successfully', data);
}));
AuthControllers.loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
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
