"use client";
import { useState } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useChatClient } from "@/hooks/useChatClient";
import ChatWindow from "./ChatWindow";
import { shortHash } from "@/lib/utils";

type Tab = { type: "public" } | { type: "private"; userId: string; name: string };

const ChatPanel = ({ callId }: { callId: string }) => {
  const { user } = useUser();
  const client = useChatClient();
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const [activeTab, setActiveTab] = useState<Tab>({ type: "public" });

  if (!client || !user) {
    return (
      <div className="flex items-center justify-center h-full text-[#A5A8B8] text-sm">
        Loading chat...
      </div>
    );
  }

  const others = participants
    .filter((p) => !p.isLocalParticipant && p.userId)
    .filter(
      (p, index, self) => self.findIndex((x) => x.userId === p.userId) === index
    );

    console.log("participants:", participants.map(p => ({ id: p.userId, name: p.name, isLocal: p.isLocalParticipant })));

  

  return (
    <div className="flex h-full">
      <div className="w-[110px] border-r border-[#252A41] overflow-y-auto shrink-0">
        <button
          onClick={() => setActiveTab({ type: "public" })}
          className={`w-full text-left px-3 py-2 text-xs ${
            activeTab.type === "public" ? "bg-[#252A41] text-white" : "text-[#A5A8B8] hover:bg-[#20243a]"
          }`}
        >
          Everyone
        </button>
        {others.map((p) => (
          <button
            key={p.userId}
            onClick={() => setActiveTab({ type: "private", userId: p.userId, name: p.name || p.userId })}
            className={`w-full text-left px-3 py-2 text-xs truncate ${
              activeTab.type === "private" && activeTab.userId === p.userId
                ? "bg-[#252A41] text-white"
                : "text-[#A5A8B8] hover:bg-[#20243a]"
            }`}
          >
            {p.name || p.userId}
          </button>
        ))}
      </div>

      <div className="flex-1 min-w-0">
        {activeTab.type === "public" ? (
  <ChatWindow key="public" client={client} currentUserId={user.id} channelId={`meeting-${callId}`} />
) : (
  <ChatWindow
  key={`dm-${activeTab.userId}`}
  client={client}
  currentUserId={user.id}
  channelId={`dm-${shortHash(`${callId}-${[user.id, activeTab.userId].sort().join("_")}`)}`}
/>
)}
      </div>
    </div>
  );
};

export default ChatPanel;