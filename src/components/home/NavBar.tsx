import Link from "next/link";
import { NavBarItem } from "./NavBarItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function NavBar() {
    const session = await getServerSession(authOptions);

    return (
        <header className="fixed top-0 h-[80px] w-full py-[1rem] px-10 flex justify-between items-center z-30 duration-300">
            <nav className="flex gap-10">
                <NavBarItem href="/" content="Home"/>

                <NavBarItem href="/branches" content="Branches"/>
            </nav>

            <nav className="flex gap-5">
                {
                    session? (
                        <Link className="border-2 border-green-500 px-5 py-2 rounded-xl font-bold tracking-[0.1rem] text-(--color-text-light) relative hover:bg-green-500 hover:shadow-emerald-300/50 shadow-2xl duration-150" href="/api/auth/signout">
                            Log Out ({session.user?.name})
                        </Link>
                    ) : (
                        <Link className="bg-amber-800 px-5 py-2 rounded-xl font-bold tracking-[0.1rem] text-(--color-text-light) relative hover:bg-amber-500 hover:shadow-amber-500/50 shadow-2xl duration-150"href="/api/auth/signin">
                            Log In
                        </Link>
                    )
                }

                <Link className="bg-amber-800 px-5 py-2 rounded-xl font-bold tracking-[0.1rem] text-(--color-text-light) relative      hover:bg-amber-500 hover:shadow-amber-500/50 shadow-2xl duration-150"href="/auth/signup">
                    Sign-Up
                </Link>
            </nav>
        </header>
    );
}