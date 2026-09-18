'use client'
import React from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const pathName = usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1C1F2E] p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-1 flex-col gap-4'>
        {sidebarLinks.map((link) => {
  const isActive = 
    pathName === link.route || 
    (link.route !== '/' && pathName.startsWith(`${link.route}/`));

  return (
    <Link
      href={link.route}
      key={link.label}
      className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
        'bg-[#0E78F9]': isActive,
      })}
    >
      <Image src={link.imageUrl} alt={link.label} width={24} height={24} />
      <p className='text-lg font-semibold max-sm:hidden'>{link.label}</p>
    </Link>
  )
})}
      </div>
    </section>
  )
}

export default Sidebar