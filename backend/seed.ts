const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seed() {
  // Criar usuários
  const user1 = await prisma.user.create({
    data: {
      name: 'User1',
      email: 'user123@example.com',
      password: await bcrypt.hash('password1', 10),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'User2',
      email: 'user212@example.com',
      password: await bcrypt.hash('password2', 10),
    },
  });

  // Criar posts e comentários
  const posts = [];
  for (let i = 1; i <= 5; i++) {
    const post = await prisma.post.create({
      data: {
        userId: i % 2 === 0 ? user1.id : user2.id,
        title: `Post ${i} Title`,
        description: `Post ${i} Description`,
        image: `post-image-${i}.jpg`,
      },
    });

    posts.push(post);

    // Cada post tem 2 comentários
    for (let j = 1; j <= 2; j++) {
      await prisma.comment.create({
        data: {
          userId: user2.id,
          postId: post.id,
          description: `Comment ${j} on Post ${i}`,
        },
      });
    }
  }

  console.log('Seed completed successfully');

  // Encerre a conexão com o banco de dados
  await prisma.$disconnect();
}

// Chame a função para executar a seed
seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    // Certifique-se de encerrar a conexão com o banco de dados, mesmo em caso de erro
    await prisma.$disconnect();
  });
