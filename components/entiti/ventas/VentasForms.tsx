import {
    Button,
    Card,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
     Heading,
     Input,
     Select,
     Spinner,
     IconButton,
     Divider,
     Text,
     } from "@chakra-ui/react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { env } from "Y/env.mjs";
import { useRouter } from "next/router";
import { DevTool } from "@hookform/devtools";
import DatePicker from "react-datepicker";
import { use, useEffect, useState } from "react";
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import "react-datepicker/dist/react-datepicker.css";
 

//para incluir en desplegable los metodos de pago
const PAYMENT_METHOD_TYPES = [
    "efectivo",
    "tarjeta de credito",
    "tarjeta de debito",
    "cuenta corriente",
    "transferencia"

] as const

const TIME_UNITS = z.enum(["Días","Meses","Año"])

//esquema para el array productos
const saleProductSchema = z.object({
    code: z.string(),
    name: z.string().optional(),
    qty: z.number(),
    unit_price: z.number(),
    discount: z.number().optional(),
})
//esquema para el metodo de pago
const salePaymentMethodSchema = z.object({
    method: z.enum(PAYMENT_METHOD_TYPES),// ya el arreglo esta definido arriba por lo tanto se pone enum
    amount: z.number(),
    time_unit: TIME_UNITS,
    time_value: z.number()
})
//
const saleSchema = z.object({
        //para validar le debemos poner el tipo de datos
        operation_date: z.date(),
        client_document: z.string(),
        products: z.array(saleProductSchema),
        payment_methods: z.array(salePaymentMethodSchema)//el motodo de pago

})

//exportamos el datos sale y lo inferimos como tipo de dato schema
export type Sale = z.infer<typeof saleSchema> //inferimos el tipo de datos
type PaymenMethod = z.infer<typeof salePaymentMethodSchema>
type ProductForState = z.infer<typeof saleProductSchema>

interface Product extends ProductForState{
    supplier_cost: number   
    micro: number   
    iva: number 
    salvament_cost: number 
    profit_margin: number 
}

interface Props{
    saleId?: string //lleva ? porque es opcional
}

const defaultPM: PaymenMethod = {
        method:"efectivo", 
        amount:0, 
        time_unit:"Meses", 
        time_value:0       
}
const defaultProduct: ProductForState = {
    code:"", 
    name:"Denomicacón",
    qty:0, 
    unit_price:0,
}

