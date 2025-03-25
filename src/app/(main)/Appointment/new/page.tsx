"use client"

import { LinearProgress } from "@mui/material"
import React, { useEffect, useState } from 'react';
import getBranches from "@/libs/getBranches";
import createAppointment from "@/libs/createAppointment";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import Page1 from "@/components/appointment/Page1";
import Page2 from "@/components/appointment/Page2";

export default function CreateAppointment() {
    const query: any = useSearchParams();
    const { data: session } = useSession();

    if (!session?.user) return null;

    const [page, setPage] = useState(0);
    const [branchData, setBranchData] = useState([]);

    const [branch, setBranch] = useState(query.get("branch"));
    const [service, setService] = useState("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [timeBegin, setTimeBegin] = useState("");
    const [timeEnd, setTimeEnd] = useState("");

    function onBack() { setPage(page - 1); }
    function onNext() { setPage(page + 1); }
    async function create() {
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

        const result = await createAppointment((session?.user as any).token, body);
        if (result) {
            redirect('/appointment');
        } else {
            alert("Cannot Create Appointment");
        }
    }

    useEffect(() => {
        async function fetchData() {
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
                <div className="font-bold text-4xl text-white">Create Appointment</div>
                <div className="w-[60vw] h-[70vh] bg-neutral-800 flex shadow-lg rounded flex-col items-center overflow-auto">
                    <LinearProgress variant="determinate" value={page * 100} className="w-full" />
                    <div className="grow w-full">
                        <Page1 fns={fns} visible={page == 0} />
                        <Page2 fns={fns} visible={page == 1} />
                    </div>
                    <div className="text-black relative w-full h-fit flex justify-center p-3 items-center">
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
                                <button className="absolute right-0 m-3 bg-green-300 px-5 py-2 text-2xl font-bold rounded cursor-pointer" onClick={create}>Create</button>
                        }
                    </div>

                </div>
            </div>
        </main>
    )
}