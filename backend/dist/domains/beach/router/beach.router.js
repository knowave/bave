"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const beach_controller_1 = __importDefault(require("../controller/beach.controller"));
const beach_service_1 = __importDefault(require("../service/beach.service"));
class BeachRouter {
    constructor() {
        this.beachRouter = (0, express_1.Router)();
        this.beachService = new beach_service_1.default();
        this.beachController = new beach_controller_1.default(this.beachService);
    }
    beachMainRouter() {
        this.beachRouter.get('/', this.beachController.getAllBeach);
        this.beachRouter.get('/:beachId', this.beachController.findOneBeach);
        return this.beachRouter;
    }
}
exports.default = new BeachRouter().beachMainRouter();
//# sourceMappingURL=beach.router.js.map