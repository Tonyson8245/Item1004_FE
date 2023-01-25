import type { GameServerDto } from "@/domain/home/gameServerDto";
import http from "../HomeHTTPClient";

export async function getServerName<T>(
  gameIdx: number,
  keyword: string
): Promise<GameServerDto[]> {
  const url = "/search/games/" + gameIdx + "/servers?keyword=" + keyword;
  try {
    const result: GameServerDto[] = await http.get(url);
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
