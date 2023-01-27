export default interface messagefuck {
  id: string;
  channelId: string;
  userId: string;
  username: string;
  profileImageUrl: string;
  type: string;
  text: string;
  data: object;
  fileUrl: string;
  mentions: [];
  translations: object;
  parentMessage: object;
  reactions: object;
  ownReactions: [];
  createdAt: number;
}
