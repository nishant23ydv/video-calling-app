"use server";

import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  if (!apiKey) {
    throw new Error("Stream API key is missing");
  }

  if (!apiSecret) {
    throw new Error("Stream API secret key is missing");
  }

  const streamClient = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const token = streamClient.createToken(user.id, exp);

  return token;
};

export const chatTokenProvider = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  if (!apiKey) {
    throw new Error("Stream API key is missing");
  }

  if (!apiSecret) {
    throw new Error("Stream API secret key is missing");
  }

  const serverClient = StreamChat.getInstance(apiKey, apiSecret);
  const token = serverClient.createToken(user.id);

  return token;
};

export const addToChatChannel = async (channelId: string) => {
  const user = await currentUser();
  if (!user) throw new Error("User is not logged in");
  if (!apiKey || !apiSecret) throw new Error("Stream keys missing");

  const serverClient = StreamChat.getInstance(apiKey, apiSecret);
  const channel = serverClient.channel("messaging", channelId, {
    created_by_id: user.id,
  });

  await channel.create();
  await channel.addMembers([user.id]);
};