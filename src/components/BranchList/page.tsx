import getBranches from "@/libs/getBranches";
import Image from "next/image";
import Link from 'next/link';

export default async function BranchList(){
    const response = await getBranches();

    return (
        <>
            {
                response.map((item: any) => (
                    <div key={item.id} className="w-[20rem] h-[27rem] border-[1px] border-white/50 shadow-2xl shadow-gray-700/50 rounded-2xl overflow-clip flex flex-col justify-start items-center hover:scale-[1.02] hover:shadow-amber-800/50 duration-100">
                        <Image
                        src="/img/2.png" //{item.image}
                        alt="Image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-cover w-full"/>
                        <div className="p-4 text-white">

                            <div className="text-[1.5rem] font-bold">{item.name}</div>
                            
                            <div className="p-3 space-y-3 mt-1">
                                <div className='space-x-4'>
                                    <i className="fa-solid fa-location-dot"></i>

                                    <div className='inline'>{item.address}</div>
                                </div>

                                <div className='space-x-4'>
                                    <i className="fa-solid fa-phone"></i>

                                    <div className='inline'>{item.telephone.join(", ")}</div>
                                </div>
                            </div>
                        </div>
                        
                        <Link href={"/branches/" + item.id} className='px-5 py-2 bg-amber-600 w-fit rounded font-bold hover:bg-amber-300 hover:text-black duration-100'>View</Link>
                    </div> 
                ))
            }
        </>
    )
}