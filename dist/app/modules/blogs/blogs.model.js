"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
blogSchema.pre(/^find/, function (next) {
    const query = this;
    query
        .find({ isDeleted: { $eq: false } })
        .select('-createdAt -updatedAt')
        .populate('author', 'name email');
    next();
});
exports.BlogModel = (0, mongoose_1.model)('Blog', blogSchema);
