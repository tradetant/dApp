"use client";

import {PropsWithChildren} from "react";

import {PrivyProvider} from "./privy";

const Providers: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <PrivyProvider>
            {children}
        </PrivyProvider>
    )
}

export default Providers;