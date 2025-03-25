"use client"
import { useSession } from "next-auth/react";
import { redirect, usePathname, useSearchParams } from "next/navigation";

export default function Protect({children} : {children: React.ReactNode}) {
    const pathname = usePathname();
    const searchParams = useSearchParams().toString();
    const fullPath = searchParams ? `${pathname}?${searchParams}` : pathname;

    const {data: session} = useSession();

    if (!session) {
        return redirect("/auth/login?redirect=" + btoa(encodeURIComponent(fullPath)));
    }

    return (
        <>
            {children}
        </>
    );
}