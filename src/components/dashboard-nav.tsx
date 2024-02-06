'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
    const pathname = usePathname();
    return (
        <nav>
            <ul className="flex flex-col gap-4">
                <Link href="/dashboard/games" className={`nav-link-dashboard ${pathname==="/dashboard/games"?"active":""}`}><li>Your games</li></Link>
                <Link href="/dashboard/account" className={`nav-link-dashboard ${pathname==="/dashboard/account"?"active":""}`}><li>Account</li></Link>
            </ul>
        </nav>
    )
}
