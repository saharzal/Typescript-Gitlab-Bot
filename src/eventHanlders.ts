import { WEB_CHAT_ID } from "./constants";
import { getDataFromCache, setDataInCache } from "./database";
import { editMessage, sendMessage } from "./messaging";
import { MergeMessageInfo } from "./types";
import { getMergeMessage, getMergeRequestDetails } from "./utils";

const MergeRequestHandledActions = [
  "open",
  "merge",
  "update",
  "close",
  "reopen",
];

export async function handleMergeRequestEvent(data: any) {
  if ("object_attributes" in data && "action" in data.object_attributes) {
    const action = data.object_attributes.action;
    console.log("action: ", action);
    if (MergeRequestHandledActions.includes(action)) {
      const branch: string = data.object_attributes.source_branch;
      const chatId = getChatIdBasedOnBranchName(branch);
      if (chatId) {
        if (action === "open") {
          await openActionHandler(data, chatId);
        } else {
          await updateActionHandler(data);
        }
      }
    }
  }
}

function getChatIdBasedOnBranchName(branch: string): number | undefined {
  const isWeb =
    branch.includes("web/") ||
    branch.includes("sites-main/") ||
    branch.includes("ad-panel/") ||
    branch.includes("ui/") ||
    branch.includes("tooshle/");

  return isWeb ? WEB_CHAT_ID : undefined;
}
async function openActionHandler(data: any, chatId: number) {
  let mergeRequest = getMergeRequestDetails(data);

  console.log("details: ", mergeRequest);
  const text = getMergeMessage(mergeRequest);
  console.log("text: ", text);
  const message = await sendMessage(chatId, text);
  console.log("message received: ", message);
  const mergeMessageInfo: MergeMessageInfo = {
    mergeId: mergeRequest.id,
    chatId: message.chat.id,
    messageId: message.message_id,
  };
  await setDataInCache(
    mergeRequest.id.toString(),
    JSON.stringify(mergeMessageInfo)
  );
}

async function updateActionHandler(data: any) {
  const mergeId: number = data.object_attributes.id;
  console.log("updateActionHandler", mergeId);
  const mergeMessageInfo = await getDataFromCache<MergeMessageInfo>(
    mergeId.toString()
  );
  if (mergeMessageInfo) {
    let mergeRequest = getMergeRequestDetails(data);
    if (mergeRequest) {
      console.log("newMerge: ", mergeRequest);
      const text = getMergeMessage(mergeRequest);
      await editMessage(
        text,
        mergeMessageInfo.chatId,
        mergeMessageInfo.messageId
      );
    }
  }
}
