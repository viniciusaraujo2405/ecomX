import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importe TODAS as suas rotas
import usuarioRouter from './routes/usuario_route';
import authRouter from './routes/auth_route';
import produtoRouter from './routes/produto_route';

import { setupSwagger } from './schemas/swagger';

dotenv.config();

const app = express();

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
app.use(cors());
app.use(express.json());

// --- Rotas da Aplicação ---
app.use('/auth', authRouter);
app.use('/usuarios', usuarioRouter);
app.use('/produtos', produtoRouter);

// Rota raiz para verificar se a API está no ar
app.get('/', (req, res) => {
  res.send('API EcomX rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

