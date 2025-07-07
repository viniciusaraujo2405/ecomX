export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
}

export interface LoginFormProps {
  onAuthSuccess: (token: string) => void;
  showRegister: () => void;
}

export interface RegisterFormProps {
  onAuthSuccess: (token: string) => void;
  showLogin: () => void;
}