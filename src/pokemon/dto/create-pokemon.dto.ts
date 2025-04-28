import { IsNumber, IsString, MinLength,MaxLength, IsPositive, Min, IsInt } from "class-validator";

export class CreatePokemonDto {
   @IsNumber()
   @IsPositive()
   @IsInt()
   @Min(1)
   no: number;
   @IsString()
   @MinLength(2)
   @MaxLength(20)
   name: string;
}
