import { get_merge_message, get_merge_request_details, send_message } from "./utils";

export function handle_merge_request_event(data: any) {
  if ("object_attributes" in data && "action" in data.object_attributes) {
    const action = data.object_attributes.action;
    console.log("action: ", action);
    if (action === "open") {
      const details = get_merge_request_details(data);
      console.log("details: ", details);
      const message = get_merge_message(details);
      console.log("message: ", message);
      send_message(message);
    }
  }
}
