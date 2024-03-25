import { CheckIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, useToast } from "@chakra-ui/react"
import axios from "axios"
import { Router, useRouter } from "next/router"
import { env } from "process"
import { useFormContext } from "react-hook-form"

export const LoginButtons =()=>{
    const router = useRouter()
    const toast = useToast()  //uso este use de chackra UI para mostar mensajes al usuario
    const {getValues} = useFormContext()
    return(
        <ButtonGroup marginTop={8}>
                        <Button
                            type="submit"
                            onClick={()=>{
                                const {email, code} = getValues()
                                 console.log({email, code})
                                axios.post(
                            `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`, { code },
                            { withCredentials: true }
                        )
                        .then(({data})=>{
                            localStorage.setItem("user", JSON.stringify(data.data))//OBTIENE LA KOKIE DE GOOGLE
                            router.push("/")
                        })
                        .catch((error)=> console.log(error))
                         }}>Iniciar sesión</Button>
                         <Button
                            onClick={()=>{
                            const email = getValues("email")
                            axios.post(
                                
                                `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`
                            )
                            .then(({data})=>{
                                console.log(email)
                                console.log(data)
                                toast({description: data.message, status: "success", icon:<CheckIcon />, position: "top" })
                            })
                            .then(console.log)
                        }}
                        >Quiero un código
                        </Button>
        </ButtonGroup>
    )
}