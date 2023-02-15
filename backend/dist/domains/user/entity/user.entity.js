"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../base/base.entity");
const like_entity_1 = require("../../like/entity/like.entity");
const bcrypt = __importStar(require("bcrypt"));
const reply_entity_1 = require("../../reply/entity/reply.entity");
const feed_entity_1 = require("../../feed/entity/feed.entity");
let Users = class Users extends base_entity_1.BaseEntity {
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield bcrypt.hash(password, 12);
        });
    }
    updateDate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updatedAt = yield new Date();
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'user_id',
        comment: '회원 아이디',
    }),
    __metadata("design:type", Number)
], Users.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'email',
        comment: '회원 이메일',
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'password',
        comment: '패스워드',
        nullable: false,
        select: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'username',
        comment: '회원 사용 이름',
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', {
        name: 'jwt_token',
        comment: 'jwt refresh token',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Object)
], Users.prototype, "jwtToken", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.user),
    (0, typeorm_1.JoinColumn)({ name: 'like_id', referencedColumnName: 'like_id' }),
    __metadata("design:type", Array)
], Users.prototype, "likeList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reply_entity_1.Reply, (reply) => reply.user),
    (0, typeorm_1.JoinColumn)({ name: 'reply_id', referencedColumnName: 'replyId' }),
    __metadata("design:type", Array)
], Users.prototype, "replyList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feed_entity_1.Feed, (feed) => feed.user),
    __metadata("design:type", Array)
], Users.prototype, "feedList", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Users.prototype, "updateDate", null);
Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
exports.Users = Users;
//# sourceMappingURL=user.entity.js.map