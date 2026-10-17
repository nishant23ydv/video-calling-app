import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toast"
import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video meeting application",
  icons: {
    icon: '/svgfile/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#161925]">
        <ClerkProvider
          appearance={{
            options: {
              logoImageUrl: "/svgfile/yoom-logo.svg",
              logoPlacement: "inside",
              socialButtonsVariant: "iconButton",
            },

            variables: {
              colorPrimary: "#0E78F9",
              colorBackground: "#1C1F2E",
              colorForeground: "#FFFFFF",
              colorMutedForeground: "#A5A8B8",
              colorInput: "#252A41",
              colorInputForeground: "#FFFFFF",
              colorBorder: "#f3f5ff",
              colorRing: "#0E78F9",
              colorPrimaryForeground: "#FFFFFF",
              fontFamily: "var(--font-outfit)",
            },

            elements: {
              card:
                "bg-[#1C1F2E] border border-[#252A41] shadow-2xl",

              headerTitle:
                "text-white",

              headerSubtitle:
                "text-[#A5A8B8]",

              // Icon-style social buttons (Google, Facebook, GitHub) — white bg
              socialButtonsIconButton:
                "!bg-white border border-[#d1d5db] hover:!bg-gray-100",

              // Keep block button white too, in case variant ever changes
              socialButtonsBlockButton:
                "!bg-white border border-[#d1d5db] hover:!bg-gray-100",

              socialButtonsBlockButtonText:
                "!text-black font-medium",

              formFieldLabel:
                "text-white",

              formFieldInput:
                "bg-[#252A41] text-white border border-[#2C3045] placeholder:text-[#777C91]",

              formButtonPrimary:
                "bg-[#0E78F9] text-white hover:bg-[#0B6FE8]",

              footerActionText:
                "text-[#A5A8B8]",

              footerActionLink:
                "text-[#0E78F9] hover:text-[#4A9DFF]",
            },
          }}
        >
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}