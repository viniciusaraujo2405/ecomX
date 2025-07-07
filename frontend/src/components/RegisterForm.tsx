import React, { useState } from 'react';
import { RegisterFormProps } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export default function RegisterForm({ onAuthSuccess, showLogin }: RegisterFormProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('CONSUMIDOR');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('--- ETAPA 1: Enviando requisição de cadastro...');
      const regRes = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, tipo }),
      });

      console.log('--- ETAPA 2: Resposta do cadastro recebida. Detalhes:', {
        status: regRes.status,
        ok: regRes.ok,
        statusText: regRes.statusText,
      });

      // Verifica se a resposta do cadastro foi bem-sucedida
      if (!regRes.ok) {
        // Tenta ler a resposta como JSON para obter a mensagem de erro do backend
        const errorData = await regRes.json();
        console.error('Falha no cadastro. Resposta do servidor:', errorData);
        throw new Error(errorData.error || 'Erro ao cadastrar usuário.');
      }
      
      console.log('--- ETAPA 3: Cadastro bem-sucedido. Enviando requisição de login...');
      const logRes = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      const logData = await logRes.json();

      console.log('--- ETAPA 4: Resposta do login recebida.');
      if (!logRes.ok) {
        console.error('Falha no login automático. Resposta do servidor:', logData);
        throw new Error('Cadastro realizado, mas falha ao fazer login automaticamente.');
      }
      
      console.log('--- SUCESSO! Login automático realizado.');
      onAuthSuccess(logData.token);

    } catch (err: any) {
      // Este log vai nos mostrar o erro exato que está parando o processo
      console.error('### ERRO CAPTURADO NO FRONTEND ###:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Crie sua Conta</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className="mt-1 block w-full rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required className="mt-1 block w-full rounded-md p-2"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quero ser um</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="mt-1 block w-full rounded-md p-2">
            <option value="CONSUMIDOR">Consumidor</option>
            <option value="LOJISTA">Vendedor</option>
          </select>
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          {isLoading ? 'Criando conta...' : 'Cadastrar e Entrar'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        Já tem uma conta?{' '}
        <button onClick={showLogin} className="font-medium text-indigo-600 hover:text-indigo-500">Faça o login</button>
      </p>
    </div>
  );
}
