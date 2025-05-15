import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
   @IsOptional()
   @IsNumber()
   @Min(1)
   @Type(() => Number)
   @IsPositive()
   limit?: number;
   
   @IsOptional()
   @IsNumber()
   @Min(0)
   @Type(() => Number)
   offset?: number;
}