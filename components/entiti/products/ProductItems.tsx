import { Card, Text } from "@chakra-ui/react";
import { ProductFormDB } from "schema/ProducSchema";

interface Props{
    product: ProductFormDB
    onClick: (product: ProductFormDB)=> void
    selected?: boolean    
}

const ProductItems =({product, selected, onClick}:Props)=>{
    return(
        <Card key={product._id}
                 py={2}
                 px={4} 
                 cursor="pointer"
                 bg={selected ? "green.200" : "white"}
                 color={selected ? "white" : "black"}
                 _hover={{ 
                    backgroundColor: "green.400", 
                    color:"white",
                    transition:".02s background-color ease-out, 0.2s color ease-out" }}
                onClick={()=> onClick(product)}
                flexDir="row"
                justifyContent="space-between"
                >
                  <Text>{product.name}</Text>
                  <Text> { product.supplier_cost || 0 } </Text>
        </Card> 
    )
}

export default ProductItems;