"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_code_1 = require("../../../exception/status-code");
class UserController {
    constructor(userService) {
        this.userService = userService;
        /**
         * 유저 생성
         */
        this.creatUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const createUser = req.body;
            try {
                const user = yield this.userService.creatUser(createUser);
                return res.status(status_code_1.STATUS_CODE.SUCCESS.OK).json(user);
            }
            catch (error) {
                console.log('유저 생성 ERROR : ', error);
                return res.status(status_code_1.STATUS_CODE.ERROR.BAD_REQUEST).send(error);
            }
        });
        this.findOneByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const user = yield this.userService.findOndByUser(Number(userId));
                return res.status(status_code_1.STATUS_CODE.SUCCESS.OK).json(user);
            }
            catch (error) {
                console.log('특정 유저 조회 ERROR : ', error);
                return res.status(status_code_1.STATUS_CODE.ERROR.BAD_REQUEST).send(error);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map