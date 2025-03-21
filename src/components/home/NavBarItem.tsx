import Link from "next/link";

export function NavBarItem({href, content} : {href: string, content: string}) {
    return (
        <Link className="font-bold tracking-[0.1rem] text-(--color-text-light) relative" href={href}>{content}</Link>
    );
}