import { User } from "next-auth";
import { useSession } from "next-auth/react";

export function useCurrentUser(): User{
    const session = useSession();
    return session.data?.user;
}