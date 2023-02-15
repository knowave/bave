"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../base/base.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const reply_entity_1 = require("../../reply/entity/reply.entity");
const like_entity_1 = require("../../like/entity/like.entity");
const beach_entity_1 = require("../../beach/entity/beach.entity");
let Feed = class Feed extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'feed_id',
        comment: '피드 ID',
    }),
    __metadata("design:type", Number)
], Feed.prototype, "feedId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'content',
        comment: '피드 글',
        nullable: false,
    }),
    __metadata("design:type", String)
], Feed.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', {
        name: 'feed_image',
        comment: 'feed image',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Feed.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.feedList),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.Users)
], Feed.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => beach_entity_1.Beach, (beach) => beach.feedList),
    (0, typeorm_1.JoinColumn)({ name: 'beach_id', referencedColumnName: 'beachId' }),
    __metadata("design:type", beach_entity_1.Beach)
], Feed.prototype, "beach", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reply_entity_1.Reply, (reply) => reply.feed),
    (0, typeorm_1.JoinColumn)({ name: 'reply_id', referencedColumnName: 'replyId' }),
    __metadata("design:type", Array)
], Feed.prototype, "replyList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.feed),
    (0, typeorm_1.JoinColumn)({ name: 'like_id', referencedColumnName: 'likeId' }),
    __metadata("design:type", Array)
], Feed.prototype, "likeList", void 0);
Feed = __decorate([
    (0, typeorm_1.Entity)()
], Feed);
exports.Feed = Feed;
//# sourceMappingURL=feed.entity.js.map