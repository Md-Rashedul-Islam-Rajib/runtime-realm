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
exports.BlogServices = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const statusFullError_1 = require("../../class/statusFullError");
const user_model_1 = require("../user/user.model");
const blogs_model_1 = require("./blogs.model");
class BlogServices {
    static createBlog(payload, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = yield user_model_1.UserModel.findOne({ email });
            if (!author) {
                throw new statusFullError_1.StatusFullError('AuthenticationError', 'User not found', true, 401);
            }
            payload.author = author._id;
            const data = yield blogs_model_1.BlogModel.create(payload);
            const result = {
                _id: data._id,
                title: data.title,
                content: data.content,
                author: {
                    _id: author._id,
                    name: author.name,
                    email: author.email,
                },
            };
            return result;
        });
    }
    static getAllblogs(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogQuery = new queryBuilder_1.default(blogs_model_1.BlogModel.find({ isDeleted: { $ne: true } }, { isDeleted: 0 }), query)
                .filter()
                .authorFilter()
                .search(['title', 'content'])
                .sort();
            //   .paginate()
            //   .fields();
            const result = blogQuery.getQuery().exec();
            return result;
        });
    }
    static updateBlog(id, payload, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email });
            if (!user) {
                throw new statusFullError_1.StatusFullError('NotFoundError', 'User not found', true, 404);
            }
            const blog = yield blogs_model_1.BlogModel.findOne({ _id: id, author: user._id });
            console.log(blog);
            console.log(`userId: ${user._id} and authorId ${blog === null || blog === void 0 ? void 0 : blog.author._id}`);
            if (!blog) {
                throw new statusFullError_1.StatusFullError('AuthorizationError', 'You are not the owner of this blog', true, 403);
            }
            const isBlogExists = yield blogs_model_1.BlogModel.findById(id);
            if (!isBlogExists) {
                throw new statusFullError_1.StatusFullError('NotFoundError', 'Blog not found', true, 404);
            }
            const result = yield blogs_model_1.BlogModel.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true,
            });
            return result;
        });
    }
    static deleteBlog(id, payload, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email });
            if (!user) {
                throw new statusFullError_1.StatusFullError('NotFoundError', 'User not found', true, 404);
            }
            const Blog = yield blogs_model_1.BlogModel.findOne({ _id: id, author: user._id });
            if (!Blog) {
                throw new statusFullError_1.StatusFullError('AuthorizationError', 'You are not the owner of this blog', true, 403);
            }
            const isBlogExists = yield blogs_model_1.BlogModel.findById(id);
            if (!isBlogExists) {
                throw new statusFullError_1.StatusFullError('NotFoundError', 'Blog not found', true, 404);
            }
            const result = yield blogs_model_1.BlogModel.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true,
            });
            return result;
        });
    }
}
exports.BlogServices = BlogServices;
