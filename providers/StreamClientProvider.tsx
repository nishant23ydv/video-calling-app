'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.action';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

useEffect(() => {
  if (!isLoaded || !user) return;

  if (!API_KEY) {
    throw new Error("Stream API key is missing");
  }

  const client = new StreamVideoClient({
    apiKey: API_KEY,
    user: {
      id: user.id,
      name: user.username || user.id,
      image: user.imageUrl,
    },
    tokenProvider,
  });

  const timer = setTimeout(() => {
    setVideoClient(client);
  }, 0);

  return () => {
    clearTimeout(timer);
    client.disconnectUser();
  };
}, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;






// import React, { ReactNode, useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import {
//   StreamVideo,
//   StreamVideoClient,
//   type User,
// } from "@stream-io/video-react-sdk";

// import { tokenProvider } from "@/actions/stream.action";

// const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// const StreamClientProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
//     null
//   );

//   const { user, isLoaded } = useUser();

//   useEffect(() => {
//     if (!isLoaded || !user) return;

//     if (!apiKey) {
//       throw new Error("Stream API key is missing");
//     }

//     const streamUser: User = {
//       id: user.id,
//       name: user.fullName || user.username || user.id,
//       image: user.imageUrl,
//     };

//     const client = new StreamVideoClient({
//       apiKey,
//       user: streamUser,
//       tokenProvider,
//     });

//     setVideoClient(client);

//     return () => {
//       client.disconnectUser();
//       setVideoClient(null);
//     };
//   }, [user, isLoaded]);

//   if (!isLoaded || !user || !videoClient) {
//     return null;
//   }

//   return (
//     <StreamVideo client={videoClient}>
//       {children}
//     </StreamVideo>
//   );
// };

// export default StreamClientProvider;



// "use client";

// import React, { ReactNode, useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import {
//   StreamVideo,
//   StreamVideoClient,
//   type User,
// } from "@stream-io/video-react-sdk";

// import { tokenProvider } from "@/actions/stream.action";

// const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// const StreamClientProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const [videoClient, setVideoClient] =
//     useState<StreamVideoClient | null>(null);

//   const { user, isLoaded } = useUser();

//   useEffect(() => {
//     if (!isLoaded || !user) return;

//     if (!apiKey) {
//       throw new Error("Stream API key is missing");
//     }

//     const streamUser: User = {
//       id: user.id,
//       name: user.fullName || user.username || user.id,
//       image: user.imageUrl,
//     };

//     const client = new StreamVideoClient({
//       apiKey,
//       user: streamUser,
//       tokenProvider,
//     });

//     // React 19 lint rule ko satisfy karne ke liye
//     const timer = setTimeout(() => {
//       setVideoClient(client);
//     }, 0);

//     return () => {
//       clearTimeout(timer);
//       client.disconnectUser();
//       setVideoClient(null);
//     };
//   }, [user, isLoaded]);

//   if (!isLoaded || !user || !videoClient) {
//     return null;
//   }

//   return (
//     <StreamVideo client={videoClient}>
//       {children}
//     </StreamVideo>
//   );
// };

// export default StreamClientProvider;