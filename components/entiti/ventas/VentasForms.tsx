import {
    Card,
    Flex,
     Heading,
     Divider,
     Text,
     } from "@chakra-ui/react"; 
import axios from "axios";
import { env } from "Y/env.mjs";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {  ProductFormProps, Sale, saleSchema } from "schema/SaleSchema";
import Myforms from "../ui/form/Myforms";
import MyInput from "../ui/input/MyInput";
import ProductAdder from "./ProductAdder";
import PaymentMethodAdder from "./PaymentMethodAdder";
import MyAdderButton from "../ui/buttons/MyAdderButton";
import SaleFormButtons from "./SaleFormButtons";
import MyModal from "../ui/modals/MyModal";
import ProductSearcher from "../products/ProductSearcher";
 

const SaleForm =({ saleId }: ProductFormProps)=>{
    const [ totalAmount, setTotalAmount ] = useState(0)
    
    const [foundClient, setfoundClient,] = useState<{ 
        _id: string, 
        firstname: string } | null >(null);

    const router = useRouter()
    const onSubmit = async(data: Sale, reset: any)=>{
        if(!foundClient) return
        const PARAMS = !!saleId ? `/${saleId}`: ""
       //esto es para saber si editamos o creamos un NUEVO cliente
        const res = await axios(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/ventas${PARAMS}`,
        {
            method: !!saleId ? "PUT" : "POST",
            data: {...data, client: foundClient._id, total_amount: totalAmount},
            withCredentials: true
        },
       )
        reset()// nos permite resetear el formulario, limpiar los campos
        console.log({res})
        router.push("/")//vuelve al inicio una vez hecha la venta o la actualzacion
     }
     const onError = ()=>console.log("errors")

     const setDefaultValues = async ()=>{
        if(!saleId) return {
            //si no hay saleId retornamos valores por defectos
                operation_date: new Date(), 
                // payment_methods: [DEFAULT_VALUES["payment_method"] as PaymenMethod],
                // products:[DEFAULT_VALUES["products"] as PaymenMethod],
            }  
        const { data } = await axios.get(
            `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/ventas${saleId}`,
            {withCredentials: true}//con credenciales para que pase la coockies
        )
       // console.log({data})
        return data.data//retornamos los datos que nos viene desdel backend
    }




     console.log({ totalAmount })
    return(
        <>
        <Myforms 
            onSubmit={onSubmit} 
            onError={onError} 
            zodSchema={saleSchema} 
            defaultValues={setDefaultValues}
        >
            <Flex gap={3} alignItems="center">
               <MyInput<Sale> 
                fieldName="client_document" 
                label="Documento del cliente"
                searchFn={async (document)=>{
                     if(!document) return alert("Tenes que poner un codgo")
                     const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/document/${document}`, 
                     { withCredentials: true }
                     )                                                        
                        setfoundClient(data.data)  
                     console.log({ data })
                 }}
                />
            </Flex>
                    {!!foundClient && (
                        <Card mb={5} p={3}>
                             <Text>{ foundClient.firstname }</Text>
                        </Card> 
                        )}
             <MyInput<Sale> 
                fieldName="operation_date" 
                label="Fecha de la operación"
                type="date"
                valueAsDate
             />
            <Flex alignItems="center" justifyContent={"space-between"} mt="8">
                    <Heading size="md">Productos</Heading>
                    <Heading size="md">Forma de pago</Heading>
                <MyAdderButton fieldName="products" />
            </Flex>
            <Divider mb="3" mt="2" />
            <ProductAdder fieldName="products"/>
            <Divider mb="3" mt="2" />
            <Flex alignItems="center" justifyContent={"space-between"} mt="1">
                <Heading size="md">Forma de pago</Heading>
                {/* <MyAdderButton fieldName="payment_methods"/> */}
                <MyModal 
                    title="Eligir productos" 
                    buttonText="Agregar"
                    size="xs"
                > <ProductSearcher /> </MyModal>
            </Flex>
                    {/* //Metodo de pago */}
            <PaymentMethodAdder fieldName="payment_methods" />
            <SaleFormButtons saleId={saleId}/>
        </Myforms>
        </>
    )
}

export default SaleForm;