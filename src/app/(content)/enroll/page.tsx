"use client";

import {Suspense} from "react";
import {redirect, useSearchParams} from "next/navigation";
import Link from "next/link";

import {FORMS} from "./_components";
import {Button} from "@/components/ui/button";
import {IconHome} from "@tabler/icons-react";

type FormKeys = keyof typeof FORMS;

function FormLoader() {
    const searchParams = useSearchParams()
    const formKey = searchParams.get('source') as FormKeys;
    if (!formKey) return redirect('/') // TODO: Create a default form or list the available forms.

    const {Component, formId} = FORMS[formKey];
    return (
        <div className="absolute inset-0">
            <Component formId={formId}/>
        </div>
    );
}

export default function EnrollPage() {
    return (
        <div className="content mx-auto h-screen">
            <div className="absolute inset-0 z-0 brightness-50 bg-[url('/x-image.png')] bg-center bg-cover"/>
            <div className="absolute top-0 right-0 m-4 z-20 sm:left-0">
                <Link href="/">
                    <Button className="bg-white/10 hover:bg-white/20 text-white"><IconHome/></Button>
                </Link>
            </div>
            <Suspense fallback={<div className="absolute inset-0 flex z-10 justify-center items-center text-5xl">Loading...</div>}>
                <FormLoader/>
            </Suspense>
        </div>
    );
}