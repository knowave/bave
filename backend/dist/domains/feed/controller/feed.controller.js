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
class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
        /**
         * 피드 생성
         */
        this.createFeed = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { content } = req.body;
            const beach = req.beach;
            const image = req.file;
            try {
                const feed = yield this.feedService.createFeed(beach, content, String(image));
                return res.status(status_code_1.STATUS_CODE.SUCCESS.CREATED).json(feed);
            }
            catch (error) {
                console.log('해수욕장 피드 생성 ERROR : ', error);
                return res.status(status_code_1.STATUS_CODE.ERROR.BAD_REQUEST);
            }
        });
        /**
         * 이미지 s3 업로드
         */
        this.uploadImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                return res.status(status_code_1.STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: '업로드할 이미지가 없습니다.' });
            }
            const file = req.file;
            try {
                res.status(status_code_1.STATUS_CODE.SUCCESS.CREATED).json({ file: file });
            }
            catch (error) {
                console.log(error);
                res.status(status_code_1.STATUS_CODE.SERVER_ERROR.BAD_GATEAWAY).send({ errorMessage: error });
            }
        });
    }
}
exports.default = FeedController;
//# sourceMappingURL=feed.controller.js.map