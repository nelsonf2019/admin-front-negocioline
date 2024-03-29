import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z, AnyZodObject } from "zod";
import { DefaultValues,FieldValues } from "react-hook-form/dist/types";
import { ReactNode } from "react";
import { DevTool } from "@hookform/devtools";
import { Flex, Spinner, useDisclosure } from "@chakra-ui/react";

//creamos el itnerface de las props en el componente
interface props {                                   
    zodSchema: AnyZodObject                             
    onSubmit: (data: any, reset: any)=> void
    onError: (data: FieldValues)=> void
    children: ReactNode
    defaultValues?: DefaultValues<FieldValues>  
    
}

const Myforms =({ defaultValues = {}, 
    zodSchema, 
    onSubmit, 
    onError, 
    children,
     
    }: props) =>{
       
    type EntityType = z.infer<typeof zodSchema>
    const methods = useForm<EntityType>({
        resolver: zodResolver(zodSchema),// zod resolver lo recibimos por params, para que me tome las validaciones 
        defaultValues,
    })

    if(methods.formState.isLoading) return(
        <Flex alignItems="center" justifyContent="center">
            <Spinner alignSelf="center"/>
        </Flex>
     ) 

    return (
        <FormProvider {...methods}>
             <form 
                onSubmit={methods.handleSubmit(
                (data) => onSubmit(
                        data, 
                        methods.reset
                        ), 
                        onError)}>
                {children}
             </form>
             <DevTool control={methods.control} /> set up the dev tool
        </FormProvider>
    )
}

export default Myforms;
