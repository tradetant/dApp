import {motion} from "framer-motion";
import {IconExternalLink as ExternalLink} from "@tabler/icons-react";
import Link from "next/link"

import {Button} from "@/components/ui/button";

import {Role} from "./types";
import React from "react";
import Markdown from "react-markdown";

interface RoleCardProps {
    role: Role,
    isSelected: boolean
    onClick: () => void
    isExpanded: boolean
}

export const RoleCard: React.FC<RoleCardProps> = ({role, isSelected, onClick, isExpanded}) => (
    <motion.div
        layout
        onClick={onClick}
        initial={{opacity: 0, scale: 0.9}}
        animate={{
            opacity: 1,
            scale: isSelected ? 1.05 : 1,
            filter: !isSelected && isExpanded ? "brightness(0.3)" : "brightness(1)",
        }}
        exit={{opacity: 0, scale: 0.9}}
        whileHover={{scale: isExpanded ? 1 : 1.05}}
        className={`relative cursor-pointer ${role.id === 'tate' ? 'sm:col-span-3 2xl:col-span-1' : ''} ${isSelected ? "z-20" : `z-10 ${role.id === 'tate' ? 'w-64 h-64' : 'w-48 h-56'}`}`}
        role="button"
        aria-expanded={isSelected}
        aria-label={`Select role: ${role.name}`}
    >
        <svg viewBox="0 0 100 115" className={`inset-0 w-full h-full ${isSelected ? 'hidden' : 'absolute'}`}>
            <defs>
                <linearGradient id={`grad-${role.id || role.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: role.gradient.from}}/>
                    <stop offset="100%" style={{stopColor: role.gradient.to}}/>
                </linearGradient>
            </defs>
            <path
                d="M50 0 L100 28.75 L100 86.25 L50 115 L0 86.25 L0 28.75 Z"
                fill={`url(#grad-${role.id || role.name})`}
                className={`transition-all duration-300 ${isSelected ? "stroke-white stroke-2" : "stroke-transparent"}`}
            />
        </svg>
        {
            isSelected ? (<div
                className={`w-72 rounded-xl overflow-hidden transition-shadow duration-300 ${
                    isSelected ? "shadow-2xl" : "shadow-lg"
                }`}
            >
                <div
                    className="p-6 h-full"
                    style={{
                        background: `linear-gradient(135deg, ${role.gradient.from}, ${role.gradient.to})`,
                    }}
                >
                    <h3 className="text-2xl font-bold text-white mb-3">{role.name}</h3>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2}}
                        className="space-y-4"
                    >
                        <Markdown className="text-white/90 leading-relaxed">{role.narrative}</Markdown>
                        <Link href={`/faq?role=${role.id}`} passHref>
                            <Button
                                className="mt-4 bg-black hover:bg-black/50 text-white"
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                            >
                                {role.cta} <ExternalLink className="ml-2 h-4 w-4"/>
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{role.name}</h3>
                    <p className="text-sm">{role.description}</p>
                </div>
            )
        }
    </motion.div>
)
