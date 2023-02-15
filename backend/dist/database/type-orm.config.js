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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionOptions = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../domains/user/entity/user.entity");
const dotenv = __importStar(require("dotenv"));
const beach_entity_1 = require("../domains/beach/entity/beach.entity");
const feed_entity_1 = require("../domains/feed/entity/feed.entity");
const reply_entity_1 = require("../domains/reply/entity/reply.entity");
const like_entity_1 = require("../domains/like/entity/like.entity");
dotenv.config();
exports.connectionOptions = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [user_entity_1.Users, beach_entity_1.Beach, feed_entity_1.Feed, reply_entity_1.Reply, like_entity_1.Like],
});
exports.default = exports.connectionOptions;
//# sourceMappingURL=type-orm.config.js.map