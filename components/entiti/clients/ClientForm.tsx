import { 
    Button, 
    Flex,
    useModalContext, 
     } from "@chakra-ui/react";
import axios from "axios";
import { env } from "Y/env.mjs";
import MyInput  from "../ui/input/MyInput"
import Myforms from "../ui/form/Myforms";
import MySelect from "../ui/selects/MySelect";
import { Client, ClientFormProps, ClientSchema, DOC_TYPES } from "schema/clienteSchema";



const ClientForm =({clientId }: ClientFormProps)=>{
    const { onClose } = useModalContext()
   
    const onSubmit = async(data: Client, reset: any): Promise<any>=>{
        try {
            const PARAMS = !!clientId ? `/${clientId}`: ""
           //esto es para saber si editamos o creamos un NUEVO cliente
            await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients${PARAMS}`, 
            {
                method: !!clientId ? "PUT" : "POST",
                data,
                withCredentials: true
            },
           )
        
            reset()// nos permite resetear el formulario, limpiar los campos
            onClose()   
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
     }
     const onError =()=> console.log("error")
     const algo = "algo"
     const setDefaultValues = async ()=>{
        try {
            if(!clientId) return {algo}
            const { data } = await axios.get(
                `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/${clientId}`,
                {withCredentials: true}
            )
            return data.data
            
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
       }
    return(
    <Myforms 
        onSubmit={onSubmit} 
        onError={onError} 
        zodSchema={ClientSchema}
        defaultValues={setDefaultValues}
    > 
        <MyInput<Client> fieldName="firstname" label="Nombre" />
        <MyInput<Client> fieldName="lastname" label="Apellido" /> 
        <MyInput<Client> fieldName="email" label="Email" /> 
        <Flex gap={3} mb={5}>

        <MySelect<Client> 
            fieldName="document_type" 
            label="Tipo doc" 
            options={DOC_TYPES} 
        />
        
        <MyInput fieldName="document_value" label="Documento" mb={0}/> 
        </Flex>
        <Button  colorScheme="purple" type="submit" mb={2}>
                 {!!clientId ? "Guardar cambios" : "Crear"}
        </Button>
    </Myforms>
 
    )
}

export default ClientForm;