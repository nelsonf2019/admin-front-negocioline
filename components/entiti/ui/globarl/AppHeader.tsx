import { Avatar, Button, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import useAuth from "../../../../src/hooks/useAuth"
import { useContext } from "react"

const AuthHeader =()=>{
    const {user, setUser } = useAuth()
    console.log({user})
    const router = useRouter()
    //preguintamos si hay user, si lo hay mostramos el boton de inicio de sesión
    return(
        <Flex justifyContent="space-between" alignContent="center" mb={8}>
            <Avatar src="/images.png"/>
        {   !user && (
            <Button
            colorScheme='blue' 
            mb={2}
            onClick={()=>{
                    router.push("/login")
            }}>Iniciar sesion</Button>
        )
        }
        {!!user && 
            <Flex gap={2}>
                <Avatar src={user?.imageUrl} />
                <Button
                    size="sm"
                    colorScheme='red' 
                    mb={2}
                    onClick={()=>{
                    localStorage.removeItem("user")//removemos el user
                    setUser(null)//seteamos el usuario del localStorage
                                    //que el jwt este vacío y que expire en un tiempo pasado
                    document.cookie = "jwt=;expires=thu, 01 Jan 1970 00:00:01 GMT;"//elimina el user del localStorage
                    router.push("/login")
            }}>Iniciar sesion</Button>
            </Flex>
        }
        </Flex>
    )
}

export default AuthHeader