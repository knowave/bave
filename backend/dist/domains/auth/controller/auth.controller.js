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
exports.AuthController = void 0;
const status_code_1 = require("../../../exception/status-code");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        /**
         * 회원 로그인
         */
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield this.authService.findOneSignInUser(email);
                if (!user) {
                    return res.status(status_code_1.STATUS_CODE.ERROR.NOT_FOUND).send({ ErrorMessage: '유저를 찾을 수 없습니다.' });
                }
                const compare = yield this.authService.compareUser(email, password);
                if (!compare) {
                    return res.status(status_code_1.STATUS_CODE.ERROR.NOT_FOUND).send({ ErrorMessage: '비밀번호가 일치하지 않습니다' });
                }
                const accessToken = yield this.authService.generateToken(user.userId, user.email, user.password);
                const refreshToken = yield this.authService.generateRefreshToken(user.userId, user.email, user.password);
                yield this.authService.setCurrentRefreshToken(refreshToken, user.userId);
                return res.json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                });
            }
            catch (error) {
                console.log('로그인 ERROR : ', error);
                return res.status(status_code_1.STATUS_CODE.ERROR.BAD_REQUEST).send({ message: '로그인에 실패하였습니다.' });
            }
        });
        /**
         * 회원 로그아웃
         */
        this.signOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.users;
                // console.log(Number(user?.userId));
                yield this.authService.removeRefreshToken(Number(user === null || user === void 0 ? void 0 : user.userId));
                return res.status(status_code_1.STATUS_CODE.SUCCESS.OK).send({ message: '로그아웃 완료' });
            }
            catch (error) {
                console.log('로그아웃 ERROR : ', error);
                return res.status(status_code_1.STATUS_CODE.ERROR.BAD_REQUEST).send({ message: '로그아웃 실패' });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map