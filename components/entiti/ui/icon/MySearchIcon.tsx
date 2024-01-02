import { SearchIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import axios from "axios"
import { env } from "process"
import { useFormContext } from "react-hook-form"
import { Product } from "schema/SaleSchema"

 
interface Props{
    index: number
}

export const MySearchIcon =({index}: Props)=>{
    const { getValues, setValue } = useFormContext();

    return(
        <IconButton
            colorScheme='blue'
            aria-label='Search'
            icon={<SearchIcon />}
            onClick={ async ()=>{
                const code = getValues(`products.${index}.code`)
                if(!code) return alert("Tenes que poner un codgo")
                const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${code}`, 
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
    )
}