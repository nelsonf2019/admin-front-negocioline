import { Card, Flex, Text } from "@chakra-ui/react";
 
import { useRouter } from "next/router";
import { ClientListProps } from "schema/clienteSchema";





const ClientsList =({ clients }: ClientListProps)=>{
    const router = useRouter()
    return(
        <Flex flexDirection="column" gap={2} mt={4}>
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