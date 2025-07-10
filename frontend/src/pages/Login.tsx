// frontend/src/pages/Login.tsx
import { useState } from 'react';
import {
  Box, Button, TextField, Typography, Snackbar, Alert, Grid, Paper
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axios';

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    setErro('');
    try {
      const response = await api.post('/auth/login', {
        email,
        senha,
      });

      const { token } = response.data;
      setToken(token);
      navigate('/'); // Navega para a página principal após o login
    } catch (err: any) {
      console.error("Erro no login:", err.response || err);
      setErro(err.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="90vh" // Usa minHeight para ocupar a maior parte da tela
    >
      <Paper elevation={0} sx={{ p: 4, maxWidth: '900px', width: '100%' }}>
        <Grid container spacing={5} alignItems="center">
          
          {/* Coluna da Esquerda: Título */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
              Login to Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please enter your credentials to continue.
            </Typography>
          </Grid>

          {/* Coluna da Direita: Formulário */}
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
            >
              {/* Campo de Email */}
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>Email</Typography>
                <TextField
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'grey.300',
                      },
                      '&:hover fieldset': {
                        borderColor: 'grey.500',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                />
              </Box>
              
              {/* Campo de Senha */}
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>Password</Typography>
                <TextField
                  variant="outlined"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Enter your password"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'grey.300',
                      },
                      '&:hover fieldset': {
                        borderColor: 'grey.500',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                  }}
                />
              </Box>

              {/* ===== SEÇÃO ALTERADA AQUI ===== */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mt: 1 }}>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/register"
                  sx={{
                    color: 'black',
                    borderColor: 'grey.400',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderColor: 'black',
                    },
                  }}
                >
                  Cadastre-se
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    px: 4,
                    py: 1,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Alerta de Erro */}
      <Snackbar open={!!erro} autoHideDuration={6000} onClose={() => setErro('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setErro('')} sx={{ width: '100%' }}>{erro}</Alert>
      </Snackbar>
    </Box>
  );
}