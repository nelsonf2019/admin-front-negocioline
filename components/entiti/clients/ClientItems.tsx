import { Card, Text } from "@chakra-ui/react";
import { ClientFromDB } from "schema/clienteSchema";

interface Props{
    client: ClientFromDB
    onClick: (client: ClientFromDB)=> void
    selected?: boolean    
}

const ClientItems =({client, selected, onClick}:Props)=>{
    return(
        <Card key={client._id}
                 py={2}
                 px={4} 
                 cursor="pointer"
                 bg={selected ? "green.200" : "white"}
                 color={selected ? "white" : "black"}
                 _hover={ selected ? {} : { 
                    backgroundColor: "green.400", 
                    color:"white",
                    transition:".02s background-color ease-out, 0.2s color ease-out" }}
                onClick={()=> onClick(client)}
                flexDir="row"
                justifyContent="space-between"
                >
                 <Text>{client.firstname}, {client.lastname}</Text>
                 <Text color={selected ? "white" : "green"}> { (client.sale?.amount)?.toFixed(2) || 0 } </Text>
        </Card> 
    )
}

export default ClientItems;