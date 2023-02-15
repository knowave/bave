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
exports.Reply = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../base/base.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const feed_entity_1 = require("../../feed/entity/feed.entity");
let Reply = class Reply extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'reply_id',
        comment: '댓글 ID',
    }),
    __metadata("design:type", Number)
], Reply.prototype, "replyId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'contents',
        comment: '댓글',
        nullable: false,
    }),
    __metadata("design:type", String)
], Reply.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.replyList),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.Users)
], Reply.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feed_entity_1.Feed, (feed) => feed.replyList),
    (0, typeorm_1.JoinColumn)({ name: 'feed_id', referencedColumnName: 'feedId' }),
    __metadata("design:type", feed_entity_1.Feed)
], Reply.prototype, "feed", void 0);
Reply = __decorate([
    (0, typeorm_1.Entity)()
], Reply);
exports.Reply = Reply;
//# sourceMappingURL=reply.entity.js.map