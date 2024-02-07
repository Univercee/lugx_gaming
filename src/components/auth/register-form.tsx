'use client'
import Link from "next/link";
import { useFormState } from "react-dom";
import { CardWrapper } from "../card/card-wrapper";
import { MessageSuccess } from "../card/message-success";
import { MessageError } from "../card/message-error";
import LoaderWrapper from "../card/loader-wrapper";
import { register } from "@/lib/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function RegisterForm(){
    const initialState = { message: "", errors: {}};
    let [state, dispatch] = useFormState(register, initialState);
    return (
        <CardWrapper>
            <Link href="/" className="inline-block mb-7 hover:underline text-primary"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> To main page</Link>
            <form action={dispatch} className="flex flex-col items-center gap-6">
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="name">Name</label>
                        <input className="border rounded-xl p-3" id="name" type="name" name='name' aria-describedby='name-error'/>
                    </div>
                    {state.errors?.name &&
                    <div className={`p-2 form-error`} id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors.name.map((error: string) => (
                            <p className="mt-2 text-sm text-accent" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>}
                </div>
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="email">Email</label>
                        <input className="border rounded-xl p-3" id="email" type="email" name='email' aria-describedby='email-error'/>
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
                <div className="w-full">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-xl" htmlFor="password">Password</label>
                        <input className="border rounded-xl p-3" id="password" type="password" name='password' aria-describedby='password-error'/>
                    </div>
                    {state.errors?.password &&
                    <div className="p-2" id="password-error" aria-live="polite" aria-atomic="true">
                        {state.errors.password.map((error: string) => (
                            <p className="mt-2 text-sm text-accent" key={error}>
                            {error}
                            </p>
                        ))}
                    </div>}
                </div>
                <MessageSuccess message={state.message}></MessageSuccess>
                <MessageError message={state.error}></MessageError>
                <LoaderWrapper mode="form">
                    <button type="submit" className="button-accented">Register</button>
                </LoaderWrapper>
                <Link href="/auth/login" className="text-primary hover:text-primary/80 text-sm mt-5">Have an account? Login</Link>
            </form>
        </CardWrapper>
    )
}