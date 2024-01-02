import {
    Container,
    Heading,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    ButtonGroup,
    FormErrorMessage
} from "@chakra-ui/react"
import { type NextPage } from "next";
import { useForm } from 'react-hook-form';
import axios from "axios"
import { env } from "Y/env.mjs";
import { useRouter } from "next/router";
import { isValid, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import  Myforms  from "../../components/entiti/ui/form/Myforms"
import MyInput  from "components/entiti/ui/input/MyInput";
import { LoginButtons } from "components/users/LoginButtons";
import { Login, LoginSchema } from "schema/AuthSchema";

const Login: NextPage =()=>{
   const router = useRouter()
    //REGISTER TOMAS LOS DATOS Y GETVALUES LOS LEE
    const onSubmit=(data: Login)=>{
        const {email, code} = data
        console.log({email, code})
         axios.post(
                            `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`, { code },
                            { withCredentials: true }
                        )
                        .then(({data})=>{
                            router.push("/")
                        })
                        .catch((error)=> console.log(error))
    }
    const onError = (errors: any) => {
        console.log({errors})
    }
    return(
        <Container marginTop={10}>
            <Heading textAlign={"center"}>Iniciar sesión</Heading>
            <Card padding={3} maxWidth="">
                <Myforms 
                    defaultValues={{email:"nelsonfercher@gmail.com"}}   
                    zodSchema={LoginSchema} 
                    onSubmit={onSubmit} 
                    onError={onError}
                    >
                    {/* Esto es si el email tiene algo */}
                   <MyInput fieldName="email" label="Email" />   
                   <MyInput fieldName="code" label="Código" /> 
                   <LoginButtons />  
                </Myforms>
            </Card>
        </Container>
    )
}
export default Login;