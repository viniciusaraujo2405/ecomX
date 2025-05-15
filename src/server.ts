import express from 'express';
import dotenv from 'dotenv';

import usuarioRouter from './routes/usuario_route';
import lojaRouter from './routes/loja_route';
import authRouter from './routes/auth_route';
import {authenticateJWT} from './auth_middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para ler JSON no corpo da requisição
app.use(express.json());

// Rotas públicas (autenticação)
app.use('/auth', authRouter);

// Middleware JWT para proteger as rotas abaixo
app.use(authenticateJWT);

// Rotas protegidas
app.use('/usuarios', usuarioRouter);
app.use('/lojas', lojaRouter);

// Rota raiz só para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('API EcomX rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
