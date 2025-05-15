import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const usuario = await prisma.usuario.create({
    data: {
      nome: 'João',
      email: 'joao@example2.com',
      senha: 'senha123',
      tipo: 'LOJISTA',
    },
  });

  const categoria = await prisma.categoria.create({
    data: {
      nome: 'Eletrônicos',
      descricao: 'Dispositivos eletrônicos em geral',
    },
  });

  const loja = await prisma.loja.create({
    data: {
      nome: 'Tech Store',
      descricao: 'Loja de tecnologia',
      lojista: { connect: { id: usuario.id } },
    },
  });

  const produto = await prisma.produto.create({
    data: {
      nome: 'Smartphone',
      descricao: 'Celular topo de linha',
      estoque: 10,
      preco: 2999.99,
      loja: { connect: { id: loja.id } },
      categoria: { connect: { id: categoria.id } },
    },
  });

  const endereco = await prisma.endereco.create({
    data: {
      rua: 'Rua das Flores',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567',
      usuario: { connect: { id: usuario.id } },
    },
  });

  const pagamento = await prisma.pagamento.create({
    data: {
      metodo: 'PIX',
      valor: 2999.99,
      status: 'APROVADO',
    },
  });

  const pedido = await prisma.pedido.create({
    data: {
      consumidor: { connect: { id: usuario.id } },
      loja: { connect: { id: loja.id } },
      pagamento: { connect: { id: pagamento.id } },
      endereco: { connect: { id: endereco.id } },
      status: 'PAGO',
    },
  });

  await prisma.itemPedido.create({
    data: {
      pedido: { connect: { id: pedido.id } },
      produto: { connect: { id: produto.id } },
      quantidade: 1,
    },
  });

  const carrinho = await prisma.carrinho.create({
    data: {
      usuario: { connect: { id: usuario.id } },
    },
  });

  await prisma.carrinhoItem.create({
    data: {
      carrinho: { connect: { id: carrinho.id } },
      produto: { connect: { id: produto.id } },
      quantidade: 2,
    },
  });

  await prisma.avaliacao.create({
    data: {
      produto: { connect: { id: produto.id } },
      usuario: { connect: { id: usuario.id } },
      nota: 5,
      comentario: 'Excelente produto!',
    },
  });

  await prisma.notificacao.create({
    data: {
      usuario: { connect: { id: usuario.id } },
      mensagem: 'Seu pedido foi enviado!',
      data: new Date(),
      lida: false,
    },
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
