'use client';

import React, {useMemo} from "react";

import {Button} from "./ui/button";
import {truncateAddress} from "@/lib/wallet";
import {useLogin} from "@/hooks";

export function LoginButton() {
    const {ready, login, authenticated, user, logout} = useLogin();
    const address = useMemo(() => user?.wallet?.address ? truncateAddress(user?.wallet?.address) : '', [user]);

    return (
        <Button onClick={authenticated ? logout : login} disabled={!ready} variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white">
            {ready ? (authenticated ? address : "Login") : "Loading"}
        </Button>
    )
}