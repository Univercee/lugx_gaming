"use client"
import { logout } from "@/lib/actions/auth";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function LoginButton(){
    const session = useSession();
    const user = session.data?.user;
    return (
        <div className="flex items-center justify-center gap-4 w-full">
            {!user && <Link className="nav-link sign-in cursor-pointer" href="/auth/login">Sign in</Link>}
            {user && <button onClick={()=>{logout()}} className="nav-link sign-in cursor-pointer">Logout</button>}
            {user && <div className="max-lg:hidden h-5 w-5 flex items-center justify-center p-5 rounded-full" style={{backgroundSize:"100% 100%", background: user.image?`url(${user.image})`:"white"}}>
                {!user.image && <FontAwesomeIcon className="h-5 w-5" icon={faUser}></FontAwesomeIcon>}
            </div>}
        </div>
    )
}