import { Avatar, Button, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import useAuth from "./useAuth"

const AuthHeader =()=>{
    const context = useAuth()
    const router = useRouter()

    return(
        <Flex justifyContent="space-between" alignContent="center" mb={8}>
            <Avatar src="/images.png"/>
            <Button
            colorScheme='blue' 
            mb={2}
            onClick={()=>{
                    router.push("/login")
            }}>Iniciar sesion</Button>
        </Flex>
    )
}

export default AuthHeader