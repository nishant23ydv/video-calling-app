import { StreamChat } from "stream-chat";

let chatClient: StreamChat | null = null;

export const getChatClient = () => {
  if (!chatClient) {
    chatClient = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY!
    );
  }
  return chatClient;
};