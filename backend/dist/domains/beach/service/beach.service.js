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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const beach_repository_1 = __importDefault(require("../repository/beach.repository"));
class BeachService {
    constructor() {
        this.beachRepository = new beach_repository_1.default();
    }
    /**
     * 해수욕장 전체 조회
     */
    getAllBeach(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.beachRepository.getAllBeach(query);
        });
    }
    /**
     * 특정 해수욕장 조회
     */
    findOneByBeach(beachId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.beachRepository.findOneByBeach(beachId);
        });
    }
}
exports.default = BeachService;
//# sourceMappingURL=beach.service.js.map