import type { GameRoleDto } from "@/domain/home/gameRoleDto";
import http from "../HomeHTTPClient";

export async function getGameRole<T>(gameIdx: string): Promise<GameRoleDto[]> {
  const url = "/games/" + gameIdx + "/roles";

  try {
    const result: GameRoleDto[] = await http.get(url);
    console.log(`api success`);
    return result;
  } catch (err) {
    console.log("API error");
    console.log(`api failed`);
    return Promise.reject(err);
  }
}
