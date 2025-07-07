import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Importe o BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// Importe seu CSS global se necessário, ex: import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 2. Envolva o componente <App /> com o <BrowserRouter>
// É isso que disponibiliza o sistema de rotas para toda a sua aplicação.
// O erro acontece porque este <BrowserRouter> provavelmente está faltando.
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
