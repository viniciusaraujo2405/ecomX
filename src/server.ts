import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usuarioRoutes from './routes/usuario_route';
import lojaRoutes from './routes/loja_route';
import authRoutes from './routes/auth_route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/lojas', lojaRoutes);
app.use('/api/auth', authRoutes);

// Rota principal (opcional)
app.get('/', (req, res) => {
  res.send('🚀 API EcomX está rodando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
