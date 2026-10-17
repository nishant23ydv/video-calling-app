// components/MeetingChat.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { StreamChat, Channel as StreamChannel, Event } from "stream-chat";
import { useUser } from "@clerk/nextjs";
import { chatTokenProvider } from "@/actions/stream.action";
import { Send } from "lucide-react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

type ChatMessage = {
  id: string;
  text: string;
  user: { id: string; name?: string };
  created_at: string;
};

const MeetingChat = ({ callId }: { callId: string }) => {
  const { user } = useUser();
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    let chatClient: StreamChat;
    let chatChannel: StreamChannel;
    let isCancelled = false;

    const handleNewMessage = (event: Event) => {
      if (!event.message) return;

      const newMessage = event.message;

      setMessages((prev) => {
        if (prev.some((m) => m.id === newMessage.id)) {
          return prev;
        }
        return [
          ...prev,
          {
            id: newMessage.id,
            text: newMessage.text || "",
            user: {
              id: newMessage.user?.id || "",
              name: newMessage.user?.name,
            },
            created_at: newMessage.created_at as unknown as string,
          },
        ];
      });
    };

    const init = async () => {
      const token = await chatTokenProvider();
      chatClient = StreamChat.getInstance(apiKey);

      if (!chatClient.userID) {
        await chatClient.connectUser(
          {
            id: user.id,
            name: user.username || user.firstName || "Guest",
            image: user.imageUrl,
          },
          token
        );
      }

      if (isCancelled) return;

      chatChannel = chatClient.channel("messaging", `meeting-${callId}`, {
        members: [user.id],
      });

      await chatChannel.watch();

      if (isCancelled) return;

      const initialMessages: ChatMessage[] = chatChannel.state.messages.map(
        (m) => ({
          id: m.id,
          text: m.text || "",
          user: { id: m.user?.id || "", name: m.user?.name },
          created_at: m.created_at as unknown as string,
        })
      );

      setMessages(initialMessages);
      setClient(chatClient);
      setChannel(chatChannel);
      setLoading(false);

      chatChannel.on("message.new", handleNewMessage);
    };

    init();

    return () => {
      isCancelled = true;
      chatChannel?.off("message.new", handleNewMessage);
    };
  }, [user, callId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !channel) return;
    await channel.sendMessage({ text: text.trim() });
    setText("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-[#A5A8B8] text-sm">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-[#6B7080] gap-2">
            <div className="text-3xl">💬</div>
            <p className="text-sm">No chats here yet...</p>
          </div>
        )}

        {messages.map((msg) => {
          const isOwn = msg.user.id === user?.id;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}
            >
              <span className="text-xs text-[#A5A8B8] mb-1 px-1">
                {isOwn ? "You" : msg.user.name || "Guest"}
              </span>
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm break-words ${
                  isOwn
                    ? "bg-[#0E78F9] text-white rounded-br-sm"
                    : "bg-[#252A41] text-white rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-[#252A41] p-3 shrink-0">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type your message"
          className="flex-1 bg-[#252A41] text-white text-sm placeholder:text-[#6B7080] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#0E78F9]"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="shrink-0 bg-[#0E78F9] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg p-2 hover:bg-[#0B6FE8] transition"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MeetingChat;