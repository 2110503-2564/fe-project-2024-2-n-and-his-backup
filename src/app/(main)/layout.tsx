import '@fortawesome/fontawesome-free/css/all.min.css';

import NavBar from "@/components/home/NavBar";
import { Montserrat_Alternates } from "next/font/google";

const font = Montserrat_Alternates({weight: ["400", "800"], subsets: ["latin"]})

export default function MainLayout({children} : {children: React.ReactNode}) {
    return (
        <main className={font.className + "m-0 h-[100vh] box-border"}>
            <NavBar/>
            <div className="h-full">
                {children}
            </div>
        </main>
    );
}