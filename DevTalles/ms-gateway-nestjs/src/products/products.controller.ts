import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationRequest, PaginationResponse } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';
import { firstValueFrom, Observable } from 'rxjs';
import { Product } from './product';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE)
    private readonly productsMicroservices: ClientProxy,
  ) { }
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsMicroservices.send({ cmd: 'create-product' }, createProductDto);
  }
  @Get()
  findProducts(@Query() paginationRequest: PaginationRequest): Observable<PaginationResponse<Product[]>> {
    return this.productsMicroservices.send({ cmd: 'find-products' }, paginationRequest);
  }
  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(this.productsMicroservices.send({ cmd: 'find-product' }, { id }));
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Patch(':id')
  async updateOneProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: Partial<CreateProductDto>) {
    try {
      const product = await firstValueFrom(this.productsMicroservices.send({ cmd: 'update-product' }, { id, ...updateProductDto }));
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Delete(':id')
  deleteOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsMicroservices.send({ cmd: 'delete-product' }, { id });
  }
}
