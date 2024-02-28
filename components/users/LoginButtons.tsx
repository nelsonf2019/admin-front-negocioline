import { CheckIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, useToast } from "@chakra-ui/react"
import axios from "axios"
import { env } from "process"
import { useFormContext } from "react-hook-form"

export const LoginButtons =()=>{
    const toast = useToast()  //uso este use de chackra UI para mostar mensajes al usuario
    const {getValues} = useFormContext()
    return(
        <ButtonGroup marginTop={8}>
                        <Button
                            type="submit"
                            onClick={()=>{
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
                                toast({description: data.message, status: "success", icon:< CheckIcon />, position: "top" })
                            })
                            .then(console.log)
                        }}
                        >Quiero un código
                        </Button>
        </ButtonGroup>
    )
}