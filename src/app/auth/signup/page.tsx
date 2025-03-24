import Image from "next/image";
import SignUpFrom from "@/components/SignUpFrom";
import Link from "next/link";

export default function SignUpPage() {
    return(
        <div className="flex items-center justify-center w-full h-screen text-white text-[1.2rem]">
            <div className="w-[50%] h-screen flex flex-col items-center justify-center">
                <h1 className="text-[2.8rem] font-bold mb-3">Register</h1>

                <p className="mb-9">Register and Enjoy Our Services</p>

                <SignUpFrom/>

                <p className="mt-7 text-[1rem]">Already have an account? 
                    <Link className="text-green-500 mx-2 font-bold cursor-pointer hover:text-green-300" href="/auth/login">
                        Sign-In
                    </Link>
                </p>
            </div>

            <div className="w-[50%] h-screen relative">
                <Image src={'/img/massage-therapy.jpg'} alt="welcome image" objectFit='cover' fill={true}/>
            </div>
        </div>
    );
}