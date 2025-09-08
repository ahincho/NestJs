import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber({maxDecimalPlaces: 4})
  @IsPositive()
  @Min(0.01)
  price: number;
  @IsNumber({maxDecimalPlaces: 0})
  @IsPositive()
  @Min(1)
  stock: number;
  constructor(name: string, description: string, price: number, stock: number) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }
}
