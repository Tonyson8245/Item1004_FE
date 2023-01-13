import type { UserDto } from "./UserDto";
import { ValidateNested } from "class-validator";
import type { GamePostContentDetailDto } from "./GamePostContentDetailDto";

export class GamePostDetailDto {
  writer: UserDto;
  post: GamePostContentDetailDto;
}
