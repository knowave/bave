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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_code_1 = require("../../../exception/error-code");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = __importDefault(require("../../user/repository/user.repository"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.userRepository = new user_repository_1.default();
        this.env = dotenv_1.default.config();
    }
    /**
     * email로 유저 조회
     */
    findOneSignInUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOneBySignInUser(email);
        });
    }
    /**
     * 비밀번호 유효성 검사
     */
    compareUser(email, plainTextPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBySignInUser(email);
            if (!user) {
                throw error_code_1.USER_EXCEPTION.NOT_FOUND_USER;
            }
            yield this.comparePassword(plainTextPassword, user.password);
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        });
    }
    /**
     * Token 발급
     */
    generateToken(userId, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretKey = String(process.env.JWT_SECRET_KEY);
            const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
            return jsonwebtoken_1.default.sign({ userId, email, password }, secretKey, { expiresIn: expiresIn });
        });
    }
    /**
     * RefreshToken
     */
    generateRefreshToken(userId, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretKey = String(process.env.JWT_REFRESH_SECRET_KEY);
            const expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;
            return jsonwebtoken_1.default.sign({ userId, email, password }, secretKey, { expiresIn: expiresIn });
        });
    }
    /**
     * 발급 받은 RefreshToken 저장
     */
    setCurrentRefreshToken(refreshToken, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw error_code_1.USER_EXCEPTION.NOT_FOUND_USER;
            }
            return yield this.userRepository.setCurrentRefreshToken(refreshToken, userId);
        });
    }
    /**
     * refreshToken 삭제
     */
    removeRefreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw error_code_1.USER_EXCEPTION.NOT_FOUND_USER;
            }
            return this.userRepository.removeRefreshToken(userId);
        });
    }
    /**
     * 비밀번호 유횽성 검사 method
     */
    comparePassword(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPasswordMatch = yield bcrypt_1.default.compare(password, hashedPassword);
            if (!isPasswordMatch) {
                throw error_code_1.USER_EXCEPTION.NOT_MATCH_PASSWORD;
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map