const saleForm =({ saleId }: Props)=>{
    const [ totalAmount, setTotalAmount ] = useState(0)
    const [foundClient, setfoundClient,] = useState<{ 
        _id: string, 
        firstname: string } | null >(null);
    const {
        register,
        reset,
        getValues,
        control,
        setValue,
        handleSubmit,
        formState: { errors, isLoading }
    } = useForm<Sale>({
        resolver: zodResolver(saleSchema),// zod resolver, para que me tome las validaciones
        defaultValues: async ()=>{
            if(!saleId) return {
                operation_date: new Date(), 
                payment_methods: [defaultPM],
                products:[defaultProduct],
     }  
            const { data } = await axios.get(
                `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/ventas${saleId}`,
                {withCredentials: true}
            )
           // console.log({data})
            return data.data
        }
    })
    const productState = useWatch({
        control,
        name:"products",
    })

    const { fields, append, remove} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "payment_methods", // unique name for your Field Array
    });
    const { fields: products, append:addProduct, remove: removeProduct} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "products", // unique name for your Field Array
    });


    const router = useRouter()
    const onSubmit = async(data: Sale)=>{
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
     const onError = ()=>console.log(errors)
     useEffect(()=>{
        const currentProdcuts = getValues("products")
        if(currentProdcuts?.length > 0){
            let amount = currentProdcuts.reduce(
                (prev, current)=> prev + current.qty * current.unit_price, 0)
            setTotalAmount(amount)
            setValue(`payment_methods.0.amount`, amount)
            //console.log({ currentProdcuts })

        }
     },[productState])

     if(isLoading) return(
        <Flex alignItems="center" justifyContent="center">
            <Spinner alignSelf="center"/>
        </Flex>

     )
     console.log({ totalAmount })
    return(
        <>
        <form onSubmit={handleSubmit(onSubmit,  onError)}>
            <FormControl marginBottom={5} isInvalid={!!errors.client_document}> {/* 1.rem  !! es negación en booleano */}
                    <FormLabel>Documento del cliente</FormLabel>
                    <Flex gap={3}>
                    <IconButton
                        colorScheme='blue'
                        aria-label='Search database'
                        icon={<SearchIcon />}
                        onClick={ async ()=>{
                            const document = getValues(`client_document`)
                            if(!document) return alert("Tenes que poner un codgo")
                            const { data } = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients/document/${document}`, 
                            { withCredentials: true }
                            )
                           
                            
                               
                                setfoundClient(data.data)  
               
     
                     
                            console.log({ data })
                        }}/>
                        <Input
                        type='text'
                        placeholder="Ingresa tu nombre"
                        {...register("client_document")}// ESTO ES COMO HACER onBlur={onBlur} y asi
                        // hacemos un desctructuring de los datos y queda listo
                        />
                    </Flex>
                    {!!foundClient && (
                        <Card mt={3} p={3}>
                             <Text>{ foundClient.firstname }</Text>
                        </Card> 
                        )}
                          {/* para validar los input */}
                            <FormErrorMessage>{errors.client_document?.message}</FormErrorMessage>
            </FormControl>
            <FormControl marginBottom={5} isInvalid={!!errors.operation_date}> {/* 1.rem  !! es negación en booleano */}
                    <FormLabel>Fecha de la operación</FormLabel>
                    {/* <DatePicker selected={startDate}
                      ref={register("operation_date").ref}
                      onChange={(date: Date) => setValue("operation_date", date)} 
                    /> */}
                    <Input type="date" {...register("operation_date", { valueAsDate: true })} />
                    <FormErrorMessage>{errors.operation_date?.message}</FormErrorMessage>
            </FormControl>
            <Flex alignItems="center" justifyContent={"space-between"} mt="8">
                <Heading size="md">Productos</Heading>
                <Button
                    size="xs"
                    fontSize="1rem"
                    lineHeight="1rem"
                    py={4}
                    colorScheme="blue"
                    onClick={()=> addProduct(defaultProduct) }
                >
                    Agregar
                </Button>
            </Flex>
            <Divider mb="3" mt="2" />
            <Flex flexDir="column" mb={4}>
                {products.map((field, index)=>
                <Flex gap={3} alignItems="flex-end" mb={5}>
                      <IconButton
                        colorScheme='blue'
                        aria-label='Search database'
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
                        }}/>
                <FormControl flex={2} > {/* 1.rem  !! es negación en booleano */}
                {index === 0 && <FormLabel>Códgo</FormLabel>}
                                <Input
                                type='text'
                                placeholder="Código"
                                {...register(`products.${index}.code`)}// ESTO ES COMO HACER onBlur={onBlur} y asi
                                // hacemos un desctructuring de los datos y queda listo
                                />
                </FormControl>
                    {/* //Plazo */}
                <FormControl flex={6}> {/* 1.rem  !! es negación en booleano */}
                { index === 0 && <FormLabel>Denominación</FormLabel> }
                                <Input
                                type='text'
                                placeholder="Denominación"
                                {...register(`products.${index}.name`)}// ESTO ES COMO HACER onBlur={onBlur} y asi
                                // hacemos un desctructuring de los datos y queda listo
                                disabled
                                />
                </FormControl>                      
                <FormControl flex={2} >
                    <Flex alignItems="center" justifyContent="space-between" >
                    { index === 0 &&  <FormLabel>Cantidad</FormLabel> }
                     {fields.length > 0 && (
                    <DeleteIcon 
                        mb={2} 
                        color="red.500"  
                        _hover={{ color: "red.700", cursor:"pointer" }}
                        onClick={() => removeProduct(index)} />
                    )} 
                    </Flex>    
                    <Input type="number" {...register(`products.${index}.qty`, {valueAsNumber: true})} />
                </FormControl>
                 
                </Flex>)}
                {/* <Button onClick={()=> addProduct(defaultProduct)}> Nuevo producto </Button> */}
            </Flex>
            <Divider mb="3" mt="2" />
            <Flex alignItems="center" justifyContent={"space-between"} mt="1">
                <Heading size="md">Forma de pago</Heading>
                <Button
                    size="xs"
                    fontSize="1rem"
                    lineHeight="1rem"
                    py={4}
                    colorScheme="blue"
                    onClick={()=> append(defaultPM) }
                >
                    Agregar
                </Button>
            </Flex>
            <Flex flexDir="column" mb={4}>
                {fields.map((field, index)=><Flex gap={3} alignItems="flex-end" mb={5}>
                    {/* //Metodo de pago */}
                <FormControl flex={2} marginRight={4}>
                { index === 0 && <FormLabel>Metodo</FormLabel> }
                <Select placeholder='Seleccionar' {...register(`payment_methods.${index}.method`)}>{/* //ubicamos la posicion */}
                        { //cargaramos el elemento con un map
                            PAYMENT_METHOD_TYPES.map((pm)=>(
                            <option key={pm} value={pm}>{pm}</option>
                            ))
                        }
                    </Select>
                </FormControl>
                    {/* //Valor         */}
                <FormControl flex={2}   isInvalid={!!errors?.payment_methods}> {/* 1.rem  !! es negación en booleano */}
               { index === 0 &&  <FormLabel>Valor</FormLabel>}
                                <Input
                                type='text'
                                placeholder="Valor"
                                {...register(`payment_methods.${index}.amount`, {valueAsNumber: true})}// ESTO ES COMO HACER onBlur={onBlur} y asi
                                // hacemos un desctructuring de los datos y queda listo
                                
                                />
                </FormControl>
                    {/* //Plazo */}
                <FormControl flex={2}   isInvalid={!!errors?.payment_methods}> {/* 1.rem  !! es negación en booleano */}
                { index === 0 &&  <FormLabel>Plazo</FormLabel> }
                                <Input
                                type='number'
                                placeholder="plazo"
                                {...register(`payment_methods.${index}.time_value`,  {valueAsNumber: true})}// ESTO ES COMO HACER onBlur={onBlur} y asi
                                // hacemos un desctructuring de los datos y queda listo
                                />
                </FormControl>
                        
                <FormControl flex={4} >
                    <Flex alignItems="center" justifyContent="space-between">
                     { index === 0 && <FormLabel>Periodo</FormLabel> }
                     {fields.length > 0 && (
                    <DeleteIcon 
                        mb={2} 
                        color="red.500"  
                        _hover={{ color: "red.700", cursor:"pointer" }}
                        onClick={() => remove(index)} />
                    )} 
                    </Flex>    
                <Select 
                    placeholder='Seleccionar'  {...register(`payment_methods.${index}.time_unit`)}>{/* //ubicamos la posicion */}
                        { //cargaramos el elemento con un map
                        Object.keys(TIME_UNITS.Enum).map((method)=>(
                            <option key={method} value={method}>{method}</option>
                            ))
                        }
                    </Select>
                </FormControl>
                 
                </Flex>)}
                {/* <Button onClick={()=> append(defaultPM)}> Nuevo metodo </Button> */}
            </Flex>
            <Button  colorScheme="purple" type="submit">
                    {!!saleId ? "Guardar cambios" : "Crear"}
            </Button>
            <Button
            onClick={()=>{
                router.back()
            }}>
            Vovler
            </Button>
        </form>
        <DevTool control={control} /> {/* set up the dev tool */}
        </>
    )
}

export default saleForm;