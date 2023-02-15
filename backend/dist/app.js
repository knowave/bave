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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const type_orm_config_1 = __importDefault(require("./database/type-orm.config"));
const index_1 = __importDefault(require("./routes/index"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/api', index_1.default);
        this.env = dotenv_1.default.config();
        this.port = Number(process.env.PORT);
    }
    swagger() {
        const swaggerDefinition = {
            info: {
                title: 'bave-api-docs',
                version: '0.1.0',
                description: 'BAVE API Docs',
            },
            host: `localhost:${this.port}`,
            basePath: '/',
        };
        const option = {
            swaggerDefinition: swaggerDefinition,
            apis: ['./routes/*.ts'],
        };
        const spec = (0, swagger_jsdoc_1.default)(option);
        this.app.use('/bave-api', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
    }
    connectionDB() {
        return __awaiter(this, void 0, void 0, function* () {
            type_orm_config_1.default
                .initialize()
                .then(() => {
                console.log('Connection Mysql Database');
            })
                .catch((error) => {
                console.log(`ERROR❗❗️️ ${error}️`);
            });
        });
    }
    apiRouter() {
        this.app.use;
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🎉 Connected Server http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map