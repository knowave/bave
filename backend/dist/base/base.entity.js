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
exports.BaseEntity = exports.UpdateDeleteBaseEntity = exports.DeleteBaseEntity = exports.CreateOnlyEntity = void 0;
const typeorm_1 = require("typeorm");
class CreateOnlyEntity {
}
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CreateOnlyEntity.prototype, "createdAt", void 0);
exports.CreateOnlyEntity = CreateOnlyEntity;
class DeleteBaseEntity extends CreateOnlyEntity {
}
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], DeleteBaseEntity.prototype, "deletedAt", void 0);
exports.DeleteBaseEntity = DeleteBaseEntity;
class UpdateDeleteBaseEntity extends CreateOnlyEntity {
}
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UpdateDeleteBaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], UpdateDeleteBaseEntity.prototype, "deletedAt", void 0);
exports.UpdateDeleteBaseEntity = UpdateDeleteBaseEntity;
class BaseEntity {
}
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        comment: '생성일',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        comment: '수정일',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        comment: '삭제일',
        nullable: true,
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "deletedAt", void 0);
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.entity.js.map