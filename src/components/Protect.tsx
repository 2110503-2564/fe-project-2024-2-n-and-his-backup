"use client"
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

export default function Protect({children} : {children: React.ReactNode}) {
    const pathname = usePathname();
    const {data: session} = useSession();

    if (!session) {
        return redirect("/auth/login?redirect=" + btoa(encodeURIComponent(pathname)));
    }

    return (
        <>
            {children}
        </>
    );
}