"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateSchema = exports.blogCreationSchema = void 0;
const zod_1 = require("zod");
exports.blogCreationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
    // author: z.string()
});
exports.blogUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
