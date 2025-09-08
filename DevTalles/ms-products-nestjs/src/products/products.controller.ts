import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationRequest, PaginationResponse } from 'src/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @MessagePattern({ cmd: 'create-product' })
  async create(@Payload() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }
  @MessagePattern({ cmd: 'find-products' })
  async find(@Payload() paginationRequest: PaginationRequest): Promise<PaginationResponse<Product[]>> {
    return await this.productsService.find(paginationRequest);
  }
  @MessagePattern({ cmd: 'find-product' })
  async findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
  @MessagePattern({ cmd: 'update-product' })
  async update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }
  @MessagePattern({ cmd: 'delete-product' })
  async remove(@Payload('id', ParseIntPipe) id: number): Promise<void> {
    await this.productsService.remove(id);
  }
}
