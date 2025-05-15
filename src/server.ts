import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import usuarioRoutes from './routes/usuario.routes';
import lojaRoutes from './routes/loja.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/lojas', lojaRoutes);
app.use('/auth', authRoutes);

// Rota base
app.get('/', (req, res) => {
  res.send('API do EcomX rodando com sucesso!');
});

// Start do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
