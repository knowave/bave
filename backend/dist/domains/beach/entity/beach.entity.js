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
exports.Beach = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../base/base.entity");
const feed_entity_1 = require("../../feed/entity/feed.entity");
let Beach = class Beach extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'beach_id',
        comment: '해수욕장 ID',
    }),
    __metadata("design:type", Number)
], Beach.prototype, "beachId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'sido_name',
        comment: '시 이름',
        nullable: false,
    }),
    __metadata("design:type", String)
], Beach.prototype, "sidoName", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'gugun_name',
        comment: '구/군 이름',
        nullable: false,
    }),
    __metadata("design:type", String)
], Beach.prototype, "gugun_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'beach_name',
        comment: '해수욕장 이름',
        nullable: false,
    }),
    __metadata("design:type", String)
], Beach.prototype, "beachName", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'latitude',
        comment: '위도',
        nullable: false,
    }),
    __metadata("design:type", String)
], Beach.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'longitude',
        comment: '경도',
        nullable: false,
    }),
    __metadata("design:type", String)
], Beach.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feed_entity_1.Feed, (feed) => feed.beach),
    (0, typeorm_1.JoinColumn)({ name: 'feed_id', referencedColumnName: 'feedId' }),
    __metadata("design:type", Array)
], Beach.prototype, "feedList", void 0);
Beach = __decorate([
    (0, typeorm_1.Entity)('beach')
], Beach);
exports.Beach = Beach;
//# sourceMappingURL=beach.entity.js.map