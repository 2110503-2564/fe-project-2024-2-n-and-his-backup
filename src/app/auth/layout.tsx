import { Montserrat_Alternates } from "next/font/google";

const font = Montserrat_Alternates({weight: ["400", "800"], subsets: ["latin"]})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={font.className}>
        {children}
    </div>
  );
}
