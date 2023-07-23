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

//construimos un esquemas para la validaciones con zoo
const schema = z.object({
    //para validar le debemos poner el tipo de datos
    email: z.string().email("Email invalid"), //recibe tambien mensaje de error
    code: z.string().length(6, "El código debe tener 6 caracteres")
})
//inferir tipos de datos con zod, generados por zod
type FieldValues = z.infer<typeof schema> //inferimos el tipo de datos
// interface FieldValues{
//     email: string
//     code: string
// }
const Login: NextPage =()=>{
    //errores que tambien tiene react hook form
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        resolver: zodResolver(schema),
        defaultValues:{email:"nelsonfercher@gmail.com"} //seteamos un email por defecto
        })//HACE EL CONTROL DE DATOS DE LOS INPUT VALIDACION con resolver y zood
    const router = useRouter()
    //REGISTER TOMAS LOS DATOS Y GETVALUES LOS LEE
    const onSubmit=()=>{
        const {email, code} = getValues()
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
    const onErrors = () => {
        console.log({errors})
    }
    return(
        <Container marginTop={10}>
            <Heading textAlign={"center"}>Iniciar sesión</Heading>
            <Card padding={3} maxWidth="">
                <form onSubmit={handleSubmit(onSubmit, onErrors)}>
                                             {/* Esto es si el email tiene algo */}
                <FormControl marginBottom={5} isInvalid={!!errors.email}> {/* 1.rem  !! es negación en booleano */}  
                    <FormLabel>Email</FormLabel>
                        <Input
                        type='text'
                        placeholder="Ingresa tu email"
                        {...register("email")}// ESTO ES COMO HACER onBlur={onBlur} y asi
                        // hacemos un desctructuring de los datos y queda listo
                         />
                         {/* para validar los input */}
                         <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>      
                <FormControl isInvalid={!!errors.code}>
                    <FormLabel>Código</FormLabel>
                        <Input
                        type='number'
                        placeholder="Ingresa tu código"
                        {...register("code",{ required: true, maxLength: 6 })}// ESTO ES COMO HACER onBlur={onBlur} y asi
                        />
                         <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
                </FormControl>
                <ButtonGroup marginTop={8}>
                    <Button
                        type="submit"
                        onClick={()=>{


                    }}>Iniciar sesión</Button> <Button
                    onClick={()=>{
                        const email = getValues("email")
                        axios.post(
                            `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`
                        )
                        .then(console.log)
                        .then(console.log)
                    }}
                    >Quiero un código</Button>
                </ButtonGroup>
                </form>
            </Card>
        </Container>
    )
}
export default Login;