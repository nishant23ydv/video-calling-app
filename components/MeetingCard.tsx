"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { toast } from "@/components/ui/toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-[#1C1F2E] px-5 py-8 xl:max-w-[568px]">
      
      {/* Meeting Details */}
      <article className="flex flex-col gap-5">
        <Image
          src={icon}
          alt="upcoming"
          width={28}
          height={28}
        />

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">
              {title}
            </h1>

            <p className="text-base font-normal">
              {date}
            </p>
          </div>
        </div>
      </article>

     
      {/* Bottom Section */}
<article className="relative flex w-full items-center justify-between gap-4">

  {/* Avatars */}
  <div className="relative flex flex-1 max-sm:hidden">
    {avatarImages.map((img, index) => (
      <Image
        key={index}
        src={img}
        alt="attendees"
        width={40}
        height={40}
        className={cn("rounded-full", {
          absolute: index > 0,
        })}
        style={{
          top: 0,
          left: index * 28,
        }}
      />
    ))}

    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-[#252A41] bg-[#1E2757]">
      +5
    </div>
  </div>

  {/* Buttons */}
  {!isPreviousMeeting && (
    <div className="flex shrink-0 gap-2">

      {/* Start / Play Button */}
      <Button
        onClick={handleClick}
        className=" bg-[#2196F3] cursor-pointer rounded-lg px-6 hover:bg-[#1976D2]"
      >
        {buttonIcon1 && (
          <Image
            src={buttonIcon1}
            alt="feature"
            width={20}
            height={20}
          />
        )}

        <span className="ml-2">
          {buttonText}
        </span>
      </Button>

      {/* Copy Link Button */}
      <Button 
        onClick={() => {
          navigator.clipboard.writeText(link);

          toast.add({
            title: "Link Copied",
          });
        }}
        className="shrink-0 bg-[#252B4A] px-6 hover:bg-[#30375C] rounded-lg cursor-pointer "
      >
        <Image
          src="/svgfile/copy.svg"
          alt="copy"
          width={20}
          height={20}
        />

        <span className="ml-2">
          Copy Link
        </span>
      </Button>

    </div>
  )}
</article>
    </section>
  );
};

export default MeetingCard;