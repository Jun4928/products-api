import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from '@prisma/client';
import { SearchProductsQuery } from 'src/dto/search-products.query';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProduct(id: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async searchProducts(query: SearchProductsQuery): Promise<Product[]> {
    const { offset, limit, description, name } = query;

    return this.prisma.product.findMany({
      where: {
        name: { contains: name },
        description: { contains: description },
      },
      skip: offset || 0,
      take: limit || 30,
    });
  }
}
