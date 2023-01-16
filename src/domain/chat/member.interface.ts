export default interface member {
    id: string;
    username: string;
    profileImageUrl: string;
    updatedAt: number;
    createdAt: number;
    lastReadAt: number;
    lastSentAt: number;
    disablePushNotification?:boolean;
    data?: object;
}
  

