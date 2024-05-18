import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SongsContextProvider } from '@/context/store'
import './globals.css'

export const metadata: Metadata = {
    title: 'Song Player',
    description: 'Simple song player.',
}
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                    <div className="absolute top-0 -z-10 h-full w-full bg-transparent">
                        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
                    </div>
                    <SongsContextProvider>{children}</SongsContextProvider>
                </div>
            </body>
        </html>
    )
}
