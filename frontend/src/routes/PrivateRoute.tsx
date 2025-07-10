import { Navigate } from 'react-router-dom'; // Importa Navigate para redirecionamento [cite: 281]
import { useAuth } from '../auth/AuthContext'; // Importa o hook useAuth para verificar a autenticação [cite: 281]
import type { JSX } from 'react'; // Tipo para os filhos

// Componente PrivateRoute que recebe os filhos a serem protegidos [cite: 282]
export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth(); // Obtém o token do contexto de autenticação [cite: 284]

  // Se houver um token, renderiza os filhos; caso contrário, redireciona para /login [cite: 285]
  return token ? children : <Navigate to="/login" />;
}