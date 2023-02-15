"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtObj = {};
if (typeof process.env.JWT_SECRET_KEY === 'string') {
    jwtObj.secret = process.env.JWT_SECRET_KEY;
}
else {
    console.log('JWT_SECRET_KEY');
}
exports.default = jwtObj;
//# sourceMappingURL=jwt.config.js.map