import { Box, Button, Flex, Input } from "@chakra-ui/react";
import ProductsList from "./ProductsList";
import { useRef, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { ProductFormDB } from "schema/ProducSchema";
import { useFieldArray, useFormContext } from "react-hook-form";

const ProductSearcher =()=>{
    const { getValues, control } = useFormContext()
    const { append } = useFieldArray({control, name: "product",}); // unique name for your Field Array
    const [searchText, setSearchText] = useState<string | undefined>("")
    //al seleccionar el item de productos se va agregando a un arreglo
    const [selectedProducts, seteSelectProduct] = useState<string[]>([])
    const handleClick =(product: ProductFormDB)=>{
        console.log(product)
        const alreadyIncluded = selectedProducts.includes(product._id)//incluimos los productos que tengan el id
        //preguntamos si existe ese id
        if(!alreadyIncluded){
            seteSelectProduct([...selectedProducts, product._id])// va seteando, es decir va agregando el producto y caopiando los productos anteriores
        }else{
            seteSelectProduct(selectedProducts.filter((prodId) => prodId !== product._id))
        }
    }
    const handleSelect =()=>{
        console.log({selectedProducts})
    }
    const inputRef = useRef<HTMLInputElement>(null)
    return (
       
            <form onSubmit={()=> setSearchText(inputRef?.current?.value)}>
                 <Flex alignItems="center" gap={2}> 
                    <Input
                        flex={4} 
                        ref={inputRef}
                        placeholder="Buscar por codigo o nombre..."
                        onChange={(e)=>setSearchText(e.target.value)}
                    />
                    <Button type="submit">
                        <Search2Icon flex={1}/>
                    </Button>
                 </Flex>
                <ProductsList 
                    searchText={searchText} 
                    onClick={handleClick} 
                    selectedProducts={selectedProducts}
                    /> 
                <Button colorScheme="green" isDisabled={selectedProducts.length === 0} onClick={handleSelect}>
                    Finalizar selección
                </Button>          
            </form>
    )
}

export default ProductSearcher;