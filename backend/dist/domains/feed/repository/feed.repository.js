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
const feed_entity_1 = require("../entity/feed.entity");
const type_orm_config_1 = __importDefault(require("../../../database/type-orm.config"));
const beach_entity_1 = require("../../beach/entity/beach.entity");
class FeedRepository {
    constructor() {
        this.feedRepository = type_orm_config_1.default.getRepository(feed_entity_1.Feed);
        this.beachRepository = type_orm_config_1.default.getRepository(beach_entity_1.Beach);
    }
    /**
     * 피드 작성
     */
    createFeedByBeachId(beach, content, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const feed = this.feedRepository.create({
                content,
                beach,
                image,
            });
            return yield this.feedRepository.save(feed);
        });
    }
}
exports.default = FeedRepository;
//# sourceMappingURL=feed.repository.js.map