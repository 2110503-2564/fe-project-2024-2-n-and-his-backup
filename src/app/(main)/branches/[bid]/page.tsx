import '@fortawesome/fontawesome-free/css/all.min.css';

import getBranch from "@/libs/getBranch";
import Image from "next/image";
import Link from 'next/link';
import NavBar from '@/components/home/NavBar';

export default async function ViewBranch({params} : {params: Promise<{bid: string}>}) {
    const { bid } = await params;
    const branch = await getBranch(bid);

   if (!branch) return <div className='text-white'>This Branch does not exist</div>

    const lat = branch.latitude;
    const lon = branch.longitude

    return (
    <>
        <NavBar/>
        <div className="text-white w-full h-full pt-[80px]">
            <div className="flex h-full w-full p-4 gap-4">
                <div className="w-[35%] flex flex-col gap-4">
                    <Image
                    src="/img/2.png"
                    alt="image"
                    sizes={"100vw"}
                    width={0}
                    height={0}
                    className="w-full h-auto rounded"/>
                    <iframe
                        className="w-full grow rounded"
                        loading="lazy"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.003},${lat - 0.003},${lon + 0.003},${lat + 0.003}&layer=mapnik&marker=${lat},${lon}`}>
                    </iframe>

                </div>
                <div className="relative w-[65%]">
                    <h1 className="text-4xl font-bold">{branch.name}</h1>
                    <h2 className='text-2xl m-2 ml-4'>Starting from <b>500฿</b></h2>
                    <div className="p-3 space-y-3 text-xl">
                        <div className='space-x-4'>
                            <i className="fa-solid fa-location-dot"></i>
                            <div className='inline'>{branch.address}</div>
                        </div>
                        <div className='space-x-4'>
                            <i className="fa-solid fa-phone"></i>
                            <div className='inline'>{branch.telephone.join(", ")}</div>
                        </div>
                        <div className='space-x-4'>
                            <i className="fa-solid fa-clock"></i>
                            <div className='inline'>{branch.openTime} - {branch.closeTime}</div>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-wrap overflow-x-auto gap-5">
                        {
                            branch.service.map((item: any) => (
                                <div key={item.name} className="border-2 px-10 rounded p-2 hover:bg-white hover:text-black duration-200 text-nowrap">
                                    <h1 className='text-center font-bold text-xl'>{item.name}</h1>
                                    <h1 className='text-center font-bold text-md'>{item.rate}฿ / hr</h1>
                                </div>
                            ))
                        }
                    </div>
                    <Link href={"/appointment/new?branch=" + bid} className="px-5 py-1 bg-green-600 rounded text-xl font-bold absolute bottom-5 left-0 right-0 m-auto w-fit cursor-pointer
                    hover:bg-green-400 duration-150 text-center">
                    Create Appointment<br/>on this Branch
                    </Link>
                </div>
                
            </div>
        </div>
    </>
    );
}