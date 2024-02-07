import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import { FaGoogle, FaGithub } from "react-icons/fa"

export function LoginSocials(){
    
    const onClick = (provider: 'google'|'github')=>{
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <button className="border rounded-xl p-3 flex justify-center bg-white hover:bg-white/50" onClick={()=>{
                onClick("github")
            }}>
                <FaGithub className="h-5 w-5"></FaGithub>
            </button>
            <button className="border rounded-xl p-3 flex justify-center bg-white hover:bg-white/50" onClick={()=>{
                onClick("google")
            }}>
                <FaGoogle className="h-5 w-5"></FaGoogle>
            </button>
        </div>
    )
}