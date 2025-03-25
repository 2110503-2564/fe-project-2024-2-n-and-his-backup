import '@fortawesome/fontawesome-free/css/all.min.css';

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getAppointment from "@/libs/getAppointments";
import { LinearProgress } from "@mui/material";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AppointmentList, AppointmentListAdmin } from '@/components/appointment/AppointmentList';


async function AppointmentContainer({token}: {token: string}) {
    const data = await getAppointment(token);

    if (!data || data.length == 0) {
        return (
        <>
            <Link href="/appointment/new" className="px-3 py-1 rounded text-black bg-green-400 font-bold text-xl w-fit hover:bg-green-300 duration-100">Create Appointment</Link>
            <div className='text-white'>No upcoming appointment here</div>
        </>
        );
    }

    let upCommingCount = 0;
    data.forEach((item: any) => {
        if (item.status == "pending" || item.status == "accepted") upCommingCount++;
    })

    return (
        <>
            {
                upCommingCount >= 3?
                <div className="px-3 py-1 rounded text-black bg-neutral-400 font-bold text-xl w-fit duration-100" title='You can only create 3 appointments'>Create Appointment</div>
                : <Link href="/appointment/new" className="px-3 py-1 rounded text-black bg-green-400 font-bold text-xl w-fit hover:bg-green-300 duration-100">Create Appointment</Link>
            }
            <div className="grow overflow-y-auto flex flex-col gap-3">
                <AppointmentList token={token} data={data}></AppointmentList>
            </div>
        </>
    )
}

async function Admin({token}: {token: string}) {
    const data = await getAppointment(token);

    return (
        <div className="grow overflow-y-auto flex flex-col gap-3 px-10 text-white">
            <AppointmentListAdmin token={token} data={data}></AppointmentListAdmin>
        </div>
    );
}


export default async function Appointment(){
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;
    const token = (session?.user as any).token;

    if ((session?.user as any).role == "admin") return <Admin token={token}/>

    return(
        <div className="flex justify-around h-full text-white">
            <div className="w-[16rem] m-2 flex flex-col items-center gap-2">
                <Image
                src="/img/default2.jpeg"
                alt="Profile"
                width={0}
                height={0}
                sizes="100vw"
                className="w-3/4 aspect-square rounded-full border-2"/>
                <div className="w-full text-center font-bold text-2xl">{session?.user?.name}</div>
                <div className="w-full text-center text-md">{(session?.user as any).customerRank}</div>
                <hr className="w-4/5"></hr>
                <div className='w-full flex flex-col gap-5 items-center'>
                    <Link href={"/appointment/history"} className='text-white text-center w-3/4 py-2 rounded hover:bg-neutral-500'>
                        History
                    </Link>
                </div>
            </div>
            <div className="grow m-2 flex flex-col gap-5">
                <Suspense fallback={<LinearProgress/>}>
                    <AppointmentContainer token={token}/>
                </Suspense>
            </div>
        </div>
    )
}