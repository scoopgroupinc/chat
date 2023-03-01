export interface IMessage {
  userID: string;
  receiverID: string;
  name: string;
  content: string;
  createdAt: Date;
}

export interface ITyping {
  toUserID: string;
  typing: boolean;
}

export interface IOnline {
  userId: string;
  checkecUserId: string;
}
