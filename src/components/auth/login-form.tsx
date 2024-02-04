'use client'
import Link from "next/link";
import { useFormState } from "react-dom";
import { LoginSocials } from "./login-socials";
import { useSearchParams } from "next/navigation";
import { MessageError } from "../card/message-error";
import { MessageSuccess } from "../card/message-success";
import { CardWrapper } from "../card/card-wrapper";
import LoaderWrapper from "../card/loader-wrapper";
import { login } from "@/lib/actions/auth";

export function LoginForm(){
    const initialState = { message: "", errors: {}};
    const [state, dispatch] = useFormState(login, initialState);
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ?"Email already in use with different provider!"
        :"";

    return (
        <CardWrapper>
            <form action={dispatch} className="flex flex-col items-center gap-8">
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="email">Email</label>
                        <input className="border rounded-xl p-3" id="email" type="email" name='email' aria-describedby='email-error'/>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="password">Password</label>
                        <input className="border rounded-xl p-3" id="password" type="password" name='password' aria-describedby='password-error'/>
                    </div>
                    <Link href="/auth/reset-password" className="text-black text-sm underline-offset-2 hover:underline mt-3 inline-block">Fogot password?</Link>
                </div>
                <LoginSocials></LoginSocials>
                <MessageError message={state.error||urlError}></MessageError>
                <MessageSuccess message={state.message}></MessageSuccess>
                <LoaderWrapper mode="form">
                    <button type="submit" className="button-accented">Log in</button>
                </LoaderWrapper>
                <Link href="/auth/registration" className="text-primary hover:text-primary/80 text-sm mt-5">Don't have an account? Registration</Link>
            </form>
        </CardWrapper>
    )
}