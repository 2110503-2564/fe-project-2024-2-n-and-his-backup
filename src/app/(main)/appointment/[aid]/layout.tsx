import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import getAppointment from "@/libs/getAppointment";
import { getServerSession } from "next-auth"

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ aid: string }>;
  }

export default async function Layout({children, params} : LayoutProps) {
    const { aid } = await params;

    const session = await getServerSession(authOptions);
    const token = (session?.user as any).token;

    const data = await getAppointment(token, aid);

    if (data == null) return <div className="text-white">Cannot find Appointment</div>;

    return (
        <>
            {children}
        </>
    )
}