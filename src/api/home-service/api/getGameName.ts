import type { GameDto } from "@/domain/home/gameDto";
import http from "../HomeHTTPClient";

export default async function getGameName<T>(
  keyword: string
): Promise<GameDto[]> {
  const url = "/search/games?keyword=" + keyword;
  try {
    const result: GameDto[] = await http.get(url);
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
