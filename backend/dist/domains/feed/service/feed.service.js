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
const feed_repository_1 = __importDefault(require("../repository/feed.repository"));
const error_code_1 = require("../../../exception/error-code");
class FeedService {
    constructor() {
        this.feedRepository = new feed_repository_1.default();
    }
    /**
     * 해수욕장 피드 작성
     */
    createFeed(beach, content, image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!beach)
                throw error_code_1.BEACH_EXCEPTION.NOT_FOUND_BEACH;
            return yield this.feedRepository.createFeedByBeachId(beach, content, image);
        });
    }
}
exports.default = FeedService;
//# sourceMappingURL=feed.service.js.map