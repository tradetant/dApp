'use client';

import React from "react"
import {motion} from "framer-motion"
import Link from "next/link";

import {Button} from "@/components/ui/button"
import {LoginButton} from "@/components/Login";

export function HeroSection() {
    const scrollToRoles = () => {
        const rolesSection = document.getElementById("role-selector")
        if (rolesSection) {
            rolesSection.scrollIntoView({behavior: "smooth"})
        }
    }

    return (
        <section className="relative h-screen overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/hero-bg.webm" type="video/webm"/>
                Your browser does not support the video tag.
            </video>
            <div className="absolute top-0 left-0 m-4 z-10">
                <Link href={'https://paper.tradetant.com'}>
                    <Button className="bg-white/10 hover:bg-white/20 text-white">Whitepaper</Button>
                </Link>
            </div>
            <div className="absolute top-0 right-0 m-4 z-10">
                <LoginButton/>
            </div>
            <div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-4xl md:text-6xl font-bold mb-4"
                >
                    Join the War for Crypto&#39;s Future
                </motion.h1>
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.4, duration: 0.8}}
                    className="text-xl md:text-2xl mb-8"
                >
                    Forge Your Trading Suit. Unlock Your Potential.
                </motion.p>
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.8, duration: 0.8}}
                >
                    <Button
                        onClick={scrollToRoles}
                        size="lg"
                        variant="clean"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Join the War
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}