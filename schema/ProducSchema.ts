import { z } from "zod";


export const ProductSchema = z.object({
    _id: z.string(),
    name: z.string(),
    code: z.string(),
    supplier_cost: z.number(),
    iva: z.number(),
    micro: z.number(),
    salvament_cost: z.number(),
    profit_margin: z.number()
})
 


export type ProductFormDB = z.infer<typeof ProductSchema> //inferimos el tipo de datos

