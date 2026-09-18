import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HomeCardProps{
    className : string,
    img: string,
    title: string,
    description: string,
    handleClick: ()=>void;
}

const HomeCard = ({className, img, title, description, handleClick}: HomeCardProps) => {
  return (
    <div
      onClick={handleClick}
      className={cn("px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer", className)}
    >
      <div className="glassmorphism size-12 flex-center rounded-[10px]">
        <Image
          src={img}
          alt="meeting"
          height={27}
          width={27}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
