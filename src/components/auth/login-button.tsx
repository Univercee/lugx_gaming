import Link from "next/link";
 
interface LoginButtonProps {
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?: boolean
}

export const LoginButton = ({
    children,
    mode,
    asChild
}: LoginButtonProps)=>{
    

    return (
        <Link href="/auth/login" className="nav-link sign-in">{children}</Link>
    )
}