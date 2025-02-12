"use client"

import {useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {Button} from "@/components/ui/button"
import {
    IconBrandX as Twitter,
    IconBrandKick as Kick,
    IconPill as PumpFun,
    IconBrandGithub as Github,
    IconLink
} from "@tabler/icons-react"

import {DexScreenerIcon, JupiterIcon} from "@/components/icons"

const socialLinks = [
    {name: "X", icon: Twitter, url: "https://x.com/tradetant"},
    {name: "Kick", icon: Kick, url: "https://kick.com/tradetant"},
    {name: "PumpFun", icon: PumpFun, url: `https://pump.fun/coin/${process.env.NEXT_PUBLIC_TOKEN_CA}`},
    {name: "Dexscreener", icon: DexScreenerIcon, url: `https://dexscreener.com/solana/${process.env.NEXT_PUBLIC_TOKEN_PAIR}`},
    {name: "jup.ag", icon: JupiterIcon, url: `https://jup.ag/swap/SOL-${process.env.NEXT_PUBLIC_TOKEN_CA}`},
    {name: "GitHub", icon: Github, url: "https://github.com/tradetant"},
]

export function FloatingActionButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col md:flex-row items-center">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        className="mb-2 space-y-2 flex flex-col md:flex-row items-center md:space-x-1"
                    >
                        {socialLinks.map((link) => (
                            <Button key={link.name} variant="outline" size="icon"
                                    className="text-purple-600 hover:text-purple-700"
                                    asChild>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <link.icon/>
                                    <span className="sr-only">{link.name}</span>
                                </a>
                            </Button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <Button
                variant="secondary"
                size="icon"
                className="rounded-full h-12 w-12 text-white bg-purple-600 hover:bg-purple-700 md:ml-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <IconLink size={48} />
                <span className="sr-only">Toggle social links</span>
            </Button>
        </div>
    )
}

