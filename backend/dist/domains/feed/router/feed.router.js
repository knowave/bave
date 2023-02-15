"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feed_service_1 = __importDefault(require("../service/feed.service"));
const feed_controller_1 = __importDefault(require("../controller/feed.controller"));
const express_1 = require("express");
const upload_middleware_1 = require("../middleware/upload.middleware");
const auth_check_middleware_1 = require("../../auth/middlewares/auth-check.middleware");
class FeedRouter {
    constructor() {
        this.feedRouter = (0, express_1.Router)();
        this.feedService = new feed_service_1.default();
        this.feedController = new feed_controller_1.default(this.feedService);
    }
    feedMainRouter() {
        this.feedRouter.post('/', upload_middleware_1.upload.array('images', 5), this.feedController.createFeed);
        this.feedRouter.post('/upload', auth_check_middleware_1.authCheck, upload_middleware_1.upload.array('images', 5), this.feedController.uploadImage);
        return this.feedRouter;
    }
}
exports.default = new FeedRouter().feedMainRouter();
//# sourceMappingURL=feed.router.js.map