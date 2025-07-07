import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa as páginas que serão usadas nas rotas
import ProdutosPage from './pages/ProdutosPage';
import AuthPage from './pages/AuthPage';

// Este é o componente principal que gerencia a navegação
export default function App() {
  return (
    <Routes>
      {/* Rota para a página inicial, que exibe a lista de produtos */}
      <Route path="/" element={<ProdutosPage />} />

      {/* Rota para a página de autenticação (login/cadastro) */}
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}
