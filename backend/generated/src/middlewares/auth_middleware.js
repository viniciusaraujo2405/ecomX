"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token não fornecido' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const secret = process.env.JWT_SECRET || 'default_secret'; // substitua conforme necessário
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Adiciona o usuário ao request (precisa ter tipagem personalizada se for usar depois)
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ error: 'Token inválido' });
    }
}
