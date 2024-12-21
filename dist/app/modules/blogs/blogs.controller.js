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
exports.BlogController = void 0;
const catchAsync_1 = __importDefault(require("../../utilities/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const blogs_service_1 = require("./blogs.service");
class BlogController {
}
exports.BlogController = BlogController;
_a = BlogController;
BlogController.createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const data = yield blogs_service_1.BlogServices.createBlog(req.body, (_b = req.user) === null || _b === void 0 ? void 0 : _b.email);
    (0, sendResponse_1.default)(res, 201, true, 'Blog created successfully', data);
}));
BlogController.getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield blogs_service_1.BlogServices.getAllblogs(req.query);
    (0, sendResponse_1.default)(res, 200, true, 'Blogs fetched successfully', data);
}));
BlogController.updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const data = yield blogs_service_1.BlogServices.updateBlog(req.params.id, req.body, (_b = req.user) === null || _b === void 0 ? void 0 : _b.email);
    // const data = { result };
    (0, sendResponse_1.default)(res, 200, true, 'Blog updated successfully', data);
}));
BlogController.deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    yield blogs_service_1.BlogServices.deleteBlog(req.params.id, req.body, (_b = req.user) === null || _b === void 0 ? void 0 : _b.email);
    (0, sendResponse_1.default)(res, 200, true, 'Blog deleted successfully');
}));
