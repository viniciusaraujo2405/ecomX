import React, { createContext, useContext, useMemo, useState } from 'react';
import type {ReactNode} from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define a interface para o contexto do tema
interface ThemeModeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// Cria o contexto do tema
const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

// Provedor do tema
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false); // Estado para controlar o tema escuro/claro

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDark((prevMode) => !prevMode);
  };

  // Cria o objeto de tema do Material UI com base no estado isDark
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
          primary: {
            main: '#1976d2', // Cor primária (azul padrão do Material UI)
          },
          secondary: {
            main: '#dc004e', // Cor secundária (vermelho padrão do Material UI)
          },
        },
      }),
    [isDark] // Recria o tema apenas quando isDark muda
  );

  return (
    // Fornece o estado isDark e a função toggleTheme através do contexto
    <ThemeModeContext.Provider value={{ isDark, toggleTheme }}>
      {/* Aplica o tema do Material UI e reinicia o CSS base */}
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}

// Hook personalizado para consumir o contexto do tema
export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode deve ser usado dentro de ThemeProvider');
  }
  return context;
}