import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { MySearchIcon } from "../ui/icon/MySearchIcon";
import { Flex, Text } from "@chakra-ui/react";
import MyInput from "../ui/input/MyInput";
import MyDeleteIcon from "../ui/icon/MyDeleteIcon";
import { Product, Sale } from "schema/SaleSchema";
import { useEffect } from "react";
import axios from "axios";
import { env } from "process";

interface Props{
    fieldName: keyof Sale

}


function ProductAdder({ fieldName }: Props){

    const { setValue, getValues, watch } = useFormContext()
    const products = watch(fieldName)

    useEffect(()=>{
        if(products?.length > 0){
            let amount = products.reduce(
                (prev: any, current: any)=> prev + current.qty * current.unit_price, 0)
          //  setTotalAmount(amount)
            setValue(`payment_methods.0.amount`, amount)
            //console.log({ currentProdcuts })

        }
     },[products])
     if(!products || products.length === 0){
        return <Text mb={5}>No se ha agregado ningún producto</Text>
     }
    return(
        <Flex   
            flexDir="column"
            alignItems="flex-start">
        {products.map((product:Product, index: number)=>
            <Flex
                key={product.code} 
                gap={3} 
                alignItems="center" 
                mb={2} 
                justifyContent="space-between"
                width="100%"
                >      
             <Text flex={6}>{product.name}</Text>    
             <Flex alignItems="center" gap={2} flex={2}> {/*Nombre descriptivo del productoi */}
                <MyInput  
                
                    fieldName={`products.${index}.qty`} 
                    label="Cantidad" 
                    mb={0}
                    size="sm"
                    showLabel={false}
                    valueAsNumber
                />
                <MyDeleteIcon<Sale> fieldName="products" index={index} />{/**ubicacion del incono del tachito */}
             </Flex>
        </Flex>)}
        {/* <Button onClick={()=> addProduct(defaultProduct)}> Nuevo producto </Button> */}
    </Flex>
    )
}

export default ProductAdder;