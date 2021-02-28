import { Controller, Get, Param, Query } from '@nestjs/common';
import { Product } from '@prisma/client';
import { SearchProductsQuery } from 'src/dto/search-products.query';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @Get('search')
  async searchProducts(@Query() query: SearchProductsQuery) {
    return await this.productsService.searchProducts(query);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return await this.productsService.getProduct(Number(id));
  }
}
