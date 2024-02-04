import { useState } from "react";
import { useFormStatus } from "react-dom";
import BeatLoader from "react-spinners/BeatLoader";

export default function LoaderWrapper({
    children,
    mode,
    isLoading
}: {
    children: React.ReactNode,
    mode: "form"|"manual",
    isLoading?: boolean
}){
    const { pending } = useFormStatus();
    return(
        <div className="flex flex-col justify-center items-center gap-2">
            {pending && mode==="form" && <BeatLoader loading={true}></BeatLoader>}
            {!pending && mode==="form" && children}
            {isLoading && mode==="manual" && <BeatLoader loading={true}></BeatLoader>}
            {!isLoading && mode==="manual" && children}
        </div>
    )
}