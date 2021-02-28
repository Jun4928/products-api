import { PrismaClient } from '@prisma/client';
import PRODUCTS from './products.json';

const prisma = new PrismaClient();

const main = async () => {
  const products = Object.values(PRODUCTS);

  const createPosts = products.map((product) =>
    prisma.product.create({ data: { ...product, cost: Number(product.cost) } }),
  );

  await prisma.$transaction(createPosts);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
