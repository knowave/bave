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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
const status_code_1 = require("../../../exception/status-code");
const user_service_1 = __importDefault(require("../../user/service/user.service"));
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userService = new user_service_1.default();
    if (req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1];
        const verificationRes = jwt.verify(token, jwt_config_1.default.secret);
        const userId = verificationRes.userId;
        const user = (yield userService.findOndByUser(userId));
        if (user) {
            req.users = user;
            next();
        }
        if (!token) {
            res.status(status_code_1.STATUS_CODE.ERROR.UNAUTHORIZED).json({ errorMessage: '로그인 후 사용해주세요.' });
            next();
        }
    }
});
exports.userMiddleware = userMiddleware;
//# sourceMappingURL=user.middleware.js.map