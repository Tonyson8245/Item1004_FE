import type message from "./message.interface";
import type member from "./member.interface";

interface channel {
    id: string; // idx
    name: string; // 채널명
    ownerId: string; // 채널 소유자 id
    imageUrl: string; // 채널 이미지
    data: object; // 임의로 설정 가능한 오브젝트를 넣을 수 있는 공간 
    invitationCode: string; // 게임종류
    isFrozen: string; // 서버종류
    memberCount: number;
    maxMemberCount: number;
    hideMessagesBeforeJoin: boolean;
    category: string;
    subcategory: string;
    privateTag: string;
    privateData: string;
    mutedUsers: [];
    members: member[];
    bannedUsers: [];
    pushNotificationDisabled: boolean;
    pushNotificationSoundAOS: string;
    pushNotificationSoundIOS: string;
    updatedAt: number
    createdAt: number,
    unreadCount: number,
    lastReadAt: number,
    lastMessage: message // 마지막으로 전송 받은 메세지
  }
  
  export default channel;



