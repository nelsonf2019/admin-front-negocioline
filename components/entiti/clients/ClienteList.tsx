import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { env } from "Y/env.mjs";
import axios from "axios";
 
import { useRouter } from "next/router";
import { ClientFromDB } from "schema/clienteSchema";





const ClientsList =()=>{
    const {data: clients, isLoading} = 
    useQuery<ClientFromDB[]>({queryKey:["clients"], queryFn: async ()=>{
    const res = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`,
    {withCredentials:true})//para que nos permite pasar a traves de Credentials
    return res.data.data //esta data es data de axios
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
                    <Card key={c._id}
                     py={2}
                     px={4} 
                     cursor="pointer" _hover={{ 
                        backgroundColor:"green.400", 
                        color:"white",
                        transition:".02s background-color ease-out, 0.2s color ease-out" }}
                    onClick={()=> router.push(`/clients/${c._id}`)}
                    flexDir="row"
                    justifyContent="space-between"
                    >
                      <Text>{c.firstname}, {c.lastname}</Text>
                      <Text> { (c.sale?.amount)?.toFixed(2) || 0 } </Text>
                    </Card>             
                ))
            }
        </Flex>
    )
}

export default ClientsList;