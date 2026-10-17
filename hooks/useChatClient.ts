"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/nextjs";
import { chatTokenProvider } from "@/actions/stream.action";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export const useChatClient = () => {
  const { user, isLoaded } = useUser();
  const [client, setClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;
    let cancelled = false;
    const chatClient = StreamChat.getInstance(apiKey);

    const connect = async () => {
      if (!chatClient.userID) {
        const token = await chatTokenProvider();
        await chatClient.connectUser(
          {
            id: user.id,
            name: user.username || user.firstName || "Guest",
            image: user.imageUrl,
          },
          token
        );
      }
      if (!cancelled) setClient(chatClient);
    };

    connect();
    return () => {
      cancelled = true;
    };
  }, [user?.id, isLoaded]);

  return client;
};