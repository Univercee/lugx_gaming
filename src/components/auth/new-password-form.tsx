'use client'
import { newPassword, register } from "@/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { CardWrapper } from "../card/card-wrapper";
import { MessageSuccess } from "../card/message-success";
import { MessageError } from "../card/message-error";
import LoaderWrapper from "../card/loader-wrapper";
import { useSearchParams } from "next/navigation";
import { getPasswordResetTokenByToken } from "@/data/password-resest-token";
import { useEffect, useState } from "react";

export function NewPasswordForm(){
    const [error, setError] = useState<string|undefined|null>();
    const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token")||"";
    useEffect(()=>{
        getPasswordResetTokenByToken(token)
            .then((data)=>{
                if(!data) setError("Token does not exist!");
            })
            .catch(()=>{
                setError("Something went wrong.");
            })
            .finally(()=>{
                setIsTokenLoaded(true);
            })
    }, []);

    const initialState = { message: "", errors: {}};
    let [state, dispatch] = useFormState(newPassword, initialState);
    return (
        <CardWrapper>
            <LoaderWrapper mode="manual" isLoading={!isTokenLoaded}>
                {error && 
                <div className="flex flex-col items-center">
                    <MessageError message={error}></MessageError>
                </div>}
                {!error && !state.message &&
                <form action={dispatch} className="flex flex-col items-center gap-6">
                    <div className="w-full">
                        <div className="flex flex-col gap-2">
                            <input className="border rounded-xl p-3" id="token" type="password" name='token' hidden defaultValue={token} aria-describedby='token-error'/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <input className="border rounded-xl p-3" id="password" type="password" name='password' placeholder="Type a new password..." aria-describedby='password-error'/>
                        </div>
                        {state.errors?.password &&
                        <div className="p-2" id="email-error" aria-live="polite" aria-atomic="true">
                            {state.errors.password.map((error: string) => (
                                <p className="mt-2 text-sm text-accent" key={error}>
                                {error}
                                </p>
                            ))}
                        </div>}
                    </div>
                    <MessageError message={state.error}></MessageError>
                    <LoaderWrapper mode="form">
                        <button type="submit" className="button-accented">Reset password</button>
                    </LoaderWrapper>
                </form>}
                {!error && state.message && <MessageSuccess message={state.message}></MessageSuccess>}
                <Link href="/auth/login" className="text-primary hover:text-primary/80 text-sm mt-5">Back to login</Link>
            </LoaderWrapper>
        </CardWrapper>
    )
}