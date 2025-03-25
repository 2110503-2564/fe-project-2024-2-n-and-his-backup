import LogInForm from "@/components/logInForm"
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function LogInPage() {
    return (
        <div className="flex items-center justify-center w-full h-screen text-white text-[1rem]">
            <div className="w-[42%] h-screen flex items-center justify-center">
                <div className="flex flex-col items-start">
                    <h1 className="text-[2.2rem] font-bold mb-3">Log in to your account</h1>

                    <p className="mb-7">Don't have an account? 
                        <Link className="text-amber-500 mx-2 font-bold cursor-pointer hover:text-amber-200" href="/auth/signup">
                            Sign-Up
                        </Link>
                    </p>
                    <Suspense fallback={"loading"}>
                        <LogInForm/>
                    </Suspense>
                </div>
            </div>

            <div className="w-[58%] h-screen relative">
                <Image src={'/img/candles.jpg'} alt="welcome image" objectFit='cover' fill={true}/>
            </div>
        </div>
    );
}