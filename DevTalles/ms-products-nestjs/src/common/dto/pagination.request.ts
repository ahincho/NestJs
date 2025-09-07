import { Type } from "class-transformer";
import { IsNumber, IsPositive, Min } from "class-validator";

export class PaginationRequest {
  @IsNumber({maxDecimalPlaces: 0})
  @IsPositive()
  @Type(() => Number)
  page: number = 1;
  @IsNumber({maxDecimalPlaces: 0})
  @IsPositive()
  @Min(10)
  @Type(() => Number)
  limit: number = 10;
}
