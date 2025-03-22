import '@fortawesome/fontawesome-free/css/all.min.css';

import getBranches from "@/libs/getBranches";
import { LinearProgress } from "@mui/material";
import Image from "next/image";
import { Suspense } from "react";
import Link from 'next/link';

async function BranchesList({getBranches} : {getBranches: Promise<Array<any>>}) {
    await new Promise((resolve) => setTimeout(() => {resolve()}, 2000))
    const response = await getBranches;

    return (
        <>
            {
                response.map((item) => (
                    <div key={item.id} className="w-[20rem] h-[25rem] border-[1px] border-white/50 shadow-2xl shadow-gray-700/50 rounded-2xl overflow-clip flex flex-col items-center hover:scale-[1.02] duration-100">
                        <Image
                        src={item.image}
                        alt="Image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-cover w-full"/>
                        <div className="p-2 text-white">

                            <div className="text-2xl font-bold">{item.name}</div>
                            
                            <div className="p-3 space-y-3">
                                <div className='space-x-4'>
                                    <i className="fa-solid fa-location-dot"></i>

                                    <div className='inline'>{item.address}</div>
                                </div>

                                <div className='space-x-4'>
                                    <i className="fa-solid fa-phone"></i>

                                    <div className='inline'>{item.tel}</div>
                                </div>
                            </div>
                        </div>
                        
                        <Link href={"/branches/" + item.id} className='px-5 py-2 bg-white w-fit rounded font-bold hover:bg-green-300 duration-100'>View</Link>
                    </div> 
                ))
            }
        </>
    )
}

export default function Branches() {
    const promise = getBranches();

    return (
        <main className="mt-[80px]">
            <div className="flex justify-center items-center gap-20">
                <Suspense fallback={<LinearProgress/>}>
                    <BranchesList getBranches={promise}/>
                </Suspense>
                
            </div>
        </main>
    );
}