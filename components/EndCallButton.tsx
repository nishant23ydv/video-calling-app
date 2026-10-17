"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  if (!call) return null;

  // Check if current user is the host (creator of the call)
  const isHost = localParticipant?.userId === call.state.createdBy?.id;

  const handleLeave = async () => {
    await call.leave();
    router.push("/");
  };

  const handleEndForEveryone = async () => {
    await call.endCall();
    router.push("/");
  };

  if (isHost) {
    return (
      <Button
        onClick={handleEndForEveryone}
        className="bg-red-500 hover:bg-red-600"
      >
        End call for everyone
      </Button>
    );
  }

  return (
    <Button
      onClick={handleLeave}
      className="bg-red-500 hover:bg-red-600"
    >
      Leave call
    </Button>
  );
};

export default EndCallButton;