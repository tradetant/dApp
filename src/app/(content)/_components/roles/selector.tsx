"use client"

import React, {useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {IconChevronLeft as ChevronLeft} from "@tabler/icons-react"

import {ROLES} from "./values";
import {RoleCard} from "./card";
import {Button} from "@/components/ui/button";

export function RoleSelection() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null)

    return (
        <section id="role-selector" className="py-16 px-4 bg-gray-900">
            <div className="container mx-auto max-w-8xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Who Are You in the Crypto
                        Universe?</h2>
                    <p className="text-xl text-gray-400">Choose your path and discover your destiny in the TradeTant
                        ecosystem</p>
                </div>

                {selectedRole && (
                    <motion.button
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="mb-8 text-white flex items-center hover:text-gray-300 transition-colors"
                        onClick={() => setSelectedRole(null)}
                        aria-label="Back to all roles"
                    >
                        <ChevronLeft className="h-6 w-6 mr-2"/>
                        Back
                    </motion.button>
                )}

                <motion.div layout
                            className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-7 gap-6 justify-items-center items-center my-24">
                    <AnimatePresence mode="wait">
                        {ROLES.map((role) => (
                            <RoleCard
                                key={role.id}
                                role={role}
                                isSelected={selectedRole === role.id}
                                isExpanded={selectedRole !== null}
                                onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-12 text-center">
                    <p className="text-xl mb-6 text-gray-400">
                        No matter who you are, there&#39;s a place for you in TradeTant.
                        <br/>
                        Step into the arena and forge your path.
                    </p>
                </motion.div>
            </div>

            <div className="flex justify-center mt-12">
                <Button
                    size="lg"
                    variant="clean"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    Enlist. Earn. Evolve.
                </Button>
            </div>

            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-12 mx-auto max-w-4xl">
                <p className="text-2xl mb-6 text-center font-serif">
                    TradeTant transforms DeFi into a collaborative RPG where warriors farm MEV bots instead of tokens.
                    With AI suits, clan wars, and audience-powered staking, we’re turning the exploitative DeFi
                    landscape into a playground for the people. Join the rebellion—your suit awaits.
                </p>
            </motion.div>
        </section>
    )
}

