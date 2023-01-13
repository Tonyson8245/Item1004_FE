import { IsBoolean, IsNumber, IsOptional, Min } from "class-validator";

export class PaginationDto {
  @IsBoolean()
  hasResult: boolean;

  @IsNumber()
  @Min(1)
  @IsOptional()
  totalPage?: number;

  @IsBoolean()
  @IsOptional()
  hasNextPage?: boolean;
}
