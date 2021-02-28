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
    const { offset, limit, ...rest } = query;
    const where = this.getSearchOption(rest);

    return this.prisma.product.findMany({
      where,
      skip: Number(offset) || 0,
      take: Number(limit) || 30,
    });
  }

  private getSearchOption(
    query: Omit<SearchProductsQuery, 'offset' | 'limit'>,
  ) {
    const mapper = {
      name: { contains: query.name },
      description: { contains: query.description },
    };

    return Object.keys(query).reduce((acc, key) => {
      acc[key] = mapper[key];
      return acc;
    }, {});
  }
}
