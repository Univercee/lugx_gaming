"use client"
import { useSearchParams } from "next/navigation";
import LoaderWrapper from "../card/loader-wrapper";
import { MessageSuccess } from "../card/message-success";
import { MessageError } from "../card/message-error";
import { useEffect, useState } from "react";
import { newVerification } from "@/lib/actions";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";

export default function NewVerificationForm(){
    const [success, setSuccess] = useState<string|undefined|null>();
    const [error, setError] = useState<string|undefined|null>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token")||"";
    useEffect(()=>{
        newVerification(token)
        .then((data)=>{
            setSuccess(data.message);
            setError(data.error);
        })
        .catch(()=>{
            setError("Something went wrong.");
        })
    }, [])
    return(
        <div className="wrapper w-full mt-20 flex justify-center">
            <div className="flex flex-col items-center justify-between gap-8 w-full md:max-w-96 p-8 rounded-3xl bg-muted">
                <LoaderWrapper mode="manual" isLoading={!success&&!error}>
                    <MessageSuccess message={success}></MessageSuccess>
                    <MessageError message={error}></MessageError>
                </LoaderWrapper>
                {error && <Link href="/auth/login" className="text-primary hover:text-primary/80 text-sm mt-5">To login page</Link>}
                {success && <Link href={DEFAULT_LOGIN_REDIRECT} className="text-primary hover:text-primary/80 text-sm mt-5">To default login redirect</Link>}
            </div>
        </div>
    )
}