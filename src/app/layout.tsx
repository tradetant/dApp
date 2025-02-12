import type {Metadata, Viewport} from "next";

import {DM_Sans, DM_Mono} from "next/font/google";
import {Analytics} from "@vercel/analytics/react"

import "./globals.css";
import Providers from "@context";

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
});

const dmMono = DM_Mono({
    variable: "--font-dm-mono",
    weight: ["300", "400", "500"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TradeTant: The Titan's Call to Arms",
    description:
        "Join the epic journey to revolutionize decentralized finance. TradeTant empowers crypto warriors with AI-driven trading suits, real-time training arenas, and a $1M hackathon. Are you ready to forge your path and conquer the future?",
    keywords: [
        "TradeTant",
        "Crypto",
        "DeFi",
        "Hackathon",
        "AI Trading",
        "Blockchain",
        "Solana",
        "MEV Bots",
        "Web3 Innovation",
        "Crypto Warriors",
        "Decentralized Finance",
    ],
    authors: [
        {
            name: "TradeTant Team",
            url: "https://tradetant.com",
        },
    ],
    openGraph: {
        title: "TradeTant: The Titan's Call to Arms",
        description:
            "Step into the arena, assemble your AI trading suit, and fight for crypto’s future. Join the $1M hackathon and forge your legend with TradeTant.",
        url: "https://tradetant.com",
        type: "website",
        images: [
            {
                url: "https://tradetant.com/og-image.png",
                alt: "TradeTant HERO Banner",
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@tradetant",
        title: "TradeTant: The Titan's Call to Arms",
        description:
            "Join the revolution. Train in real markets, wield AI trading suits, and conquer the blockchain battlefield with TradeTant.",
        images: [
            {
                url: "https://tradetant.com/x-image.png",
                alt: "TradeTant HERO Banner",
                width: 1200,
                height: 630,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};


export const viewport: Viewport = {
    width: 'device-width',
    height: 'device-height',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#0D1117", // A futuristic dark theme color
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
        <body
            className={`${dmSans.variable} ${dmMono.variable} antialiased bg-white dark:bg-neutral-900`}
        >
        <Providers>
            {children}
        </Providers>
        <Analytics/>
        </body>
        </html>
    );
}
