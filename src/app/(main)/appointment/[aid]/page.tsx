"use client"

import React, { useEffect, useState } from 'react';
import getBranches from "@/libs/getBranches";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import getAppointment from "@/libs/getAppointment";
import updateAppointment from "@/libs/updateAppointment";
import { LinearProgress } from '@mui/material';
import Page1 from '@/components/appointment/Page1';
import Page2 from '@/components/appointment/Page2';


export default function EditAppointment() {
    const { aid } = useParams();

    const { data: session } = useSession();

    if (!session?.user) return null;
    const token = (session?.user as any).token;

    const [page, setPage] = useState(0);
    const [branchData, setBranchData] = useState([]);

    const [branch, setBranch] = useState("");
    const [service, setService] = useState("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [timeBegin, setTimeBegin] = useState("");
    const [timeEnd, setTimeEnd] = useState("");

    function onBack() { setPage(page - 1); }
    function onNext() { setPage(page + 1); }
    async function update() {
        if (!(branch && service && date && timeBegin && timeEnd)) {
            alert("Please fill in completely");
            return;
        }

        const body = {
            branchId: branch,
            areaId: "67bee95c9e2ee6af2b3c763c",
            service: service,
            timeStart: dayjs(date).add(parseInt(timeBegin), 'hour').toISOString(),
            timeEnd: dayjs(date).add(parseInt(timeEnd), 'hour').toISOString()
        }

        const result = await updateAppointment(token, aid as string, body);
        if (result) {
            redirect('/appointment');
        } else {
            alert("Cannot Update Appointment");
        }
    }

    useEffect(() => {
        async function fetchData() {
            const appt = await getAppointment(token, aid as string);
            if (appt != null) {
                setBranch(appt.data.branchId._id);
                setService(appt.data.service);
                setDate(dayjs(appt.data.timeStart).hour(0));
                setTimeBegin(dayjs(appt.data.timeStart).format("H"));
                setTimeEnd(dayjs(appt.data.timeEnd).format("H"));
            }

            const data2 = await getBranches()
            setBranchData(data2);
        }
        fetchData();
    }, [])


    const fns = {
        page: [page, setPage],
        branchData: [branchData, setBranchData],
        branch: [branch, setBranch],
        service: [service, setService],
        date: [date, setDate],
        timeBegin: [timeBegin, setTimeBegin],
        timeEnd: [timeEnd, setTimeEnd]
    }


    return (
        <main>
            <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                <div className="font-bold text-4xl text-white">Update Appointment</div>
                <div className="w-[60vw] h-[70vh] bg-neutral-800 flex shadow-lg rounded flex-col items-center overflow-auto">
                    <LinearProgress variant="determinate" value={page * 100} className="w-full" />
                    <div className="grow w-full">
                        <Page1 fns={fns} visible={page == 0} />
                        <Page2 fns={fns} visible={page == 1} />
                    </div>
                    <div className="relative w-full h-fit flex justify-center p-3 items-center text-black">
                        {
                            page > 0 ?
                                <button className="absolute left-0 m-3 bg-blue-300 px-5 py-2 text-2xl font-bold rounded cursor-pointer" onClick={onBack}>Back</button>
                                : null
                        }

                        <div className="text-white text-2xl font-bold">Page {page + 1} of 2</div>
                        {
                            page < 1 ?
                                <button className="absolute right-0 m-3 bg-blue-300 px-5 py-2 text-2xl font-bold rounded cursor-pointer" onClick={onNext}>Next</button>
                                :
                                <button className="absolute right-0 m-3 bg-green-300 px-5 py-2 text-2xl font-bold rounded cursor-pointer" onClick={update}>Update</button>
                        }
                    </div>

                </div>
            </div>
        </main>
    )
}