import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';
import PrivateRoute from './routes/PrivateRoute';
import React, { useState, useEffect } from 'react';
import api from './api/axios';
import type { SelectChangeEvent } from '@mui/material'; // <-- NOVO: Importar SelectChangeEvent aqui como tipo

// Importa as páginas
import Login from './pages/Login';
import ProdutosListagem from './pages/ProdutosListagem';
import Register from './pages/Register';
import MeuCarrinho from './pages/MeuCarrinho';
import MeusProdutos from './pages/MeusProdutos';
import Header from './components/Header';

// Interface para Categoria
interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
}

function App() {
  const [categoriaAtivaNome, setCategoriaAtivaNome] = useState<string>('Todas as Categorias');

  // ESTADOS E FUNÇÕES DO FILTRO, MOVIDOS DE ProdutosListagem.tsx
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState<string>('');

  // Função para carregar CATEGORIAS
  const carregarCategorias = async () => {
    try {
      const response = await api.get<Categoria[]>('/categorias');
      setCategorias(response.data);
    } catch (err) {
      console.error('Erro ao carregar categorias no App:', err);
    }
  };

  // useEffect para carregar categorias uma única vez ao montar o App
  useEffect(() => {
    carregarCategorias();
  }, []);

  // Handler para a mudança da categoria no filtro
  // CORREÇÃO: AQUI TAMBÉM PRECISA USAR SelectChangeEvent<string>
  const handleCategoriaChange = (event: SelectChangeEvent<string>) => { // <-- Mudar o tipo do evento aqui
    const selectedId = event.target.value;
    setCategoriaSelecionadaId(selectedId);

    if (selectedId === '') {
      setCategoriaAtivaNome('Todas as Categorias');
    } else {
      const cat = categorias.find(c => c.id === selectedId);
      if (cat) {
        setCategoriaAtivaNome(cat.nome);
      }
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* O Header agora recebe as props para exibir o nome da categoria E para renderizar o filtro */}
          <Header
            categoriaAtivaNome={categoriaAtivaNome}
            categorias={categorias}
            categoriaSelecionadaId={categoriaSelecionadaId}
            handleCategoriaChange={handleCategoriaChange} // Passa o handler de mudança
          />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProdutosListagem
                  categoriaSelecionadaId={categoriaSelecionadaId}
                />
              }
            />

            <Route
              path="/meu-carrinho"
              element={
                <PrivateRoute>
                  <MeuCarrinho />
                </PrivateRoute>
              }
            />
            <Route
              path="/meus-produtos"
              element={
                <PrivateRoute>
                  <MeusProdutos />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;