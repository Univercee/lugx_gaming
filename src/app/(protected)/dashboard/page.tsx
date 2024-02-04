'use client'

import { useSession, signOut } from "next-auth/react"

export default function LoginPage() {
    const user = useSession();
    return (
        <div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <h1>Dashboard</h1>
        </div>
    )
}
