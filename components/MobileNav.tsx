'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const MobileNav = () => {
  const pathName = usePathname()
  return (
    <section className="w-full max-w-[264px]">
       <Sheet>
  <SheetTrigger>
    <Image
      src="/svgfile/hamburger.svg"
      alt="Menu"
      width={32}
      height={32}
      className="cursor-pointer sm:hidden"
    />
  </SheetTrigger>
  <SheetContent side="left" className="border-none bg-[#1C1F2E]">
    <Link href="/" className="flex items-center gap-2">
        <Image
            src="/svgfile/logo.svg"
            alt="Yoom Logo"
            width={32}
            height={32}
            className="max-sm:size-10"/>
        <p className="text-[26px] font-extrabold text-white">Yoom</p> 
       </Link>
       <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto py-4">
        <SheetClose>
          <section className='flex flex-col gap-4 h-full pt-16 text-white ' >
            {sidebarLinks.map((link) => {
  const isActive = 
    pathName === link.route || 
    (link.route !== '/' && pathName.startsWith(link.route));

  return (
    <Link
      href={link.route}
      key={link.label}
      className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60 ', {
        'bg-[#0E78F9]': isActive,
      })}
    >
      <Image src={link.imageUrl} alt={link.label} width={20} height={20} />
      <p className='font-semibold'>{link.label}</p>
    </Link>
  )
})}

          </section>
        </SheetClose>

       </div>
  </SheetContent>
</Sheet>
    </section>
  )
}

export default MobileNav
