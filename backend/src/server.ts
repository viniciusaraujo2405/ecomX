// backend/src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../swaggerDef'; // <-- Importa nosso objeto

// Importe suas rotas
import usuarioRouter from './routes/usuario_route';
import authRouter from './routes/auth_route';
import produtoRouter from './routes/produto_route';
import carrinhoRouter from './routes/carrinho_route';
import categoriaRouter from './routes/categoria_route';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Rotas ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Rota do Swagger
app.use('/auth', authRouter);
app.use('/usuarios', usuarioRouter);
app.use('/produtos', produtoRouter);
app.use('/carrinho', carrinhoRouter);
app.use('/categorias', categoriaRouter);

app.get('/', (req, res) => {
  res.send('API EcomX rodando!');
});

// --- Inicialização ---
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});