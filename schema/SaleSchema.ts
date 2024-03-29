import { z } from "zod"

//para incluir en desplegable los metodos de pago
export const PAYMENT_METHOD_TYPES = [
    "efectivo",
    "tarjeta de credito",
    "tarjeta de debito",
    "cuenta corriente",
    "transferencia"
 
] as const 

export const TIME_UNITS = z.enum(["Días","Meses","Año"])

//esquema para el array productos
export const saleProductSchema = z.object({
    code: z.string(),
    name: z.string().optional(),
    qty: z.number(),
    unit_price: z.number(),
    discount: z.number().optional(),
})
//esquema para el metodo de pago
export const salePaymentMethodSchema = z.object({
    method: z.enum(PAYMENT_METHOD_TYPES),// ya el arreglo esta definido arriba por lo tanto se pone enum
    amount: z.number(),
    time_unit: TIME_UNITS,
    time_value: z.number()
})
//
export const saleSchema = z.object({
        //para validar le debemos poner el tipo de datos
        operation_date: z.date(),
        client_document: z.string(),
        products: z.array(saleProductSchema),//arreglos de productos
        payment_methods: z.array(salePaymentMethodSchema)//el motodo de pago, un arreglo

})

//exportamos el datos sale y lo inferimos como tipo de dato schema
export type Sale = z.infer<typeof saleSchema> //inferimos la venta
export type PaymenMethod = z.infer<typeof salePaymentMethodSchema>//inferimos el metodo de venta
            //para el estdo del formulario ej. ProductForState ProductFS
export type ProductForState = z.infer<typeof saleProductSchema>//inferimos la venta de producto

export interface Product extends ProductForState{
    supplier_cost: number   
    micro: number   
    iva: number 
    salvament_cost: number 
    profit_margin: number 
}

export interface ProductFormProps{
    saleId?: string //lleva ? porque es opcional
}
