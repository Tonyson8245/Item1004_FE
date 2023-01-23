import { UserDto } from "./UserDto";
import { ValidateNested } from "class-validator";
import { GamePostContentSummaryDto } from "./GamePostContentSummaryDto";

export class GamePostSummaryDto {
  @ValidateNested()
  writer: UserDto;

  @ValidateNested()
  post: GamePostContentSummaryDto;
}
