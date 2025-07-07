import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Produto } from '../types';
import ProdutoCard from '../components/ProdutoCard';

const API_BASE_URL = 'http://localhost:3000';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/produtos`);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="text-4xl font-bold text-gray-900 dark:text-white">ecomX</Link>
          <nav>
            {token ? (
              <button onClick={handleLogout} className="py-2 px-4 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                Sair
              </button>
            ) : (
              <Link to="/auth">
                <button className="py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Entrar ou Cadastre-se
                </button>
              </Link>
            )}
          </nav>
        </header>

        <main>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Nossos Produtos</h2>
          {isLoading ? (
            <p className="text-center text-gray-500">Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produtos.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
