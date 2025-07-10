// frontend/src/components/Header.tsx
import { AppBar, Toolbar, Typography, IconButton, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '../theme/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// Interface para Categoria
interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
}

// Definição das props que o Header receberá
interface HeaderProps {
    categoriaAtivaNome: string; 
    categorias: Categoria[]; 
    categoriaSelecionadaId: string;
    handleCategoriaChange: (event: SelectChangeEvent<string>) => void;
}

const Header = ({ categorias, categoriaSelecionadaId, handleCategoriaChange }: HeaderProps) => {
  const { isDark, toggleTheme } = useThemeMode();
  const { logout, token, tipoUsuario } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar 
        position="static" 
        elevation={1}
        sx={{ 
            backgroundColor: 'white', 
            color: 'black' 
        }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Lado Esquerdo: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
                variant="h5" 
                component={Link} 
                to="/" 
                sx={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    fontWeight: 'bold'
                }}
            >
                EcomX
            </Typography>
        </Box>

        {/* Centro: Links de Navegação e Filtro */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
            <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none' }}>Shop</Button>
            <Button color="inherit" component={Link} to="/about" sx={{ textTransform: 'none' }}>About</Button>
            <Button color="inherit" component={Link} to="/contact" sx={{ textTransform: 'none' }}>Contact</Button>
            
            {/* FILTRO DE CATEGORIA MOVIDO PARA CÁ - visível apenas na rota principal */}
            {window.location.pathname === '/' && (
              <FormControl size="small" sx={{ minWidth: 180, ml: 4 }}>
                <InputLabel id="categoria-select-label">Categoria</InputLabel>
                <Select
                  labelId="categoria-select-label"
                  id="categoria-select-header"
                  value={categoriaSelecionadaId}
                  label="Categoria"
                  onChange={handleCategoriaChange}
                >
                  <MenuItem value=""><em>Todas</em></MenuItem>
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
        </Box>

        {/* Lado Direito: Ações do Usuário */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {token && tipoUsuario === 'CONSUMIDOR' && (
            <Button color="inherit" component={Link} to="/meu-carrinho" sx={{ textTransform: 'none' }}>
              Meu Carrinho
            </Button>
          )}
          {token && tipoUsuario === 'VENDEDOR' && (
            <Button color="inherit" component={Link} to="/meus-produtos" sx={{ textTransform: 'none' }}>
              Meus Produtos
            </Button>
          )}

          {token ? (
            // ===== BOTÃO 'SAIR' ESTILIZADO =====
            <Button 
                variant="outlined" 
                onClick={handleLogout}
                sx={{ 
                    color: 'black',
                    borderColor: 'grey.400',
                    textTransform: 'none',
                    '&:hover': {
                        borderColor: 'black',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                }}
            >
                Sair
            </Button>
          ) : (
            <Button 
                variant='contained'
                component={Link} 
                to="/login"
                sx={{
                    textTransform: 'none',
                    backgroundColor: 'black',
                    '&:hover': {
                        backgroundColor: '#333'
                    }
                }}
            >
                Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;