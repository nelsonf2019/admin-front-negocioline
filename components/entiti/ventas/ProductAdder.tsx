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
        <Flex flexDir="column" mb={4}>
        {products.map((product:Product, index: number)=>
            <Flex gap={3} alignItems="flex-end">
                <MyInput 
                    fieldName={`products.${index}.code`} 
                    label="Código" 
                    showLabel={index === 0} 
                    searchFn={ async (code)=>{
                        console.log(code)
                        if(!code) return alert("Tenes que poner un codgo")
                        const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products${code}`, 
                        { withCredentials: true }
                        )
                       
                        const product: Product = data.data
                    // console.log({product})
                        const { 
                            supplier_cost, 
                            micro, 
                            iva, 
                            profit_margin, 
                            salvament_cost
                        } = product
                        const baseCost = micro + supplier_cost
                        const minimumCost = baseCost / ( 1 -salvament_cost)
                        const finalPrice = Number((minimumCost / ( 1- profit_margin)).toFixed(3))
                    // console.log({ finalPrice })
                        if(!!product){
                        
                            setValue(`products.${index}`, {
                                code: code,
                                name:product.name,
                                qty:1,
                                unit_price: finalPrice,
                            })  
                        }else{
                            return alert("Tenes que poner un codgo")
                        }
                    //  console.log({ data })
                    }}
                />
                <MyInput 
                    fieldName={`products.${index}.name`} 
                    label="Denominación" 
                    showLabel={index === 0}
                />            
                <MyInput 
                    fieldName={`products.${index}.qty`} 
                    label="Cantidad" 
                    showLabel={index === 0}
                    valueAsNumber
                />
                <MyDeleteIcon<Sale> fieldName="products" index={index} />
        </Flex>)}
        {/* <Button onClick={()=> addProduct(defaultProduct)}> Nuevo producto </Button> */}
    </Flex>
    )
}

export default ProductAdder;