import { numberToKorean } from "@/common";
import type meta from "../common/meta.interface";
import type { PaginationDto } from "../common/PaginationDto";
import type { GamePostSummaryDto } from "./posts/GamePostSummaryDto";

export class getProductCardBodyDto {
  page: number;
  unit: number;
  type: string;
  productTypes?: string;
  gameIdx?: number;
  serverIdx?: number;
  constructor(
    page: number,
    unit: number,
    type: string,
    productTypes?: string,
    gameIdx?: number,
    serverIdx?: number
  ) {
    this.page = page;
    this.unit = unit;
    this.type = type;
    productTypes == ""
      ? delete this.productTypes
      : (this.productTypes = productTypes);
    gameIdx == 0 ? this.gameIdx : (this.gameIdx = gameIdx);
    serverIdx == 0 ? delete this.serverIdx : (this.serverIdx = serverIdx);
  }
}
export class getProductCardResultDto {
  pagination: PaginationDto;
  posts?: GamePostSummaryDto[];
  constructor(pagination: PaginationDto, posts: GamePostSummaryDto[]) {
    this.pagination = pagination;
    this.posts = posts;
  }
}
export class getProductCardResponseDto {
  meta: meta;
  result?: getProductCardResultDto;
}
