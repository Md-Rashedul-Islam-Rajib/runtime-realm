"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusFullError = void 0;
class StatusFullError extends Error {
    constructor(name, message, success, status, path = '') {
        super(message);
        this.name = name;
        this.message = message;
        this.success = success;
        this.status = status;
        this.path = path;
        this.success = success;
        this.name = name;
        this.status = status;
        this.path = path;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.StatusFullError = StatusFullError;
