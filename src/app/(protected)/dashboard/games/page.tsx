'use server'
import { auth } from "@/auth";
import { ProductsByUser } from "@/components/products-by-user";

export default async function Page() {
    const session = await auth();
    return (
        <>
           {session && <ProductsByUser userId={session.user.id}></ProductsByUser>}
        </>
    )
}
