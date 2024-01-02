import { Card, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface VentaFromDB  {
    _id: string
    total_amount: number
    client: string
}

interface Props {
    ventas: Array<VentaFromDB>
}

const VentasList =({ ventas }: Props)=>{
    const router = useRouter()
    return(
        <Flex flexDirection="column" gap={2} mt={4}>
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