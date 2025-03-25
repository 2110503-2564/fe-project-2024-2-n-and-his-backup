import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { AppointmentList } from "@/components/appointment/AppointmentList";
import getAppointments from "@/libs/getAppointments";
import { LinearProgress, ListItem } from "@mui/material";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

async function AppointmentContainer({token}: {token: string}) {
    const data = await getAppointments(token);

    return (
        <AppointmentList token={token} data={data} showAll/>
    );
}

export default async function History() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    const token = (session?.user as any).token; 

    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-4xl font-bold text-white">Appointment History</h1>
            <div className="flex flex-col overflow-y-auto h-[70vh] w-3/4 gap-3 text-white p-4">
                <Suspense fallback={<LinearProgress/>}>
                    <AppointmentContainer token={token}/>
                </Suspense>
            </div>
        </div>
    );
    
}