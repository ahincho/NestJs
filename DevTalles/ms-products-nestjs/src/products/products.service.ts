import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { PaginationRequest, PaginationResponse } from 'src/common';
import { PrismaClient } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.product.create({ data: createProductDto });
  }
  async findAll(paginationRequest: PaginationRequest): Promise<PaginationResponse<Product[]>> {
    const { page, limit } = paginationRequest;
    const totalItems = await this.product.count();
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const items = await this.product.findMany({ take: limit, skip: (page - 1) * limit, where: { available: true } });
    return { totalItems, totalPages, currentPage: page, hasNextPage, items };
  }
  async findOne(id: number): Promise<Product> {
    const item = await this.product.findFirst({ where: { id, available: true } });
    if (!item) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return item;
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    const existingItem = await this.product.findUnique({ where: { id, available: true } });
    if (!existingItem) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.product.update({ where: { id }, data: updateProductDto });
  }
  async remove(id: number): Promise<void> {
    const existingItem = await this.product.findUnique({ where: { id } });
    if (!existingItem) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.product.update({ where: { id }, data: { available: false } });
  }
}
