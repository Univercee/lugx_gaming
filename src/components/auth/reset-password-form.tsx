'use client'
import { resetPassword } from "@/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { CardWrapper } from "../card/card-wrapper";
import { MessageSuccess } from "../card/message-success";
import { MessageError } from "../card/message-error";
import LoaderWrapper from "../card/loader-wrapper";

export function ResetPasswordForm(){
    const initialState = { message: "", errors: {}};
    let [state, dispatch] = useFormState(resetPassword, initialState);
    return (
        <CardWrapper>
            <form action={dispatch} className="flex flex-col items-center gap-6">
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <input className="border rounded-xl p-3" id="email" type="email" name='email' placeholder="Type your email..." aria-describedby='email-error'/>
                    </div>
                    {state.errors?.email &&
                    <div className="p-2" id="email-error" aria-live="polite" aria-atomic="true">
                        {state.errors.email.map((error: string) => (
                            <p className="mt-2 text-sm text-accent" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>}
                </div>
                <MessageSuccess message={state.message}></MessageSuccess>
                <MessageError message={state.error}></MessageError>
                <LoaderWrapper mode="form">
                    <button type="submit" className="button-accented">Send reset email</button>
                </LoaderWrapper>
                <Link href="/auth/login" className="text-primary hover:text-primary/80 text-sm mt-5">Back to login page</Link>
            </form>
        </CardWrapper>
    )
}