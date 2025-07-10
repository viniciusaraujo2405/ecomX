"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Importe TODAS as suas rotas
const usuario_route_1 = __importDefault(require("./routes/usuario_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const produto_route_1 = __importDefault(require("./routes/produto_route"));
const carrinho_route_1 = __importDefault(require("./routes/carrinho_route"));
const categoria_route_1 = __importDefault(require("./routes/categoria_route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// --- TESTE DE DEPURAÇÃO ---
// Vamos comentar a linha do Swagger temporariamente.
// Se o erro de cadastro desaparecer, saberemos que a causa
// está na configuração do Swagger.
// setupSwagger(app); 
const port = process.env.PORT || 3000;
// --- "SUPER LOGGER" PARA DEBUG ---
app.use((req, res, next) => {
    console.log(`--> REQUISIÇÃO RECEBIDA: ${req.method} ${req.originalUrl} às ${new Date().toLocaleTimeString()}`);
    next();
});
// --- Middlewares Essenciais ---
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- Rotas da Aplicação ---
app.use('/auth', auth_route_1.default);
app.use('/usuarios', usuario_route_1.default);
app.use('/produtos', produto_route_1.default);
app.use('/carrinho', carrinho_route_1.default);
app.use('/categorias', categoria_route_1.default);
// Rota raiz para verificar se a API está no ar
app.get('/', (req, res) => {
    res.send('API EcomX rodando!');
});
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log('Swagger docs available at http://localhost:3333/api-docs');
});
