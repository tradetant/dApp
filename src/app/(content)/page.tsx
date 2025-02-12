import React from "react"

import {FooterSection, HeroSection, RoleSelection} from "./_components";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <HeroSection/>
            <RoleSelection/>
            <FooterSection/>
        </div>
    )
}