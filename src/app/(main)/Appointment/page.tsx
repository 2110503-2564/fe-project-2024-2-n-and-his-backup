import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getAppointment from "@/libs/getAppointment";
import { LinearProgress } from "@mui/material";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";


async function AppointmentList({token}: {token: string}) {
    const data = await getAppointment(token);

    if (!data) {
        return (<div>No upcoming appointment here</div>);
    }

    return (
        <>
            {
                data.map((item: any) => (
                    <div className="w-full rounded border-2 h-[10rem] p-3">
                        <h1 className="text-xl font-bold">test</h1>
                    </div>
                ))
            }
        </>
    )
}


export default async function Appointment(){
    const session = await getServerSession(authOptions);
    if (!session) return null;

    return(
        <div className="flex justify-around h-full pt-[80px] text-white">
            <div className="w-[16rem] m-2 flex flex-col items-center gap-2">
                <Image
                src="/img/default2.jpeg"
                alt="Profile"
                width={0}
                height={0}
                sizes="100vw"
                className="w-3/4 aspect-square rounded-full border-2"/>
                <div className="w-full text-center font-bold text-2xl">{session?.user?.name}</div>
                <hr className="w-4/5"></hr>
            </div>
            <div className="grow m-2 flex flex-col gap-5">
                <Link href="/appointment/new" className="px-3 py-1 rounded text-black bg-green-400 font-bold text-xl w-fit hover:bg-green-300 duration-100">Create Appointment</Link>
                <div className="grow overflow-y-auto">
                    <Suspense fallback={<LinearProgress/>}>
                        <AppointmentList token={(session?.user as any).token}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}