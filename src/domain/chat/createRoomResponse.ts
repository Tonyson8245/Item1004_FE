import type meta from "../common/meta.interface";


export interface createRoomResponse {
  meta: meta;
  // 채팅방 ID
  result: string;
}

export default createRoomResponse;