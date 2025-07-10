import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode para decodificar o token JWT [cite: 232]

// defininido o enum TipoUsuario para ser usado aqui e emoutros lugares do frontend
type  TipoUsuario = 'VENDEDOR' | 'CONSUMIDOR'; // Define os tipos de usuário possíveis [cite: 233]

// Interface para o payload do JWT
interface JwtPayloadCustom {
  id: string;
  tipo: TipoUsuario; // O tipo de usuário (VENDEDOR ou CONSUMIDOR) [cite: 235]
  exp: number;
}
// Define a interface para o tipo do contexto de autenticação [cite: 234]
interface AuthContextType {
  token: string | null; // O token de autenticação [cite: 236]
  setToken: (token: string | null) => void; // Função para definir o token [cite: 237]
  logout: () => void; // Função para fazer logout [cite: 238]
  tipoUsuario: TipoUsuario | null; // O tipo de usuário (VENDEDOR ou CONSUMIDOR) [cite: 238]
  userId : string | null; // O ID do usuário extraído do token [cite: 238]
}

// Cria o contexto com um valor inicial undefined [cite: 239]
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de autenticação que envolve a sua aplicação [cite: 239]
export function AuthProvider({ children }: { children: ReactNode }) {
  // Estado para armazenar o token, inicializando com o valor do localStorage (se existir) [cite: 240, 241]
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario | null>(null); // Estado para o tipo de usuário [cite: 242]
  const [userId, setUserId] = useState<string | null>(null); // Estado para o ID do usuário [cite: 242]

  // Efeito colateral para persistir o token no localStorage sempre que ele mudar [cite: 243]
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      try {
        const decodedToken = jwtDecode<JwtPayloadCustom>(token);
        setTipoUsuario(decodedToken.tipo);
        setUserId(decodedToken.id);

        // Opcional: Verificar expiração do token ao carregar
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log('Token expirado. Deslogando...');
          logout();
        }
      } catch (error) {
        console.error('Erro ao decodificar token JWT:', error);
        logout(); // Desloga se o token for inválido ou corrompido
      }
    } else {
      localStorage.removeItem('token');
      setTipoUsuario(null);
      setUserId(null);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setTipoUsuario(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, tipoUsuario, userId }}>
      {children}
    </AuthContext.Provider>
  );

}

// Hook personalizado para consumir o contexto de autenticação [cite: 260]
export function useAuth() {
  const context = useContext(AuthContext); // Acessa o contexto [cite: 261]
  if (!context) {
    // Lança um erro se useAuth for usado fora de AuthProvider [cite: 264]
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context; // Retorna o contexto [cite: 266]
}