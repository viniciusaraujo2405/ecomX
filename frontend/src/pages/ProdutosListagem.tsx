// frontend/src/pages/ProdutosListagem.tsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CircularProgress, Alert, Grid, Card, CardContent, Container, Button, Snackbar, CardMedia, CardActions
} from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

// Interfaces existentes
interface Produto {
  id: string;
  nome: string;
  descricao: string;
  estoque: number;
  preco: number;
  idVendedor: string;
  idCategoria: string;
  vendedor: { nome: string; };
  categoria: { nome: string; };
}

interface ProdutosListagemProps {
    categoriaSelecionadaId: string;
}

export default function ProdutosListagem({ categoriaSelecionadaId }: ProdutosListagemProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const { token, tipoUsuario } = useAuth();
  const navigate = useNavigate();

  const carregarProdutos = async () => {
    setCarregando(true);
    setErro('');
    try {
      const url = categoriaSelecionadaId ? `/produtos?idCategoria=${categoriaSelecionadaId}` : '/produtos';
      const produtosResponse = await api.get<Produto[]>(url);
      setProdutos(produtosResponse.data);
    } catch (err: any) {
      console.error("Erro ao carregar produtos:", err.response?.data?.error || err);
      setErro('Erro ao carregar os produtos.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, [categoriaSelecionadaId]);

  const handleAdicionarAoCarrinho = async (produtoId: string) => {
    setErro('');
    setSucesso('');

    if (!token) {
      setErro('Você precisa estar logado para adicionar um produto ao carrinho.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    if (tipoUsuario !== 'CONSUMIDOR') {
      setErro('Apenas consumidores podem adicionar produtos ao carrinho.');
      return;
    }

    try {
      const adicionarCarrinhoResponse = await api.post('/carrinho/item', {
        idProduto: produtoId,
        quantidade: 1,
      });
      console.log('Produto adicionado ao carrinho:', adicionarCarrinhoResponse.data);
      setSucesso('Produto adicionado ao carrinho!');
    } catch (err: any) {
      console.error("Erro ao adicionar ao carrinho:", err.response?.data?.error || err);
      setErro(err.response?.data?.error || 'Erro ao adicionar produto ao carrinho.');
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" sx={{ mb: 4 }}>
          Catálogo de Produtos
        </Typography>

        {carregando ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : erro ? (
          <Alert severity="error">{erro}</Alert>
        ) : (
          <Grid container spacing={4}>
            {produtos.length === 0 ? (
              <Grid item xs={12}>
                  <Alert severity="info" sx={{ width: '100%' }}>Nenhum produto encontrado.</Alert>
              </Grid>
            ) : (
              produtos.map((produto) => (
                <Grid item xs={12} sm={6} md={4} key={produto.id}>
                  {/* Card com layout flex para alinhar o botão no final */}
                  <Card sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 6
                      }
                  }}>
                    {/* Imagem do Produto */}
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://placehold.co/600x400/eee/ccc?text=${produto.nome}`} // Placeholder
                      alt={produto.nome}
                    />
                    {/* Conteúdo do Card */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {produto.categoria?.nome || 'Sem Categoria'}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2" fontWeight="bold">
                        {produto.nome}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{
                          height: 60, // Altura fixa para a descrição
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                      }}>
                        {produto.descricao}
                      </Typography>
                      <Typography variant="h5" component="p" fontWeight="bold" sx={{ mt: 2 }}>
                        R$ {produto.preco.toFixed(2)}
                      </Typography>
                    </CardContent>
                    
                    {/* Ações do Card (Botão) */}
                    {tipoUsuario !== 'VENDEDOR' && (
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleAdicionarAoCarrinho(produto.id)}
                          disabled={produto.estoque <= 0}
                          sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            textTransform: 'none',
                            py: 1.2,
                            '&:hover': {
                                backgroundColor: '#333'
                            }
                          }}
                        >
                          {produto.estoque > 0 ? 'Adicionar ao Carrinho' : 'Sem Estoque'}
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
      
      {/* Mensagens de feedback */}
      <Snackbar open={!!erro} autoHideDuration={4000} onClose={() => setErro('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setErro('')} sx={{ width: '100%' }}>{erro}</Alert>
      </Snackbar>
      <Snackbar open={!!sucesso} autoHideDuration={3000} onClose={() => setSucesso('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSucesso('')}>{sucesso}</Alert>
      </Snackbar>
    </>
  );
}