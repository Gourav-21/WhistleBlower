"use client"
import { generateRandomUsername } from "@/components/functions";
import { useEffect } from "react";

export default function Secretname(){

    useEffect(() => {
        if(localStorage.getItem('SecretName') === null) {
          const randomUsername = generateRandomUsername();
          localStorage.setItem('SecretName', randomUsername)
        }
        console.log(localStorage.getItem('SecretName'))
      }, [])

    return(
        <>
        </>
    )
}