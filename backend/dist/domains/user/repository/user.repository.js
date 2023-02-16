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
const user_entity_1 = require("../entity/user.entity");
const error_code_1 = require("../../../exception/error-code");
const type_orm_config_1 = __importDefault(require("../../../database/type-orm.config"));
class UserRepository {
    constructor() {
        this.userRepository = type_orm_config_1.default.getRepository(user_entity_1.Users);
    }
    /**
     * 유저 생성
     */
    creatUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password, confirmPassword } = createUserDto;
            const createUser = yield this.userRepository.create({
                email,
                username,
                password,
            });
            const existUser = yield this.userRepository.findOne({ where: { email } });
            if (existUser !== null) {
                throw error_code_1.USER_EXCEPTION.EXIST_USER;
            }
            if (password !== confirmPassword) {
                throw error_code_1.USER_EXCEPTION.NOT_MATCH_PASSWORD;
            }
            yield createUser.hashPassword(password);
            return yield this.userRepository.save(createUser);
        });
    }
    /**
     * 특정 유저 조회
     */
    findOneByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ select: ['userId', 'email', 'password', 'username'], where: { userId } });
            if (!user) {
                throw error_code_1.USER_EXCEPTION.NOT_FOUND_USER;
            }
            return user;
        });
    }
    /**
     * SignIn 용 특정 유저 조회
     */
    findOneBySignInUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ select: ['userId', 'email', 'password', 'username'], where: { email } });
            if (!user) {
                throw error_code_1.USER_EXCEPTION.NOT_FOUND_USER;
            }
            return user;
        });
    }
    /**
     * 발급 받은 RefreshToken 저장
     */
    setCurrentRefreshToken(refreshToken, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.update(userId, { jwtToken: refreshToken });
        });
    }
    /**
     * RefreshToken 삭제
     */
    removeRefreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.update(userId, { jwtToken: null });
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map