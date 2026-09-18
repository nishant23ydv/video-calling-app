'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Call } from '@stream-io/video-react-sdk'
import { toast } from "@/components/ui/toast"
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker'
import { Input } from "@/components/ui/input"

const MeetingTypeList = () => {
  const router = useRouter()

  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >()
  const {user} = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({dateTime: new Date(), 
    description: '', 
    link: ''
  })
  const [callDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if(!values.dateTime){
          toast.add({
        title: "Please select a Date and Time"
      })
      return;
      }
      const id = crypto.randomUUID()   // generate some random id numbers
      const call = client.call('default', id)

      if (!call) throw new Error('Failed to Create call')
         
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })
      setCallDetails(call)

      if (!values.description){
          router.push(`/meeting/${call.id}`)
      }
      toast.add({
        title: "Meeting Created"
      })
      
    } catch (error) {
      console.log(error)
      toast.add({
        title: "Failed to Create Meeting"
      })
    }
    
  }
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      <HomeCard
        img="/svgfile/add-meeting.svg"
        title="New Meeting"
        description="Start an instant Meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-[#FF742E]"
      />

      <HomeCard
        img="/svgfile/schedule.svg"
        title="Schedule Meeting"
        description="Plan your Meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className="bg-[#0E78F9]"
      />

      <HomeCard
        img="/svgfile/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        handleClick={() => router.push('/recordings')}
        className="bg-[#830EF9]"
      />

      <HomeCard
        img="/svgfile/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className="bg-[#F9A90E]"
      />

      {
        !callDetails ? (
             <MeetingModel 
             className='cursor-pointer'
      isOpen={meetingState === 'isScheduleMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Create Meeting"
      handleClick={createMeeting}
      >
        <div className='flex flex-col gap-2.5 '>
          <label className='text-base text-normal leading-[22px] text-blue-50' htmlFor="">Add a description</label>
          <Textarea className='border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e)=> {
            setValues({...values, description: e.target.value})
          }} />
        </div>
        <div className='flex flex-col gap-2.5 w-full'>
            <label className='text-base text-normal leading-[22px] text-blue-50' htmlFor="">Select date and time</label>
            <ReactDatePicker
              className='w-full rounded bg-[#252A41] p-2 focus:outline-none'
               selected={values.dateTime}
               onChange={(date:Date | null)=>setValues({...values, dateTime: date!})}
               showTimeSelect
               timeFormat='HH:mm'
               timeIntervals={15}
               timeCaption='time'
               dateFormat='MMMM d, yyyy h:mm aa'
            />



        </div>
      </MeetingModel>
        ) : (
            <MeetingModel 
      isOpen={meetingState === 'isScheduleMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Meeting Created"
      className="text-center"
      handleClick={()=> {
        navigator.clipboard.writeText(meetingLink);
        toast.add({title:'Link Copied'})
      }}
      image='/svgfile/checked.svg'
      buttonIcon='/svgfile/copy.svg'
      buttonText = 'Copy Meeting link'
      />
        )
      }
      
      <MeetingModel 
      isOpen={meetingState === 'isInstantMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Start an Instant Meeting"
      className="text-center"
      buttonText="Start Meeting"
      handleClick={createMeeting}
      />

      <MeetingModel 
      isOpen={meetingState === 'isJoiningMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="type the link here"
      className="text-center"
      buttonText="Join Meeting"
      handleClick={()=> router.push(values.link)}
      >
        <Input placeholder='meeting link' className='border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0'
        onChange={(e)=>setValues({...values, link:e.target.value})} />
      </MeetingModel>



    </section>
  )
}

export default MeetingTypeList