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
const user_repository_1 = __importDefault(require("../repository/user.repository"));
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.default();
    }
    /**
     * 유저 생성
     */
    creatUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.creatUser(createUserDto);
        });
    }
    /**
     * 특정 유저 조회
     */
    findOndByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneByUser(userId);
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map