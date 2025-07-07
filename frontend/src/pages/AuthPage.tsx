import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();

  const handleAuthSuccess = (token: string) => {
    localStorage.setItem('authToken', token);
    navigate('/'); // Redireciona para a página inicial após o sucesso
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      {isLoginView ? (
        <LoginForm onAuthSuccess={handleAuthSuccess} showRegister={() => setIsLoginView(false)} />
      ) : (
        <RegisterForm onAuthSuccess={handleAuthSuccess} showLogin={() => setIsLoginView(true)} />
      )}
    </div>
  );
}
