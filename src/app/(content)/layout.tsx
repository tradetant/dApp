import React, {PropsWithChildren} from "react";

import {FloatingActionButton} from "./_components";

export default function Layout({children}: PropsWithChildren) {
    return (
        <>
            {children}
            <FloatingActionButton/>
        </>
    )
}