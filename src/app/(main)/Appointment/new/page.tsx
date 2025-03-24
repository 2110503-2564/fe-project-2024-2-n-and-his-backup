"use client"

import { Select, MenuItem, TextField, SelectChangeEvent, LinearProgress } from "@mui/material"
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import getBranches from "@/libs/getBranches";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import createAppointment from "@/libs/createAppointment";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

const hours = Array.from({ length: 24 }, (_, i) => i);

function TimeSelect({ value, onChange }: { value: string, onChange: Function }) {
    return (
        <Select variant="standard" name="location" id="location" className="h-[3em] w-[100px] rounded-2xl"
            sx={{ background: "white", textAlign: 'center' }} displayEmpty
            renderValue={(selected: string) => (selected != "") ? selected + ":00" : ""}
            value={value} onChange={onChange as any}>
            {
                hours.map((hour) => (
                    <MenuItem value={hour}>{hour}:00</MenuItem>
                ))
            }
        </Select>
    );
}

function Page1({ fns, visible }: { fns: any, visible: boolean }) {
    const [branchData, setBranchData] = fns.branchData;
    const [branch, setBranch] = fns.branch

    return (
        <div className={"h-full text-white flex-col items-center w-full p-2 " + (visible ? "flex" : "hidden")}>
            <h2 className="text-3xl m-5 font-bold">Select Branch</h2>
            <div className="p-3 w-full grow flex gap-2">
                <div className="w-1/2 h-full bg-[rgba(0,0,0,0.2)] rounded overflow-y-auto p-2">
                    {
                        branchData.map((item: any) => (
                            <div key={item._id} className={"w-full h-fit p-2 rounded cursor-pointer " + (branch == item._id ? "bg-white text-black" : "bg-black hover:bg-neutral-500")} onClick={() => setBranch(item._id)}>
                                <div className="font-bold">{item.name}</div>
                                <div className="space-x-3">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <div className="inline">{item.address}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    branch != null ?
                        <Image
                            src="/img/2.png"
                            alt="Image"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-[50%] h-fit object-contain rounded-xl" />
                        : null
                }

            </div>
        </div>
    );
}


function Page2({ fns, visible }: { fns: any, visible: boolean }) {
    const [branch, setBranch] = fns.branch;
    const [branchData, setBranchData] = fns.branchData;
    const [service, setService] = fns.service;
    const [date, setDate] = fns.date
    const [timeBegin, setTimeBegin] = fns.timeBegin;
    const [timeEnd, setTimeEnd] = fns.timeEnd;

    let serviceAll: any[] = [];
    for (let x of branchData) {
        if (x._id == branch) {
            serviceAll = x.service;
            break;
        }
    }

    return (
        <div className={"h-full text-white flex-col items-center w-full p-2 gap-5 " + (visible ? "flex" : "hidden")}>
            <h2 className="text-3xl m-5 font-bold">Your Preferred</h2>
            <Select variant="standard" name="location" id="location" className="h-[3em] w-[300px] text-center rounded-2xl"
                sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600, minWidth: '300px', background: "white" }} displayEmpty
                renderValue={(selected: string) => selected ? selected : "Select a Service"}
                value={service} onChange={(e) => setService(e.target.value)}>
                {
                    serviceAll.map((item) => (
                        <MenuItem value={item.name}>{item.name}</MenuItem>
                    ))
                }
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white rounded-2xl" onChange={(newValue) => { setDate(newValue) }} />
            </LocalizationProvider>
            <div className="flex justify-center w-full gap-5">
                <div className="flex flex-col">
                    <div className="font-bold">Time Begin</div>
                    <TimeSelect value={timeBegin} onChange={(e: any) => { setTimeBegin(e.target.value) }} />
                </div>
                <div className="flex flex-col">
                    <div className="font-bold">Time End</div>
                    <TimeSelect value={timeEnd} onChange={(e: any) => { setTimeEnd(e.target.value) }} />
                </div>
            </div>
        </div>
    );
}


export default function CreateAppointment() {
    const { data: session } = useSession();

    if (!session?.user) return null;

    const [page, setPage] = useState(0);

    const [branchData, setBranchData] = useState([]);

    const [branch, setBranch] = useState(null);
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
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
        <main className="h-ful">
            <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                <div className="font-bold text-4xl text-white">Create Appointment</div>
                <div className="w-[60vw] h-[70vh] bg-neutral-800 flex shadow-lg rounded flex-col items-center overflow-auto">
                    <LinearProgress variant="determinate" value={page * 100} className="w-full" />
                    <div className="grow w-full">
                        <Page1 fns={fns} visible={page == 0} />
                        <Page2 fns={fns} visible={page == 1} />
                    </div>
                    <div className="relative w-full h-fit flex justify-center p-3 items-center">
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