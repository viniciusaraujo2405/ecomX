import { useState } from 'react';
import {
  Box, Button, TextField, Typography, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, Container, Grid
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

type TipoUsuario = 'VENDEDOR' | 'CONSUMIDOR';

export default function Register() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [tipo, setTipo] = useState<TipoUsuario | ''>('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleRegister = async () => {
    setErro('');
    setSucesso('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    if (!tipo) {
      setErro('Por favor, selecione o tipo de usuário.');
      return;
    }

    try {
      await api.post('/usuarios', {
        nome,
        email,
        senha,
        tipo,
      });

      setSucesso('Conta criada com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any)      {
      console.error("Erro no cadastro:", err.response || err);
      setErro(err.response?.data?.error || 'Erro ao cadastrar. Tente novamente.');
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'grey.300' },
      '&:hover fieldset': { borderColor: 'grey.500' },
      '&.Mui-focused fieldset': { borderColor: 'black' },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'black',
    }
  };

  return (
    <Box 
        sx={{ 
            width: '100%', 
            display: 'flex',
            alignItems: 'flex-start', 
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff' 
        }}
    >
      {/* ===== LINHA ALTERADA AQUI ===== */}
      <Container maxWidth="md" sx={{ mt: 4 }}> {/* Margem do topo reduzida de 8 para 4 */}
        
        <Box sx={{ textAlign: 'center', mb: 4 }}> 
          <Typography variant="h4" component="h1" fontWeight="bold">
            Cadastre-se
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Crie sua conta para começar a comprar.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 10 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography variant="h5" fontWeight="bold">
              Informações do usuário
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Box
              component="form"
              onSubmit={(e) => { e.preventDefault(); handleRegister(); }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
            >
              <FormControl fullWidth variant="outlined">
                 <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>Nome</Typography>
                 <TextField size="small" placeholder="Digite seu nome" fullWidth sx={inputStyles} value={nome} onChange={(e) => setNome(e.target.value)} />
              </FormControl>

              <FormControl fullWidth variant="outlined">
                 <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>Email</Typography>
                 <TextField size="small" type="email" placeholder="Digite seu email" fullWidth sx={inputStyles} value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>

              <FormControl fullWidth variant="outlined">
                 <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>Senha</Typography>
                 <TextField size="small" type="password" placeholder="Digite sua senha" fullWidth sx={inputStyles} value={senha} onChange={(e) => setSenha(e.target.value)} />
              </FormControl>
              
              <FormControl fullWidth variant="outlined">
                 <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>Confirmar Senha</Typography>
                 <TextField size="small" type="password" placeholder="Confirme sua senha" fullWidth sx={inputStyles} value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
              </FormControl>
              
              <FormControl fullWidth variant="outlined" sx={inputStyles} size="small">
                <InputLabel id="tipo-usuario-label">Tipo de Usuário</InputLabel>
                <Select
                  labelId="tipo-usuario-label"
                  value={tipo}
                  label="Tipo de Usuário"
                  onChange={(e) => setTipo(e.target.value as TipoUsuario)}
                >
                  <MenuItem value={"VENDEDOR"}>Vendedor</MenuItem>
                  <MenuItem value={"CONSUMIDOR"}>Consumidor</MenuItem>
                </Select>
              </FormControl>
              
              <Box sx={{ mt: 1.5 }}>
                  <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                          backgroundColor: 'black',
                          color: 'white',
                          py: 1,
                          fontSize: '0.9rem',
                          textTransform: 'none',
                          '&:hover': { backgroundColor: '#333' },
                      }}
                  >
                      Cadastrar
                  </Button>
                  <Typography variant="body2" sx={{ mt: 1.5, textAlign: 'center' }}>
                      Já tenho uma conta. <Link to="/login" style={{ color: 'black', fontWeight: 'bold' }}>Fazer Login</Link>
                  </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      <Snackbar open={!!erro} autoHideDuration={6000} onClose={() => setErro('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setErro('')} sx={{ width: '100%' }}>{erro}</Alert>
      </Snackbar>
      <Snackbar open={!!sucesso} autoHideDuration={4000} onClose={() => setSucesso('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSucesso('')} sx={{ width: '100%' }}>{sucesso}</Alert>
      </Snackbar>
    </Box>
  );
}