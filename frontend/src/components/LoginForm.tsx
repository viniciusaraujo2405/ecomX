import React, { useState } from 'react';
import { LoginFormProps } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export default function LoginForm({ onAuthSuccess, showRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, senha }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Credenciais inválidas');
      onAuthSuccess(data.token);
    } catch (err: any) { 
      setError(err.message); 
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required className="mt-1 block w-full rounded-md p-2"/>
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        Não tem uma conta?{' '}
        <button onClick={showRegister} className="font-medium text-indigo-600 hover:text-indigo-500">Cadastre-se</button>
      </p>
    </div>
  );
}
