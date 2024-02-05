import { logout } from "@/lib/actions/auth";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "next-auth";
import Link from "next/link";

export function LoginButton({user}: {user: User}){
    return (
        <div className="flex items-center justify-center gap-4 w-full">
            <div className="nav-link sign-in cursor-pointer">
                {!user && <Link href="/auth/login">Sign in</Link>}
                {user && <button onClick={()=>{logout()}}>Logout</button>}
            </div>
            {user && <div className={`max-lg:hidden h-5 w-5 flex items-center justify-center p-5 rounded-full ${!user.image??"bg-white"}`} style={{backgroundSize:"100% 100%", backgroundImage: user.image?`url(${user.image})`:""}}>
                {!user.image && <FontAwesomeIcon className="h-5 w-5" icon={faUser}></FontAwesomeIcon>}
            </div>}
            
        </div>
    )
}