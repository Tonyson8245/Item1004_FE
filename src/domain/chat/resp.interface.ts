import type channel from "./channel.interface";
import type message from "./messagefuck.interface";
export default interface resp {
  channels?: channel[];
  messages?: message[];
  hasNext: boolean;
}
