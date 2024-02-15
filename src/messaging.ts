import axios from "axios";
import { Message } from "./types";
import { BALE_BOT_TOKEN } from "./constants";

const url = `https://tapi.bale.ai/bot${BALE_BOT_TOKEN}/`;

export async function sendMessage(
  chatId: number,
  text: string
): Promise<Message> {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      chat_id: chatId,
      text,
    },
    url: url + "sendMessage",
  };
  const result = await axios(options);
  const message: Message = result.data.result;
  return message;
}

export async function editMessage(
  text: string,
  chatId?: number,
  messageId?: number
) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      chat_id: chatId,
      message_id: messageId,
      text,
    },
    url: url + "editMessageText",
  };
  const result = await axios(options);
  const message: Message = result.data.result;
  return message;
}
