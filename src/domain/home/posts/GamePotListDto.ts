import { PaginationDto } from "../../common/PaginationDto";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import type { GamePostSummaryDto } from "./GamePostSummaryDto";

export class GamePostListDto {
  @ValidateNested()
  pagination: PaginationDto;

  @IsArray()
  @IsOptional()
  posts?: GamePostSummaryDto[];
}
