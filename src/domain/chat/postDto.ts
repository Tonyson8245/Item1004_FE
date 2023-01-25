import type meta from "../common/meta.interface";
import type postResult from "@/domain/chat/postResult.interface";


export class postDto {
  meta: meta;
  result: postResult;
}