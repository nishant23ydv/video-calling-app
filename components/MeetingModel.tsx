import React, { ReactNode } from 'react'
import Image from 'next/image'
import type { ImageProps } from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface MeetingModelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText?: string;
  handleClick?: () => void;
  children?: React.ReactNode;
  buttonIcon?: ImageProps["src"];
  image?: ImageProps["src"];
}

const MeetingModel = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
  children,
  buttonIcon,
  image,
}: MeetingModelProps) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none rounded-lg px-6 py-9 bg-[#1E1E2D] text-white'>
    <div className={`flex flex-col gap-6 `}>
        {
            image && (
                <div className='flex justify-center'>
                    <Image src={image} alt="image" width={72} height={72} />
                    </div>
            )
        }
        <h1 className={cn('font-bold text-3xl leading-[42px]', className)}>{title}</h1>
        {children}
        <Button className='bg-[#0E78F9] focus-visible:ring-0 focus-visible:ring-offset-0 ' onClick={handleClick}>
            {buttonIcon && (
                <Image src={buttonIcon} alt="button icon" width={13} height={13} />
            )} &nbsp;
            {buttonText || 'Schedule Meeting'}
            
        </Button>

    </div>

  </DialogContent>
</Dialog>
    </div>
  )
}

export default MeetingModel
