import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { env } from "Y/env.mjs";
import axios from "axios";
 
import { useRouter } from "next/router";
import { ClientFromDB } from "schema/clienteSchema";
import ClientItems from "./ClientItems";



interface Props{
    onClick: (client: ClientFromDB) => void
    selectedClientId: string | undefined
}


const ClientsList =({onClick, selectedClientId}: Props)=>{
    const {data: clients, isLoading} = 
    useQuery<ClientFromDB[]>({queryKey:["clients"], queryFn: async ()=>{
    const res = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`,
    {withCredentials:true})//para que nos permite pasar a traves de Credentials
    return res?.data?.data //esta data es data de axios
    }})
    
    if(isLoading) return <Spinner />
    if(!clients) return  <Text mb={5}>No hay clientes para mostrar</Text>
    const router = useRouter()
    return(
        <Flex flexDirection="column"
        p={1}
        gap={2} 
        mt={4} 
        my={4}
        maxHeight="40vh" 
        overflowY="scroll"
        >
            {clients
                 .sort((a,b)=> (b.sale?.amount || 0) -(a.sale?.amount || 0))
                 .map((c)=>(
                    <ClientItems  
                        key={c._id}
                        client={c}
                        onClick={onClick}
                        selected={c._id === selectedClientId}
                    /> 
                ))
            }
        </Flex>
    )
}

export default ClientsList;