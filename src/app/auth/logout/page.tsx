"use client"

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignoutPage() {
    useEffect(() => {
        const fn = async () => {
            await signOut({ redirect: false });
            redirect("/")
        };
        fn();
    }, []);

    return null;
}