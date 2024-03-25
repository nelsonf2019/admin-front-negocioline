import { NormalizeError } from "next/dist/shared/lib/utils"
import { z } from "zod"

//construimos un esquemas para la validaciones con zoo
export const LoginSchema = z.object({
    //para validar le debemos poner el tipo de datos
    email: z.string().email("Email invalid"), //recibe tambien mensaje de error
    code: z.string().length(6, "El código debe tener 6 caracteres")
})
//definimos nuestro token
export const TokenPayloadSchema = z.object({
    sub: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    imageUrl: z.string(),
    roles:z.object({
        admin:z.boolean(),
        seller:z.boolean(),
        _id:z.string()
    })
        

})
//inferir tipos de datos con zod, generados por zod
 export type Login = z.infer<typeof LoginSchema> //inferimos el tipo de datos
 export type TokenPayload = z.infer<typeof TokenPayloadSchema> | null