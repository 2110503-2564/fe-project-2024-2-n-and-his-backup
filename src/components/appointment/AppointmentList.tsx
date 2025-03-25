"use client"

import deleteAppointment from "@/libs/deleteAppointment";
import dayjs from "dayjs";
import Link from "next/link";

export default function AppointmentList2({token, data}: {token: string, data: any}) {
    const deleteAppt = async (id: string) => {
        if (confirm("Do you want to cancel this Appointment?")) {
            const result = await deleteAppointment(token, id);
            window.location.reload();
        }
    }

    return (
        <>
            {
                data.map((item: any) => (
                    <div key={item._id} className="w-full rounded border-2 h-fit p-3 flex justify-between">
                        <div className='w-fit'>
                            <h2 className='text-2xl font-bold pb-2'>{item.branchId.name}</h2>
                            <div className='space-x-4 text-white'>
                                <i className="fa-solid fa-calendar-days"></i>
                                <div className='font-bold inline'>{dayjs(item.timeStart).format("DD/MM/YYYY")}</div>
                            </div>
                            <div className='space-x-4 text-white'>
                                <i className="fa-solid fa-clock"></i>
                                <div className='font-bold inline'>{dayjs(item.timeStart).format("HH:mm")}</div>
                            </div>
                            <hr className='my-2'/>
                            <div>{item.service}</div>
       
                        </div>
                        <div className='w-fit flex flex-col justify-end text-black gap-2'>
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
                ))
            }
        </>
    )
}