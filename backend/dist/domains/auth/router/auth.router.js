"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controller/auth.controller");
const express_1 = require("express");
const auth_service_1 = __importDefault(require("../service/auth.service"));
const auth_check_middleware_1 = require("../middlewares/auth-check.middleware");
const user_middleware_1 = require("../middlewares/user.middleware");
class AuthRouter {
    constructor() {
        this.authRouter = (0, express_1.Router)();
        this.authService = new auth_service_1.default();
        this.authController = new auth_controller_1.AuthController(this.authService);
    }
    authMainRouter() {
        this.authRouter.post('/sign-in', this.authController.signIn);
        this.authRouter.post('/sign-out', auth_check_middleware_1.authCheck, user_middleware_1.userMiddleware, this.authController.signOut);
        return this.authRouter;
    }
}
exports.default = new AuthRouter().authMainRouter();
//# sourceMappingURL=auth.router.js.map