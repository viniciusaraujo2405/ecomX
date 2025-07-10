import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Importa seu App.tsx
import './index.css'; // Confirme essa linha, iremos limpar o conteúdo dela

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);