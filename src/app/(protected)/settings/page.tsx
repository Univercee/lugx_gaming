import { auth } from "@/auth"
import { logout } from "@/lib/actions/auth";

export default async function Page(){
    const session = await auth();
    return(
        <div>
            <h1>Protected page</h1>
            <p>{JSON.stringify(session)}</p>
            <form action={async()=>{
                'use server'
                await logout();
            }}>
                <button type="submit">Sign out</button>
            </form>
        </div>
    )
}