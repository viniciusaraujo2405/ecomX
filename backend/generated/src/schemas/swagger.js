"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const lojaSchema_1 = require("./lojaSchema");
function setupSwagger(app) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(lojaSchema_1.lojaSchema));
}
