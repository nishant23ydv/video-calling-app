"use server";

import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";

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