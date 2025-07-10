// frontend/src/pages/MeuCarrinho.tsx
import React, { useEffect, useState, useMemo } from 'react';
import {
  Box, Typography, Container, Button, CircularProgress, Alert,
  Grid, Paper, IconButton, Divider, Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axios';

// Interface para o item do carrinho que vem do backend
interface CarrinhoItem {
  id: string;
  idProduto: string;
  quantidade: number;
  produto: {
    id: string;
    nome: string;
    preco: number;
    estoque: number;
    urlImagem?: string; // Adicionado para a imagem
  };
}

// Interface para o carrinho completo
interface Carrinho {
  id: string;
  idUsuario: string;
  itens: CarrinhoItem[];
}

export default function MeuCarrinho() {
  const { token } = useAuth();
  const [carrinho, setCarrinho] = useState<Carrinho | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const fetchCarrinho = async () => {
    setCarregando(true);
    setErro('');
    try {
      if (!token) throw new Error("Usuário não autenticado.");
      const response = await api.get<Carrinho>('/carrinho/meu');
      setCarrinho(response.data);
    } catch (err: any) {
      console.error("Erro ao carregar carrinho:", err.response?.data?.error || err);
      setErro('Erro ao carregar os itens do carrinho.');
      setCarrinho(null);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCarrinho();
    } else {
      setCarregando(false);
      setErro('Você precisa estar logado para ver seu carrinho.');
    }
  }, [token]);

    const handleUpdateQuantidade = async (idProduto: string, novaQuantidade: number) => {
    setErro('');
    setSucesso('');
    if (!carrinho || !token) return;

    const produtoNoCarrinho = carrinho.itens.find(item => item.idProduto === idProduto);
    if (produtoNoCarrinho && novaQuantidade > produtoNoCarrinho.produto.estoque) {
        setErro(`Estoque máximo para ${produtoNoCarrinho.produto.nome} é ${produtoNoCarrinho.produto.estoque}.`);
        return;
    }

    try {
      if (novaQuantidade <= 0) {
        await api.delete(`/carrinho/item/${idProduto}`);
        setSucesso('Item removido do carrinho!');
      } else {
        await api.put('/carrinho/item', { idProduto, quantidade: novaQuantidade });
      }
      fetchCarrinho();
    } catch (err: any) {
      console.error("Erro ao atualizar quantidade/remover item:", err.response?.data?.error || err);
      setErro(err.response?.data?.error || 'Erro ao atualizar o item do carrinho.');
    }
  };

  const handleRemoverItem = async (idProduto: string) => {
    try {
      await api.delete(`/carrinho/item/${idProduto}`);
      setSucesso('Item removido do carrinho!');
      fetchCarrinho();
    } catch (err: any) {
      setErro(err.response?.data?.error || 'Erro ao remover item do carrinho.');
    }
  };

  const handleLimparCarrinho = async () => {
    try {
      await api.delete('/carrinho/limpar');
      setSucesso('Carrinho limpo com sucesso!');
      setCarrinho(null);
    } catch (err: any) {
      setErro(err.response?.data?.error || 'Erro ao limpar o carrinho.');
    }
  };

  const itensOrdenados = useMemo(() => {
    if (!carrinho?.itens) return [];
    return [...carrinho.itens].sort((a, b) => a.produto.nome.localeCompare(b.produto.nome));
  }, [carrinho?.itens]);

  const subtotal = itensOrdenados.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0) || 0;

  if (carregando) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (erro) {
    return <Container maxWidth="lg" sx={{ py: 4 }}><Alert severity="error">{erro}</Alert></Container>;
  }
  
  if (!carrinho || itensOrdenados.length === 0) {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
                Meu Carrinho
            </Typography>
            <Alert severity="info" sx={{ mt: 4 }}>Seu carrinho está vazio.</Alert>
        </Container>
    );
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" sx={{ mb: 4 }}>
          Meu Carrinho
        </Typography>

        <Grid container spacing={4}>
          {/* Coluna da Esquerda: Itens do Carrinho */}
          <Grid item xs={12} md={8}>
            <Box display="flex" flexDirection="column" gap={2}>
              {itensOrdenados.map((item) => (
                <Paper key={item.id} variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  {/* Imagem do Produto */}
                  <Box
                    component="img"
                    src={item.produto.urlImagem || `https://placehold.co/100x100/eee/ccc?text=Produto`}
                    alt={item.produto.nome}
                    sx={{ width: 80, height: 80, mr: 2, borderRadius: 1 }}
                  />
                  {/* Nome e Preço */}
                  <Box flexGrow={1}>
                    <Typography variant="h6" fontWeight="bold">{item.produto.nome}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      R$ {item.produto.preco.toFixed(2)} / unidade
                    </Typography>
                  </Box>
                  {/* Controle de Quantidade */}
                  <Box display="flex" alignItems="center" sx={{ mx: 2 }}>
                    <IconButton size="small" onClick={() => handleUpdateQuantidade(item.idProduto, item.quantidade - 1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 1.5 }}>{item.quantidade}</Typography>
                    <IconButton size="small" onClick={() => handleUpdateQuantidade(item.idProduto, item.quantidade + 1)} disabled={item.quantidade >= item.produto.estoque}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  {/* Preço Total do Item */}
                  <Typography variant="body1" fontWeight="bold" sx={{ width: 100, textAlign: 'right' }}>
                    R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                  </Typography>
                  {/* Botão de Remover */}
                  <IconButton edge="end" aria-label="remover" sx={{ ml: 2 }} onClick={() => handleRemoverItem(item.idProduto)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Coluna da Direita: Resumo do Pedido */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 24 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Resumo do Pedido
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="body1">Subtotal ({itensOrdenados.length} itens)</Typography>
                <Typography variant="body1" fontWeight="bold">R$ {subtotal.toFixed(2)}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Taxas e frete serão calculados no checkout.
              </Typography>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => setSucesso('Funcionalidade de pagamento em desenvolvimento!')}
                sx={{ 
                    py: 1.5, 
                    backgroundColor: 'black',
                    '&:hover': { backgroundColor: '#333' }
                }}
              >
                Realizar Pagamento
              </Button>
              <Button
                variant="text"
                fullWidth
                color="error"
                sx={{ mt: 2 }}
                onClick={handleLimparCarrinho}
              >
                Limpar Carrinho
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={!!erro} autoHideDuration={4000} onClose={() => setErro('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setErro('')}>{erro}</Alert>
      </Snackbar>
      <Snackbar open={!!sucesso} autoHideDuration={3000} onClose={() => setSucesso('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSucesso('')}>{sucesso}</Alert>
      </Snackbar>
    </React.Fragment>
  );
}