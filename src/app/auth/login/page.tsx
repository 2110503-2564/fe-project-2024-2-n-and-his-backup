import LogInForm from "@/components/logInForm"
import Image from "next/image";
import Link from "next/link";

export default function LogInPage() {
    return (
        <div className="flex items-center justify-center w-full h-screen text-white text-[1.2rem]">
            <div className="w-[40%] h-screen flex items-center justify-center">
                <div className="flex flex-col items-start">
                    <h1 className="text-[2.4rem] font-bold mb-3">Log in to your account</h1>

                    <p className="mb-9">Don't have an account? 
                        <Link className="text-green-500 mx-2 font-bold cursor-pointer hover:text-green-300" href="/auth/signup">
                            Sign-Up
                        </Link>
                    </p>

                    <LogInForm/>
                </div>
            </div>

            <div className="w-[60%] h-screen relative">
                <Image src={'/img/candles.jpg'} alt="welcome image" objectFit='cover' fill={true}
                ></Image>
            </div>
        </div>
    );
}