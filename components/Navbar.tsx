// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import MobileNav from './MobileNav'
// import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
// const Navbar = () => {
//   return (
//     <nav className="flex-between fixed z-50 w-full bg-[#1C1F2E] px-6 py-4  lg:px-10">
//        <Link href="/" className="flex items-center gap-2">
//         <Image
//             src="/svgfile/logo.svg"
//             alt="Yoom Logo"
//             width={32}
//             height={32}
//             className="max-sm:size-10"/>
//         <p className="text-[26px] font-extrabold text-white max-sm:hidden">Yoom</p> 
//        </Link>
//        <div className="flex-between gap-4">
//               <SignInButton />
//               <UserButton/>
//               <SignUpButton />
      
//           <MobileNav />
//        </div>

//     </nav>
//   )
// }

// export default Navbar


import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-[#1C1F2E] px-6 py-4 lg:px-10">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/svgfile/logo.svg"
          alt="Yoom Logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />

        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Yoom
        </p>
      </Link>

      {/* Right side */}
      <div className="flex-between gap-4">

        {/* Logged OUT */}
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>

        {/* Logged IN */}
        <Show when="signed-in">
          <UserButton />
        </Show>

        <MobileNav />

      </div>
    </nav>
  );
};

export default Navbar;