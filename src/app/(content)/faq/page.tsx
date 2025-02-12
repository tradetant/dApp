"use client"

import {useState, useEffect, useRef, Suspense, useMemo} from "react"
import {useSearchParams} from "next/navigation"
import Link from "next/link"
import {motion, AnimatePresence} from "framer-motion"

import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {IconLoader2 as Loader2} from "@tabler/icons-react"
import Markdown from "react-markdown";
import remarkBreaks from 'remark-breaks'

import type {FAQItem} from "./_components/types";
import {FAQ} from "./_components/db";

interface TypewriterEffectProps {
    text: string
    paused?: boolean
    onComplete: () => void
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({text, paused, onComplete}) => {
    const [displayText, setDisplayText] = useState("")
    const index = useRef(0)

    useEffect(() => {
        if (paused) return;

        const timer = setInterval(() => {
            if (index.current <= text.length) {
                setDisplayText(text.slice(0, index.current))
                index.current++
            } else {
                clearInterval(timer)
                onComplete()
            }
        }, 20)

        return () => clearInterval(timer)
    }, [text, onComplete, paused])

    return <Markdown remarkPlugins={[remarkBreaks]}>{displayText}</Markdown>
}

const {roles} = FAQ;

type FAQItemProps = FAQItem & {
    isOpen: boolean
    toggleOpen: () => void
}
const FAQItem: React.FC<FAQItemProps> = ({question, answer, relevancy, isOpen, toggleOpen}) => (
    <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: -20}}
        className="mb-4 bg-gray-800/50 backdrop-blur-sm border border-neutral-200 border-purple-500/30 rounded-lg overflow-hidden dark:border-neutral-800"
    >
        <div className="p-4 cursor-pointer flex items-center justify-between" onClick={toggleOpen}>
            <h3 className="text-lg text-white">
                <Markdown>{question}</Markdown>
            </h3>
            <span className="text-purple-400">{isOpen ? "−" : "+"}</span>
        </div>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: "auto"}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.3}}
                    className="px-4 pb-4"
                >
                    <TypewriterEffect text={answer} onComplete={() => {
                    }}/>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {relevancy.map((role) => (
                            <Badge key={role} variant="secondary" className="bg-purple-700/50 text-white">
                                {roles[role].name}
                            </Badge>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
)

interface RoleSelectorProps {
    selectedRole: string
    setSelectedRole: (role: string) => void
    setIsLoading: (loading: boolean) => void
}

function RoleSelector({selectedRole, setSelectedRole, setIsLoading}: RoleSelectorProps) {
    const searchParams = useSearchParams()
    const _roles = useMemo(() => Object.entries(roles), [])

    useEffect(() => {
        const roleFromQuery = searchParams.get("role")
        if (roleFromQuery && roles[roleFromQuery]) {
            setSelectedRole(roleFromQuery)
        }
        setIsLoading(false)
    }, [searchParams])

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.9}}
            className="mb-8"
        >
            <h2 className="text-2xl font-semibold mb-4 text-purple-300">Select Your Role</h2>
            <div className="flex flex-wrap gap-2">
                {_roles.map(([id, {name}], index) => (
                    <motion.div
                        key={id}
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 1 + index * 0.1}}
                    >
                        <Button
                            onClick={() => setSelectedRole(id)}
                            variant={selectedRole === id ? "ghost" : "outline"}
                            className={`${
                                selectedRole === id
                                    ? "bg-purple-600 hover:bg-purple-700"
                                    : "bg-gray-800/50 hover:bg-gray-700/50 border border-neutral-200 border-purple-500/30 dark:border-neutral-800 hover:text-white"
                            } text-white transition-all duration-300 transform hover:scale-105`}
                        >
                            {name}
                        </Button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default function FAQPage() {
    const [selectedRole, setSelectedRole] = useState("all")
    const [openItems, setOpenItems] = useState<number[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const filteredFAQ = FAQ.faq.filter((item) => (selectedRole === "all" && !item.relevancy.every((v)=>v==='tate')) || item.relevancy.includes(selectedRole))

    const toggleItem = (index: number) => {
        setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    return (
        <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
            <div className="relative z-10 container mx-auto max-w-4xl py-16 px-4">
                <motion.h1
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5}}
                    className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                >
                    TradeTant AI Knowledge Base
                </motion.h1>

                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{delay: 0.7}}
                    className="bg-gray-800/50 backdrop-blur-sm border border-neutral-200 border-purple-500/30 p-6 rounded-lg mb-8 dark:border-neutral-800"
                >
                    <TypewriterEffect text={FAQ.initialMessage.text} onComplete={() => {
                    }}/>
                    <Link href={roles[selectedRole].link?.url || FAQ.initialMessage.ctaButton.url} className="block mt-6">
                        <Button size="lg" variant="clean" className="w-full bg-purple-600 hover:bg-purple-700">
                            {roles[selectedRole].link?.text || FAQ.initialMessage.ctaButton.text}
                        </Button>
                    </Link>
                </motion.div>

                <Suspense fallback={<div>Loading...</div>}>
                    <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole}
                                  setIsLoading={setIsLoading}/>
                </Suspense>

                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{delay: 0.8}}
                    className="text-lg font-semibold mb-8 text-purple-300 text-center">
                    {roles[selectedRole].cta}
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-500"/>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {filteredFAQ.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{delay: 1.2 + index * 0.1}}
                                >
                                    <FAQItem
                                        question={item.question}
                                        answer={item.answer}
                                        relevancy={item.relevancy}
                                        isOpen={openItems.includes(index)}
                                        toggleOpen={() => toggleItem(index)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 1.5}}
                    className="mt-12 text-center"
                >
                    <Link href={roles[selectedRole].link?.url || FAQ.initialMessage.ctaButton.url}>
                        <Button
                            size="lg"
                            variant="clean"
                            className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                        >
                            {roles[selectedRole].link?.text || FAQ.initialMessage.ctaButton.text}
                        </Button>
                    </Link>
                    <div className="mt-8 text-center">
                        <Link href="/" className="text-purple-400 hover:text-purple-300">
                            ← Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}