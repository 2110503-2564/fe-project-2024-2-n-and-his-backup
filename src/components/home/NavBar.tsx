import Link from "next/link";
import { NavBarItem } from "./NavBarItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function NavBar() {
    const session = await getServerSession(authOptions);

    return (
        <header className="fixed top-0 h-[80px] w-full py-[1rem] px-10 flex justify-between items-center z-30 duration-300 text-[1rem]">
            <nav className="flex gap-14">
                <NavBarItem href="/" content="Home"/>

                <NavBarItem href="/branches" content="Branches"/>

                {
                    session ? (
                        <NavBarItem href="/appointment" content="Appointment"/>
                    )
                    : null
                }
            </nav>

            <nav className="text-[1rem]">
                {
                    session? (
                        /* --- Log out btn --- */
                        <Link className="flex border-2 border-green-500 px-5 py-2 rounded-lg font-bold tracking-[0.1rem] text-(--color-text-light) relative hover:bg-green-500 hover:shadow-emerald-300/50 shadow-2xl duration-150" href="/auth/logout">
                            <p>Log Out</p>
                        </Link>
                    ) : (
                        <div className="flex justify-center items-center flex-row gap-5">
                            {/* --- Log in btn --- */}
                            <Link className="bg-amber-700 px-5 py-2 rounded-lg font-bold tracking-[0.1rem] text-(--color-text-light) relative hover:bg-amber-500 hover:shadow-amber-500/50 hover:text-black shadow-2xl duration-150" href="/auth/login">
                                <p>Log In</p>
                            </Link>

                            {/* <p className="text-amber-800 font-bold text-[1.5rem]">or</p> */}

                            {/* --- Sign up btn --- */}
                            {/* <Link className="bg-amber-800 px-5 py-2 rounded-xl font-bold tracking-[0.1rem] text-(--color-text-light) relative hover:bg-amber-500 hover:shadow-amber-500/50 shadow-2xl duration-150"href="/auth/signup">
                                Sign-Up
                            </Link> */}
                        </div>
                    )
                }
            </nav>
        </header>
    );

}