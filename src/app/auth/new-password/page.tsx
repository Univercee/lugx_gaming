import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";


export default function Page(){
    return(
        <div>
            <Suspense>
                <NewPasswordForm></NewPasswordForm>
            </Suspense>
        </div>
    )
}