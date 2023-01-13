import { numberToKorean } from "@/common";
import type meta from "../common/meta.interface";
import type { PaginationDto } from "../common/PaginationDto";
import type { GamePostSummaryDto } from "./posts/GamePostSummaryDto";

export class getProductCardBodyDto {
  page: number;
  unit: number;
  type: string;
  productTypes?: string;
  gameIdx?: string;
  serverIdx?: string;
  constructor(
    page: number,
    unit: number,
    type: string,
    productTypes?: string,
    gameIdx?: string,
    serverIdx?: string
  ) {
    this.page = page;
    this.unit = unit;
    this.type = type;
    this.productTypes = productTypes;
    this.gameIdx = gameIdx;
    this.serverIdx = serverIdx;
  }
}
export class getProductCardResultDto {
  pagination: PaginationDto;
  posts?: GamePostSummaryDto;
  constructor(pagination: PaginationDto, posts: GamePostSummaryDto) {
    this.pagination = pagination;
    this.posts = posts;
  }
}
export class getProductCardResponseDto {
  meta: meta;
  result?: getProductCardResultDto;
}
