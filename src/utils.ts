import axios from "axios";

export function get_merge_request_details(data: any) {
  const attributes = data.object_attributes;
  const title = attributes.title;
  const address = attributes.url;
  const description = attributes.description;
  const user = data.user;
  const created_by = user.username;
  const reviewers = data.reviewers || [];
  const assignees = data.assignees || [];

  return {
    title: title,
    address: address,
    description: description,
    created_by: created_by,
    assignees: assignees,
    reviewers: reviewers,
  };
}

export function get_user_string(user: any) {
  return user.name + "  @" + user.username;
}

export function get_merge_message(details: any) {
  let message =
    details.address +
    "\nمرج‌دهنده: " +
    details.created_by +
    "\nعنوان: " +
    details.title +
    "\nتوضیحات: \n" +
    details.description +
    "\n";
  let reviewer_info = "";
  for (const reviewer of details.reviewers) {
    reviewer_info += get_user_string(reviewer) + "\n";
  }
  if (reviewer_info.length > 0) {
    message += "ریویوکنندگان: \n" + reviewer_info;
  }
  let assignees_info = "";
  for (const assignee of details.assignees) {
    assignees_info += get_user_string(assignee) + "\n";
  }
  if (assignees_info.length > 0) {
    message += "اساین شدگان: \n" + assignees_info;
  }
  return message;
}

export async function send_message(message: string) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      chat_id: "CHAT_ID",
      text: message,
    },
    url: "https://tapi.bale.ai/bot{BALE_BOT_TOKEN_HERE}/sendMessage",
  };
  axios(options);
}
