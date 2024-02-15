import { getBaleNicksByGitlabNicks } from "./constants";
import { GitlabUser, MergeRequest } from "./types";

export function getMergeRequestDetails(data: any): MergeRequest {
  const attributes = data.object_attributes;
  const title = attributes.title;
  const address = attributes.url;
  const description = attributes.description;
  const user = data.user;
  const reviewers = data.reviewers || [];
  const assignees = data.assignees || [];

  return {
    id: attributes.id,
    state: attributes.state,
    title,
    url: address,
    description,
    author: user,
    assignees: assignees,
    reviewers: reviewers,
    branch: attributes.source_branch,
  };
}

export function getUserString(user: GitlabUser) {
  return (
    "@" + (getBaleNicksByGitlabNicks().get(user.username) ?? user.username)
  );
}

export function getMergeMessage(mergeRequest: MergeRequest) {
  let message =
    mergeRequest.url +
    "\n" +
    mergeRequest.title +
    "\n*مرج‌دهنده:* " +
    mergeRequest.author.username +
    "\n";

  if (mergeRequest.description && mergeRequest.description.length > 0) {
    message = message.concat("*توضیحات:* \n", mergeRequest.description, "\n");
  }
  let reviewer_info = "";
  for (const reviewer of mergeRequest.reviewers) {
    reviewer_info += getUserString(reviewer) + "\n";
  }
  if (reviewer_info.length > 0) {
    message += "*ریویوکنندگان:* \n" + reviewer_info;
  }
  // let assignees_info = "";
  // for (const assignee of mergeRequest.assignees) {
  //   assignees_info += getUserString(assignee) + "\n";
  // }
  // if (assignees_info.length > 0) {
  //   message += "*اساین شده:* \n" + assignees_info;
  // }
  if (mergeRequest.state === "merged") {
    message += "\n🎊 *مرج شد!* ";
  } else if (mergeRequest.state === "closed") {
    message += "\n❌ *بسته شد!*";
  }

  return message;
}


