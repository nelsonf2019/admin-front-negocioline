import { z } from "zod";

    export const DOC_TYPES = ["RUC", 
     "Cédula", 
     "Pasaporte",
     "Identificación Exterior"
     ] as const // declaramos el arreglo como const con typescript
     //construimos un esquemas para la validaciones con zod
    export const ClientSchema = z.object({
        //para validar le debemos poner el tipo de datos
        firstname: z.string().min(3,"El nombre debe tener tres caracteres"),
        lastname: z.string().min(3,"El apellido debe tener tres caracteres"),
        email: z.string().email("Email invalid"), //recibe tambien mensaje de error
        document_type: z.enum(DOC_TYPES),
        document_value: z.string().min(4,"El documento debe tener 4 caracteres")
     })
 

    export interface ClientFromDB extends Client {
        _id: string
        firstname: string
        sale?: {count: number, amount: number}
    }
    export interface ClientListProps {
        clients: ClientFromDB[]
    }
    export interface ClientFormProps{
        clientId?: string //lleva ? porque es opcional
    }
export type Client = z.infer<typeof ClientSchema> //inferimos el tipo de datos