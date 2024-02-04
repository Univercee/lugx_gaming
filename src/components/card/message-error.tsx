import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormStatus } from "react-dom";

export function MessageError({ message }: { message?: string|null }){
    const { pending } = useFormStatus();
    const active = message && !pending;
    return (
        <div className={`flex items-center w-full p-4 rounded-xl bg-danger/10 text-danger ${active?"":"hidden"}`}>
            <p className="font-medium"><FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon> {message}</p>
        </div>
    )
}