import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormStatus } from "react-dom";

export function MessageSuccess({ message }: { message?: string|null }){
    const { pending } = useFormStatus();
    const active = message && !pending;
    return (
        <div className={`flex items-center w-full p-4 rounded-xl bg-success/10 text-success ${active?"":"hidden"}`}>
            <p className="font-medium"><FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon> {message}</p>
        </div>
    )
}