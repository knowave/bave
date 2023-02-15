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
const beach_entity_1 = require("../entity/beach.entity");
const error_code_1 = require("../../../exception/error-code");
const type_orm_config_1 = __importDefault(require("../../../database/type-orm.config"));
class BeachRepository {
    constructor() {
        this.beachRepository = type_orm_config_1.default.getRepository(beach_entity_1.Beach);
    }
    /**
     * 해수욕장 전체 조회
     */
    getAllBeach(query) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const limit = (_a = query.itemPerPage) !== null && _a !== void 0 ? _a : 10;
            const page = (_b = query.page) !== null && _b !== void 0 ? _b : 1;
            const skip = (_c = limit * (page - 1)) !== null && _c !== void 0 ? _c : 0;
            const beaches = yield this.beachRepository.createQueryBuilder('beach').take(limit).skip(skip).orderBy('beach.beachId', 'DESC').getMany();
            if (beaches.length === 0) {
                throw error_code_1.BEACH_EXCEPTION.NOT_FOUND_BEACHES;
            }
            return beaches;
        });
    }
    /**
     * 특정 해수욕장 조회
     */
    findOneByBeach(beachId) {
        return __awaiter(this, void 0, void 0, function* () {
            const beach = yield this.beachRepository.findOne({ where: { beachId } });
            if (!beach) {
                throw error_code_1.BEACH_EXCEPTION.NOT_FOUND_BEACH;
            }
            return beach;
        });
    }
}
exports.default = BeachRepository;
//# sourceMappingURL=beach.repository.js.map