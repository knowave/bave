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
class BeachController {
    constructor(beachService) {
        this.beachService = beachService;
        /**
         * 해수욕장 전체 조회
         */
        this.getAllBeach = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            try {
                const data = yield this.beachService.getAllBeach(query);
                return res.status(status_code_1.STATUS_CODE.SUCCESS.OK).json(data);
            }
            catch (error) {
                console.log('해수욕장 전체 조회 Error : ', error);
                return res.status(status_code_1.STATUS_CODE.ERROR.BAD_REQUEST).send(error);
            }
        });
        /**
         * 특정 해수욕장 조회
         */
        this.findOneBeach = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { beachId } = req.params;
            try {
                const beach = yield this.beachService.findOneByBeach(Number(beachId));
                return res.status(status_code_1.STATUS_CODE.SUCCESS.OK).json(beach);
            }
            catch (error) {
                console.log('특정 해수욕장 ERROR :', error);
                return res.status(status_code_1.STATUS_CODE.ERROR.BAD_REQUEST).send(error);
            }
        });
    }
}
exports.default = BeachController;
//# sourceMappingURL=beach.controller.js.map