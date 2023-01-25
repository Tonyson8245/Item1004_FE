import type { UserDto } from "./posts/UserDto";
import { ValidateNested } from "class-validator";
import type { GamePostContentDetailDto } from "./posts/GamePostContentDetailDto";
import type meta from "../common/meta.interface";

export class getProductResponse {
  meta: meta;
  result: GamePostContentDetailDto;
}
