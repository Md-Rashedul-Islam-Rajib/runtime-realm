"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const handleErrors = (err, _req, res, _next) => {
    // handling mongoose errors
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        res.status(400).json({
            success: false,
            message: err.message || 'Validation failed',
            statusCode: 400,
            error: {
                details: {
                    name: err.name,
                    errors: err.errors,
                },
            },
            stack: err.stack,
        });
    }
    // handling cast errors
    if (err instanceof mongoose_1.MongooseError) {
        if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
            res.status(400).json({
                success: false,
                message: 'Invalid ObjectId',
                statusCode: 400,
                error: {
                    name: err.name,
                    errors: err,
                },
                stack: err.stack,
            });
        }
    }
    // handling zod validation errors
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            message: err.name,
            statusCode: 400,
            error: {
                name: err.name,
                errors: err.errors || err.issues,
            },
            stack: err.stack,
        });
    }
    // handling all other errors except zod and mongoose
    if (err instanceof Error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            statusCode: 400,
            error: err.message,
            stack: err.stack,
        });
    }
    // handling unknown errors
    res.status(500).json({
        success: false,
        message: 'Unknown error occurs',
        statusCode: 400,
        error: JSON.stringify(err),
    });
};
exports.handleErrors = handleErrors;
