import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import NavBar from "@/components/home/NavBar";
import Protect from "@/components/Protect";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { Montserrat_Alternates } from "next/font/google";

const font = Montserrat_Alternates({weight: ["400", "800"], subsets: ["latin"]})

export default async function MainLayout({children} : {children: React.ReactNode}) {

    const session = await getServerSession(authOptions);

    return (
        <NextAuthProvider session={session}>
            <Protect>
                <main className="m-0 h-[100vh] box-border pt-[80px]">
                    <NavBar/>
                    <div className={"h-full " + font.className}>
                        {children}
                    </div>
                </main>
            </Protect>
        </NextAuthProvider>
    );
}