"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const beach_router_1 = __importDefault(require("../domains/beach/router/beach.router"));
const user_router_1 = __importDefault(require("../domains/user/router/user.router"));
const auth_router_1 = __importDefault(require("../domains/auth/router/auth.router"));
const feed_router_1 = __importDefault(require("../domains/feed/router/feed.router"));
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    routes() {
        this.router.use('/beach', beach_router_1.default);
        this.router.use('/users', user_router_1.default);
        this.router.use('/auth', auth_router_1.default);
        this.router.use('/feed', feed_router_1.default);
        return this.router;
    }
}
exports.default = new Routes().routes();
//# sourceMappingURL=index.js.map