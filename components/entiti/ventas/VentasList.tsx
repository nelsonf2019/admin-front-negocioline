import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { env } from "Y/env.mjs";
import axios from "axios";
import { useRouter } from "next/router";

interface VentaFromDB  {
    _id: string
    total_amount: number
    client: string
}

const VentasList =()=>{
    const {
        data: ventas, 
        isLoading,
      } =  useQuery<VentaFromDB[]>({queryKey:["ventas"], queryFn: async ()=>{
        const res = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/ventas`,
        {withCredentials:true})//para que nos permite pasar a traves de Credentials
        return res.data.data //esta data.data de axios
        }})
    const router = useRouter()
    if(isLoading) return <Spinner />
    if(!ventas) return  <Text mb={5}>No hay ventas para mostrar</Text>

    return(
        <Flex 
            flexDirection="column" 
            p={1}
            gap={2} 
            mt={4} 
            my={4}
            maxHeight="40vh" 
            overflowY="scroll">
            {ventas
                 .sort((a,b)=> (b?.total_amount || 0) -(a?.total_amount || 0))
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
                      <Text>{c.client}</Text>
                      <Text> { (c?.total_amount)?.toFixed(2) || 0 } </Text>
                    </Card>             
                ))
            }
        </Flex>
    )
}

export default VentasList;