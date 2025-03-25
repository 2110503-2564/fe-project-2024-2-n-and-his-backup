import '@fortawesome/fontawesome-free/css/all.min.css';

import getBranches from "@/libs/getBranches";
import { LinearProgress } from "@mui/material";
import Image from "next/image";
import { Suspense } from "react";
import Link from 'next/link';
import NavBar from '@/components/home/NavBar';
import { Metadata } from 'next';
import BranchList from '@/components/BranchList/page';

export const metadata: Metadata = {
    title: "The Massage Shop Branches"
  };

export default function Branches() {
    return (
        <main className='pt-[80px] w-full h-full'>
            <NavBar/>
            <Suspense fallback={<LinearProgress/>}>
                <div className="flex justify-center items-center gap-5 w-ful h-full">
                    <BranchList/>
                </div>
            </Suspense>
        </main>
    );
}