import { Container, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ReactNode, Dispatch, SetStateAction, createContext, useState, useEffect } from "react"
import { TokenPayload } from "schema/AuthSchema"
//este es un componente global provaider


export interface IAuthContext{//creamos la interface, es decir las props que le vamos a pasar , un estado
    user: TokenPayload
    setUser: Dispatch<SetStateAction<TokenPayload>>// para setear el estdo de user se debe utilizar un dipatch
}


export const AuthContext = createContext<IAuthContext | null>(null)//creamos el context para poder utilizar en otros componentes

//voy a pasar las props a traves del children pasando los valores a través del estado
const AuthProvider =({children}:{children:ReactNode})=>{
   const [user, setUser] = useState<TokenPayload >(null)
   const [validating, setValidating] = useState(false)
   const router = useRouter()
    const PROTECTED_ROUTES = ["/"]//ruta protejida

    const validateRoute = (user: TokenPayload)=>{
        if(!user && PROTECTED_ROUTES.includes(router.pathname))//si el usario no esta en el estado ni en el localStorage
        //debe sacarme a la página principal
        router.push("/login")
        if(!!user && router.pathname === "/login"){
            router.push("/login")
        }
        setTimeout(()=>{
            setValidating(false)

        },5000)
    }
   //para poder encontrar el user en el localStorage
   useEffect(()=>{
        //CON ESTE CÓDIGO EVITAMOS QUE SI AL CERRAR SESIÓN Y HACEMOS CON LA FLECHA BACK DEL NAVEGADOR VUELVAL A LA PAGINA DE LOGIN
        //obtengo el user del localStorage
        const userFormLS = localStorage.getItem("user")//chequeamos si el user esta en el localStorage
        const userForState = !!userFormLS ? JSON.parse(userFormLS) : null
        setUser(userForState)// si existe lo setea
        validateRoute(userForState)

 
    if(router.pathname === "/login" ){
        router.push("/")
    }
   },[])
   if(validating) return (
   <Container
        width="20rem" 
        height="20rem" 
        margin="0 auto"// 0 arriba y cero abajo y auto a los costados
        alignItems="center" 
        justifyContent="center"
    >
    <Spinner colorScheme="purple" color="purple.400" size="lg" width="5rem" height="5rem"/>
   </Container>)
    return(
         <AuthContext.Provider value={{user, setUser}}>
            { children }
         </AuthContext.Provider>
    )
}

export default AuthProvider;