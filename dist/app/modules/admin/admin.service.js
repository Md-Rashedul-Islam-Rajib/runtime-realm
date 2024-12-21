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
exports.AdminServices = void 0;
const statusFullError_1 = require("./../../class/statusFullError");
const config_1 = __importDefault(require("../../config"));
const auth_utilities_1 = require("../auth/auth.utilities");
const user_model_1 = require("../user/user.model");
const blogs_model_1 = require("../blogs/blogs.model");
class AdminServices {
    static registerAdmin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminCount = yield user_model_1.UserModel.findOne({ role: 'admin' });
            if (adminCount) {
                throw new statusFullError_1.StatusFullError('AuthenticationError', 'admin already registered', false, 403);
            }
            const result = yield user_model_1.UserModel.create(payload);
            return result;
        });
    }
    static loginAdmin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield (0, auth_utilities_1.preValidatingUser)(payload.email);
            const isPasswordCorrect = yield user_model_1.UserModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, admin === null || admin === void 0 ? void 0 : admin.password);
            if (!isPasswordCorrect) {
                throw new statusFullError_1.StatusFullError('AuthenticationError', 'Password is incorrect', true, 401);
            }
            const jwtPayload = {
                email: admin.email,
                role: admin.role,
            };
            const accessToken = (0, auth_utilities_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
            const refreshToken = (0, auth_utilities_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
            return {
                accessToken,
                refreshToken,
            };
        });
    }
    static blockUser(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (0, auth_utilities_1.preValidatingUser)(id);
            if (!user) {
                throw new statusFullError_1.StatusFullError('NotFoundError', 'user is not found', false, 400);
            }
            const result = yield user_model_1.UserModel.findByIdAndUpdate(id, payload, {
                new: true,
            });
            return result;
        });
    }
    static deleteBlog(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const isBlogExists = yield blogs_model_1.BlogModel.findById(id);
            if (!isBlogExists) {
                throw new statusFullError_1.StatusFullError('NotFoundError', 'blog is not found', false, 400);
            }
            if (isBlogExists.isDeleted) {
                throw new statusFullError_1.StatusFullError('ValidationError', 'blog is already deleted', false, 400);
            }
            const result = yield blogs_model_1.BlogModel.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true,
            });
            return result;
        });
    }
}
exports.AdminServices = AdminServices;
