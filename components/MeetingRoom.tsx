"use client";

import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, MessageSquare, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import MeetingChat from "./MeetingChat";
import ChatPanel from "./ChatPanel";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const CallLayout = ({ layout }: { layout: CallLayoutType }) => {
  switch (layout) {
    case "grid":
      return <PaginatedGridLayout />;

    case "speaker-left":
      return <SpeakerLayout participantsBarPosition="right" />;

    case "speaker-right":
      return <SpeakerLayout participantsBarPosition="left" />;

    default:
      return <SpeakerLayout participantsBarPosition="left" />;
  }
};

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const call = useCall();
  const router = useRouter();

  if (callingState !== CallingState.JOINED) return <Loader />;

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout layout={layout} />
        </div>
        <div
  className={cn("h-[calc(100vh-86px)] ml-2", {
    "block": showParticipants,
    "hidden": !showParticipants,
  })}
>
  <CallParticipantsList onClose={() => setShowParticipants(false)} />
</div>

        {/* Chat panel */}
        {/* Chat panel */}
{call && (
  <div
    className={cn(
      "fixed top-4 bottom-24 right-2 sm:right-4 z-50",
      "w-[calc(100%-1rem)] sm:w-[350px]",
      "bg-[#1C1F2E] border border-[#252A41] rounded-lg",
      "flex flex-col overflow-hidden shadow-2xl",
      "transition-all duration-200",
      showChat
        ? "opacity-100 pointer-events-auto translate-x-0"
        : "opacity-0 pointer-events-none translate-x-4"
    )}
  >
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#252A41] shrink-0">
      <h3 className="text-white font-medium">Chat</h3>
      <button
        onClick={() => setShowChat(false)}
        className="text-[#A5A8B8] hover:text-white text-lg leading-none"
      >
        ✕
      </button>
    </div>
    <div className="flex-1 overflow-hidden">
      <ChatPanel callId={call.id} />
    </div>
  </div>
)}
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push(`/`)} />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-2 hover:bg-[#343B43]">
              <LayoutList size={20} className="text-white " />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-[#1C1F2E] bg-[#1C1F2E] text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#1C1F2E]" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-2 hover:bg-[#343B43]">
            <Users size={20} className="text-white" />
          </div>
        </button>

        {/* Chat toggle button */}
        <button onClick={() => setShowChat((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-2 hover:bg-[#343B43]">
            <MessageSquare size={20} className="text-white" />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;