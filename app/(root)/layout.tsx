import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, {ReactNode} from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video meeting application",
  icons:{
    icon: '/svgfile/logo.svg'
  }
};

const RootLayout = ({children}: {children : ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>

        {children}
      </StreamVideoProvider>
        Footer
    </main>
  )
}

export default RootLayout
