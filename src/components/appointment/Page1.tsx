import Image from "next/image";

export default function Page1({ fns, visible }: { fns: any, visible: boolean }) {
    const [branchData, setBranchData] = fns.branchData;
    const [branch, setBranch] = fns.branch

    return (
        <div className={"h-full text-white flex-col items-center w-full p-2 " + (visible ? "flex" : "hidden")}>
            <h2 className="text-3xl m-5 font-bold">Select Branch</h2>
            <div className="p-3 w-full grow flex gap-2">
                <div className="w-1/2 h-full bg-[rgba(0,0,0,0.2)] rounded overflow-y-auto p-2 flex flex-col gap-2">
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
                    (branch != null && branchData.length > 0) ?
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