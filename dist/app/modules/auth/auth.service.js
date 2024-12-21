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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const statusFullError_1 = require("../../class/statusFullError");
const user_model_1 = require("../user/user.model");
const auth_utilities_1 = require("./auth.utilities");
const config_1 = __importDefault(require("../../config"));
class AuthServices {
    static registerUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield user_model_1.UserModel.isUserExists(payload.email);
            if (userExists) {
                throw new Error('this user already registered');
            }
            const data = yield user_model_1.UserModel.create(payload);
            const { _id, name, email } = data;
            const result = { _id, name, email };
            return result;
        });
    }
    static loginUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, auth_utilities_1.preValidatingUser)(payload.email);
            const isPasswordCorrect = yield user_model_1.UserModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
            if (!isPasswordCorrect) {
                throw new statusFullError_1.StatusFullError('AuthenticationError', 'Password is incorrect', true, 401);
            }
            const jwtPayload = {
                email: user.email,
                role: user.role,
            };
            const accessToken = (0, auth_utilities_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
            const refreshToken = (0, auth_utilities_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
            return {
                accessToken,
                refreshToken,
            };
        });
    }
}
exports.AuthServices = AuthServices;
