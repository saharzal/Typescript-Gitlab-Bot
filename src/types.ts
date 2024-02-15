export type Message = {
  message_id: number;
  from?: User;
  date: number;
  chat: Chat;
  forward_from?: User;
  forward_from_chat?: Chat;
  forward_from_message_id?: number;
  forward_date?: number;
  reply_to_message?: Message;
  edite_date?: number; // edit_date??
  text?: string;
};

export interface Chat {
  id: number;
  type: "group" | "channel" | "private";
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface User {
  id?: number;
  isBot: boolean;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
}

export interface GitlabUser {
  id: string;
  name: string;
  username: string;
}

export interface MergeRequest {
  id: number;
  branch: string;
  title: string;
  url: string;
  description?: string;
  author: GitlabUser;
  reviewers: GitlabUser[];
  assignees: GitlabUser[];
  state: "merged" | "closed" | "opened";
}

export type Change = {
  previous: any | null;
  current: any | null;
};

export type MergeMessageInfo = {
  mergeId: number;
  messageId: number;
  chatId: number;
};
