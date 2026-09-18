'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import Loader from './Loader';
import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CallList = ({
  type,
}: {
  type: 'ended' | 'upcoming' | 'recordings';
}) => {
  const router = useRouter();

  const {
    endedCalls,
    upcomingCalls,
    callRecordings,
    isLoading,
  } = useGetCalls();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;

      case 'upcoming':
        return upcomingCalls;

      case 'recordings':
        return recordings;

      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';

      case 'upcoming':
        return 'No Upcoming Calls';

      case 'recordings':
        return 'No Recordings';

      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) =>
          meeting.queryRecordings()
        ) ?? []
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) {
    return <Loader />;
  }

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => {
          const isRecording = type === 'recordings';

          // Unique key
          const meetingKey = isRecording
            ? `${(meeting as CallRecording).session_id}-${(meeting as CallRecording).filename}`
            : (meeting as Call).id;

          // Title
          const title = isRecording
            ? (meeting as CallRecording).filename?.substring(0, 30) ||
              'Recording'
            : (meeting as Call).state?.custom?.description ||
              'Personal Meeting';

          // Date
          let date = 'No Date';

          if (isRecording) {
            const startTime = (meeting as CallRecording).start_time;

            if (startTime) {
              date = new Date(startTime).toLocaleString();
            }
          } else {
            const startsAt = (meeting as Call).state?.startsAt;

            if (startsAt) {
              date = new Date(startsAt).toLocaleString();
            }
          }

          // Link
          const link = isRecording
            ? (meeting as CallRecording).url
            : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                (meeting as Call).id
              }`;

          return (
            <MeetingCard
              key={meetingKey}
              icon={
                type === 'ended'
                  ? '/svgfile/previous.svg'
                  : type === 'upcoming'
                    ? '/svgfile/upcoming.svg'
                    : '/svgfile/recordings.svg'
              }
              title={title}
              date={date}
              isPreviousMeeting={type === 'ended'}
              link={link}
              buttonIcon1={
                isRecording
                  ? '/svgfile/play.svg'
                  : undefined
              }
              buttonText={
                isRecording
                  ? 'Play'
                  : 'Start'
              }
              handleClick={
                isRecording
                  ? () =>
                      router.push(
                        (meeting as CallRecording).url
                      )
                  : () =>
                      router.push(
                        `/meeting/${(meeting as Call).id}`
                      )
              }
            />
          );
        })
      ) : (
        <h1 className="text-2xl font-bold text-white">
          {noCallsMessage}
        </h1>
      )}
    </div>
  );
};

export default CallList;