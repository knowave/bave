"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODE = void 0;
exports.STATUS_CODE = {
    SUCCESS: {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
    },
    ERROR: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        PAYMENT_REQUIRED: 402,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOW: 405,
        REQUEST_TIMEOUT: 408,
        CONFLICK: 409,
    },
    SERVER_ERROR: {
        INTERNAL_SERVER_ERROR: 500,
        BAD_GATEAWAY: 502,
        SERVICE_UNAVAILABLE: 503,
    },
};
//# sourceMappingURL=status-code.js.map