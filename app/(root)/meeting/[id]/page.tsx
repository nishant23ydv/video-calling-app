'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'

import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
import { useGetCallById } from '@/hooks/useGetCallById'
import Loader from '@/components/Loader'

const Meeting = () => {
  const { user, isLoaded } = useUser()
  const { id } = useParams<{ id: string }>()

  const [isSetUpComplete, setIsSetUpComplete] = useState(false)

  const { call, isCallLoading } = useGetCallById(id)

  if (!isLoaded || isCallLoading) {
    return <Loader />
  }

  if (!call) {
    return <div>Call not found</div>
  }

  return (
    <main>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting