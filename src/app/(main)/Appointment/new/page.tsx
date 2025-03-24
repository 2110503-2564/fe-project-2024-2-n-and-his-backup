"use client"

import { ClassNames } from "@emotion/react"
import { Select,MenuItem , TextField, SelectChangeEvent} from "@mui/material"
import React, { useState } from 'react';
import Link from "next/link";

export default function CreateAppointment(){

    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [area, setArea] = useState<string>("");

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value);
    };

    const handleLocationChange = (e: SelectChangeEvent<string>) => {
        setLocation(e.target.value);
    };

    const handleAreaChange = (e: SelectChangeEvent<string>) => {
        setArea(e.target.value);
    };

    return(
        <main>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-1/3 h-4/5 bg-neutral-800 flex  shadow-lg rounded-2xl flex-col items-center">
                    <div className="w-3/5 h-1/9 bg-gray-200 mt-7 rounded-2xl flex justify-center items-center">
                        <div className="text-black text-3xl font-semibold ">Create Appointment</div>
                    </div>

                    <div className="h-[3em] w-[300px] text-white bg-gray-200 mt-8 rounded-2xl text-center">
                        <Select variant = "standard" name ="location" id = "location" className ="h-[3em] w-[300px]" value = {location} onChange={handleLocationChange} sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600 ,minWidth: '300px'}} displayEmpty 
                        renderValue={(selected:string) => selected ? selected : "Select a location"}>

                            <MenuItem value="The Bloom Pavilion" className="font-montserrat" 
                            sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600 }}>The Bloom Pavilion</MenuItem>

                            <MenuItem value ="Spark Space" 
                            sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600 }}>Spark Space</MenuItem>

                            <MenuItem value="The Grand Table" sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600 }}>The Grand Table</MenuItem>
                        </Select>
                    </div>

                    <div className="h-[3em] w-[300px] text-white bg-gray-200 my-8 rounded-2xl text-center">
                        <Select variant = "standard" name ="location" id = "location" className ="h-[3em] w-[300px]"
                        value ={area} onChange={handleAreaChange} 
                        sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600 ,minWidth: '300px',}} displayEmpty 
                        renderValue={(selected:string) => selected ? selected : "Select an area"}>

                            <MenuItem value="The Bloom Pavilion" className="font-montserrat" 
                            sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600 }}>The Bloom Pavilion</MenuItem>

                            <MenuItem value ="Spark Space" 
                            sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600 }}>Spark Space</MenuItem>

                            <MenuItem value="The Grand Table" sx={{ fontFamily: "Montserrat Alternates, sans-serif", fontWeight: 600 }}>The Grand Table</MenuItem>
                        </Select>
                    </div>

                    <form className="space-y-4 flex flex-col items-center">
                        <div className="flex flex-col">
                            <label htmlFor="startTime" className="text-gray-200">Start Time</label>
                            <input
                            type="time"
                            id="startTime"
                            value={startTime}
                            onChange={handleStartTimeChange}
                            className="border-2 p-2 rounded-md bg-gray-200 w-[150px] h-[2.5em]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="startTime" className="text-gray-200">End Time</label>
                            <input
                            type="time"
                            id="endTime"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            className="border-2 p-2 rounded-md bg-gray-200 w-[150px] h-[2.5em]"
                            />
                        </div>
                    </form>
                    
                    <Link href = "/" className="w-3/5 h-1/9 bg-gray-200 mt-30 rounded-2xl flex justify-center items-center">
                        <div className="text-black text-2xl font-semibold ">Submit Appointment</div>
                    </Link>
                    
                </div>
            </div>
        </main>
    )
}