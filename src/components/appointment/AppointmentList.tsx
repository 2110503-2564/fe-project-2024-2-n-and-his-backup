"use client"

import deleteAppointment from "@/libs/deleteAppointment";
import getAppointments from "@/libs/getAppointments";
import updateAppointment from "@/libs/updateAppointment";
import { MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";



export function AppointmentListAdmin({token, data}: {token: string, data: any[]}) {
    const [allData, setAllData] = useState(data);

    const deleteAppt = async (id: string) => {
        if (confirm("Do you want to cancel this Appointment?")) {
            const result = await deleteAppointment(token, id);
            window.location.reload();
        }
    }

    async function updateStatus(aid: string, value: string) {
        const result = await updateAppointment(token, aid, {status: value});
        if (result) alert("saved");

        const data2 = await getAppointments(token);
        setAllData(data2)
    }

    return (
        <>
            {
                allData.map((item: any) => {
                    if (item.status != "canceled") {
                        return (
                        <div key={item._id} className="w-full rounded border-2 border-white h-fit p-3 flex justify-between">
                            <div className='w-fit'>
                                <h2 className='text-2xl font-bold pb-2'>{item.branchId.name}</h2>
                                <div className='space-x-4 text-white'>
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <div className='font-bold inline'>{dayjs(item.timeStart).format("DD/MM/YYYY")}</div>
                                </div>
                                <div className='space-x-4 text-white'>
                                    <i className="fa-solid fa-clock"></i>
                                    <div className='font-bold inline'>{dayjs(item.timeStart).format("HH:mm")} - {dayjs(item.timeEnd).format("HH:mm")}</div>
                                </div>
                                <hr className='my-2'/>
                                <div>{item.service}</div>
           
                            </div>
    
    
                            <div className="border-l-1 grow mx-5 px-5">
                                <div className="w-fit">
                                    <div className="text-xl font-bold">{item.userId.name}</div>
                                    <div className="text-xl">{item.userId.email}</div>
                                    <hr className='my-2'/>
                                    <div className="text-md">{item.userId.customerRank}</div>
                                </div>
                            </div>
    
    
                            <div className='w-fit flex flex-col justify-end text-black gap-2'>
                                <Select value={item.status} className="bg-white w-[10rem] h-[2.5rem]"
                                sx={{fontWeight: 600}} onChange={(e) => {updateStatus(item._id, e.target.value)}}>
                                    <MenuItem value="pending" sx={{color: "orange", fontWeight: 600}}>Pending</MenuItem>
                                    <MenuItem value="accepted" sx={{color: "green", fontWeight: 600}}>Accepted</MenuItem>
                                    <MenuItem value="completed" sx={{color: "blue", fontWeight: 600}}>Completed</MenuItem>
                                </Select>
    
                                <Link href={"/appointment/" + item._id} className='w-full p-2 rounded bg-green-400 font-bold
                                hover:bg-green-200 duration-150 cursor-pointer text-center'>
                                    Edit
                                </Link>
                                <button className='w-full p-2 rounded bg-red-400 font-bold
                                hover:bg-red-200 duration-150 cursor-pointer'
                                onClick={() => {deleteAppt(item._id)}}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                        )
                    }
                })
            }
        </>
    )
}


export function AppointmentList({token, data, showAll}: {token: string, data: any, showAll?: boolean}) {
    const deleteAppt = async (id: string) => {
        if (confirm("Do you want to cancel this Appointment?")) {
            const result = await deleteAppointment(token, id);
            window.location.reload();
        }
    }
    return (
        <>
            {
                data.map((item: any) => {
                    if ((item.status != "canceled" && item.status != "completed") || showAll) {
                        return (
                        <div key={item._id} className={"w-full rounded border-2 h-fit p-3 flex justify-between " + (item.status == "accepted"? "border-green-500" : "border-white")}>
                            <div className='w-fit'>
                                <h2 className='text-2xl font-bold pb-2'>{item.branchId.name}</h2>
                                <div className='space-x-4 text-white'>
                                    <i className="fa-solid fa-calendar-days"></i>
                                    <div className='font-bold inline'>{dayjs(item.timeStart).format("DD/MM/YYYY")}</div>
                                </div>
                                <div className='space-x-4 text-white'>
                                    <i className="fa-solid fa-clock"></i>
                                    <div className='font-bold inline'>{dayjs(item.timeStart).format("HH:mm")} - {dayjs(item.timeEnd).format("HH:mm")}</div>
                                </div>
                                <hr className='my-2'/>
                                <div>{item.service}</div>
        
                            </div>
                            <div className='w-fit flex flex-col justify-between text-black'>
                                <div className="font-bold text-white text-xl">{item.status}</div>
                                <div className="flex flex-col gap-2">
                                    {
                                        ["pending", "accepted"].includes(item.status)? (
                                        <>
                                            <Link href={"/appointment/" + item._id} className='w-full p-2 rounded bg-green-400 font-bold
                                            hover:bg-green-200 duration-150 cursor-pointer text-center'>
                                                Edit
                                            </Link>
                                            <button className='w-full p-2 rounded bg-red-400 font-bold
                                            hover:bg-red-200 duration-150 cursor-pointer'
                                            onClick={() => {deleteAppt(item._id)}}>
                                                Cancel
                                            </button>
                                        </>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                        )
                    }
                })
            }
        </>
    )
}