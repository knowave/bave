"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = __importDefault(require("../service/user.service"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
class UserRouter {
    constructor() {
        this.userRouter = (0, express_1.Router)();
        this.userService = new user_service_1.default();
        this.userController = new user_controller_1.default(this.userService);
    }
    userMainRouter() {
        this.userRouter.post('/', this.userController.creatUser);
        this.userRouter.get('/:userId', this.userController.findOneByUser);
        return this.userRouter;
    }
}
exports.default = new UserRouter().userMainRouter();
//# sourceMappingURL=user.router.js.map