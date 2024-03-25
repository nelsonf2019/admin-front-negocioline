import { Card, Flex, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { env } from "Y/env.mjs"
import axios from "axios"
import { useRouter } from "next/router"
import { ProductFormDB } from "schema/ProducSchema"
import ProductItems from "./ProductItems"

interface Props{
    searchText?: string | undefined
    onClick: (product: ProductFormDB)=> void
    selectedProducts?: string[]
}

const ProductsList =({searchText, onClick, selectedProducts}:Props)=>{

    const PARAMS = !!searchText ? `?searchText=${searchText}` : ""

    const {
            data: products, 
            isLoading,
        } =  useQuery<ProductFormDB[]>({
        queryKey:["products", searchText], 
        queryFn: async ()=>{                             //PARA BUSCAR POR EL NOMBRE DEL PRODUCTO EN EL BUSCADOR MODAL ProductSearcher
        const res = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/products${PARAMS}`,
        {withCredentials:true})//para que nos permite pasar a traves de Credentials
        return res.data.data //esta data.data de axios
        }})
        if(isLoading) return <Spinner />
        if(!products) return  <Text mb={5}>No hay ventas para mostrar</Text>
        const router = useRouter()
    return(
        <Flex 
        flexDirection="column" 
        p={1}
        gap={2} 
        mt={4} 
        my={4}
        maxHeight="40vh" 
        overflowY="scroll">
        {products
             .map((p)=>(
                <ProductItems  
                    product={p}
                    onClick={onClick} 
                    selected={selectedProducts?.includes(p._id)}
                />
            ))
        }
    </Flex>
    )
}

export default ProductsList