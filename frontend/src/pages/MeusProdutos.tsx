// frontend/src/pages/MeusProdutos.tsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Container, Button, CircularProgress, Alert,
  TextField, FormControl, InputLabel, Select, MenuItem, Grid, Paper, Card, CardContent, CardMedia, CardActions, Divider, IconButton, Snackbar, Fab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../auth/AuthContext';
import api from '../api/axios';

// Interfaces
interface Produto {
  id: string; nome: string; descricao: string; estoque: number; preco: number; idVendedor: string; idCategoria: string; urlImagem?: string; categoria?: { nome: string; };
}
interface Categoria {
  id: string; nome: string;
}

export default function MeusProdutos() {
  const { token, tipoUsuario } = useAuth();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [formValues, setFormValues] = useState({
    nome: '', descricao: '', estoque: '', preco: '', idCategoria: '', urlImagem: '',
  });
  const [editandoProdutoId, setEditandoProdutoId] = useState<string | null>(null);
  const [formVisivel, setFormVisivel] = useState(false);

  // --- Lógica de Fetch ---
  const fetchProdutos = async () => {
    setErro('');
    try {
      const response = await api.get<Produto[]>('/produtos/meus-produtos');
      setProdutos(response.data);
    } catch (err: any) {
      setErro('Erro ao carregar seus produtos.');
    } finally {
      setCarregando(false);
    }
  };
  const fetchCategorias = async () => {
    try {
      const response = await api.get<Categoria[]>('/categorias');
      setCategorias(response.data);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  };
  useEffect(() => {
    if (token && tipoUsuario === 'VENDEDOR') {
      fetchProdutos();
      fetchCategorias();
    } else {
        setCarregando(false);
        if (!token) setErro('Você precisa estar logado para ver esta página.');
        else setErro('Apenas vendedores podem acessar esta página.');
    }
  }, [token, tipoUsuario]);

  // --- Funções de Manipulação do Formulário ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name as string]: value }));
  };
  const handleSelectChange = (e: any) => {
    setFormValues(prev => ({ ...prev, idCategoria: e.target.value }));
  };
  const resetAndHideForm = () => {
    setFormValues({ nome: '', descricao: '', estoque: '', preco: '', idCategoria: '', urlImagem: '' });
    setEditandoProdutoId(null);
    setFormVisivel(false);
  };
  const handleAbrirCadastro = () => {
    resetAndHideForm();
    setFormVisivel(true);
  };
  const handleAbrirEdicao = (produto: Produto) => {
    setEditandoProdutoId(produto.id);
    setFormValues({
      nome: produto.nome,
      descricao: produto.descricao,
      estoque: produto.estoque.toString(),
      preco: produto.preco.toString(),
      idCategoria: produto.idCategoria,
      urlImagem: produto.urlImagem || '',
    });
    setFormVisivel(true);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    const { nome, descricao, estoque, preco, idCategoria, urlImagem } = formValues;
    if (!nome || !descricao || !estoque || !preco || !idCategoria) {
      setErro('Todos os campos, exceto a URL da imagem, são obrigatórios.');
      return;
    }

    try {
      if (editandoProdutoId) {
        const updatePayload = {
          nome, descricao, estoque: parseInt(estoque), preco: parseFloat(preco), idCategoria,
        };
        await api.put(`/produtos/${editandoProdutoId}`, updatePayload);
        setSucesso('Produto atualizado com sucesso!');
      } else {
        const createPayload = {
          nome, descricao, estoque: parseInt(estoque), preco: parseFloat(preco), idCategoria, urlImagem: urlImagem || null,
        };
        await api.post('/produtos', createPayload);
        setSucesso('Produto cadastrado com sucesso!');
      }
      resetAndHideForm();
      fetchProdutos();
    } catch (err: any) {
      console.error("Erro no submit:", err.response?.data);
      setErro(err.response?.data?.error || 'Ocorreu um erro ao salvar o produto.');
    }
  };

  const handleDeletarProduto = async (produtoId: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) return;
    try {
      await api.delete(`/produtos/${produtoId}`);
      setSucesso('Produto deletado com sucesso!');
      fetchProdutos();
    } catch (err: any) {
      setErro(err.response?.data?.error || 'Erro ao deletar produto.');
    }
  };

  if (carregando) return <Box display="flex" justifyContent="center" alignItems="center" height="80vh"><CircularProgress sx={{ color: 'black' }} /></Box>;
  if (erro && !carregando) return <Container sx={{py:4}}><Alert severity="error">{erro}</Alert></Container>;

  return (
    <React.Fragment>
      <Container maxWidth="xl" sx={{ py: 4, pb: 12 }}> {/* Padding bottom para o FAB não cobrir conteúdo */}
        <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" sx={{ mb: 4 }}>
          Meus Produtos
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={formVisivel ? 7 : 12}>
            <Grid container spacing={3} justifyContent="center">
              {produtos.length === 0 ? (
                <Grid item xs={12}><Alert severity="info">Você ainda não cadastrou nenhum produto.</Alert></Grid>
              ) : (
                produtos.map((produto) => (
                  <Grid item xs={12} sm={6} md={formVisivel ? 6 : 4} lg={formVisivel ? 4 : 3} key={produto.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia component="img" height="160" image={produto.urlImagem || `https://placehold.co/600x400/eee/ccc?text=${encodeURIComponent(produto.nome)}`} alt={produto.nome} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="h2" fontWeight="bold">{produto.nome}</Typography>
                        <Typography variant="body2" color="text.secondary"><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</Typography>
                        <Typography variant="body2" color="text.secondary"><strong>Estoque:</strong> {produto.estoque} un.</Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" startIcon={<EditIcon />} onClick={() => handleAbrirEdicao(produto)} sx={{ color: 'black' }}>Editar</Button>
                        <Button size="small" startIcon={<DeleteIcon />} color="error" onClick={() => handleDeletarProduto(produto.id)}>Deletar</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>

          {formVisivel && (
            <Grid item xs={12} md={5}>
              <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 24 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>{editandoProdutoId ? 'Editar Produto' : 'Cadastrar Novo Produto'}</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField name="nome" label="Nome do Produto" value={formValues.nome} onChange={handleInputChange} fullWidth required />
                  <TextField name="descricao" label="Descrição" value={formValues.descricao} onChange={handleInputChange} fullWidth required multiline rows={3} />
                  <TextField name="urlImagem" label="URL da Imagem (Opcional)" value={formValues.urlImagem} onChange={handleInputChange} fullWidth />
                  <Grid container spacing={2}>
                    <Grid item xs={6}><TextField name="preco" label="Preço (R$)" type="number" value={formValues.preco} onChange={handleInputChange} fullWidth required inputProps={{ step: "0.01" }}/></Grid>
                    <Grid item xs={6}><TextField name="estoque" label="Estoque" type="number" value={formValues.estoque} onChange={handleInputChange} fullWidth required /></Grid>
                  </Grid>
                  <FormControl fullWidth required>
                    <InputLabel id="categoria-label">Categoria</InputLabel>
                    <Select labelId="categoria-label" name="idCategoria" value={formValues.idCategoria} label="Categoria" onChange={handleSelectChange}>
                      {categorias.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.nome}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button type="submit" variant="contained" sx={{ flex: 2, backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}>
                        {editandoProdutoId ? 'Salvar Alterações' : 'Cadastrar Produto'}
                    </Button>
                    <Button variant="outlined" onClick={resetAndHideForm}>Cancelar</Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
      
      {/* ===== BOTÃO ADICIONADO DE VOLTA AQUI ===== */}
      {!formVisivel && (
        <Fab
          variant="extended"
          onClick={handleAbrirCadastro}
          sx={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Cadastrar Novo Produto
        </Fab>
      )}

      {/* SnackBar de Feedback */}
      <Snackbar open={!!erro} autoHideDuration={4000} onClose={() => setErro('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setErro('')}>{erro}</Alert>
      </Snackbar>
      <Snackbar open={!!sucesso} autoHideDuration={3000} onClose={() => setSucesso('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSucesso('')}>{sucesso}</Alert>
      </Snackbar>
    </React.Fragment>
  );
}