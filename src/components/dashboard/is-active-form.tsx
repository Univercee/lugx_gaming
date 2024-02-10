"use client"
import { setGameIsActive } from "@/lib/actions/game";
import { useFormState } from "react-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import LoaderWrapper from "../card/loader-wrapper";

export function UpdateIsActivrForm({id, __isActive}: {id: string, __isActive: boolean}){
    const [isActive, setIsActive] = useState(__isActive);
    const initialState = { message: "" };
    const formRef = useRef({} as HTMLFormElement);
    const [state, dispatch] = useFormState(setGameIsActive, initialState);
    function onChange(e: ChangeEvent<HTMLInputElement>){
        if(formRef.current){
            const form = formRef.current;
            form.requestSubmit();
        }
        setIsActive(e.target.checked);
        
        const formData = new FormData();
        formData.append("id", id);
        formData.append("isActive", `${e.target.checked}`);
        dispatch(formData);
        
    }

    useEffect(()=>{
        if(state.error){
            setIsActive(!isActive);
        }
        
    },[state])
    return (
        <div className="flex flex-col">
            <form action={dispatch} className="w-full" ref={formRef}>
                <LoaderWrapper mode="form">
                    <input type="text" name="id" value={`${id}`} disabled hidden/>
                    <input type="checkbox" name="isActive"  checked={isActive} onChange={onChange}/>
                </LoaderWrapper>
            </form>
        </div>
    )
}