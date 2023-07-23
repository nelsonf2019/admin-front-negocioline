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
    Select
    } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next"
import { FieldElement, useForm } from "react-hook-form";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

const DOC_TYPES = ["RUC", 
"Cédula", 
"Pasaporte",
"Identificación Exterior"
] as const // declaramos el arreglo como const con typescript
//construimos un esquemas para la validaciones con zoo
const schema = z.object({
   //para validar le debemos poner el tipo de datos
   firstname: z.string().min(3),
   lastname: z.string().min(3),
   email: z.string().email("Email invalid"), //recibe tambien mensaje de error
   document_type: z.enum(DOC_TYPES),
   document_value: z.string().min(4)
})
type FieldValues = z.infer<typeof schema> //inferimos el tipo de datos
const NewClent: NextPage = () => {
   const {
      register,
      getValues,
      control,
      handleSubmit,
      formState: { errors }
  } = useForm<FieldValues>({
      resolver: zodResolver(schema),// zod resolver, para que me tome las validaciones 
      })//HACE EL CONTROL DE DATOS DE LOS INPUT VALIDACION con resolver y zood
   const onSubmit =(data: FieldValues)=>{
      console.log({data})
   }

   return (
   <Container marginTop={8}>
      <Card padding={4}>
         <Heading textAlign="center" marginBottom={6}>Nuevo Cliente</Heading>
         <form onSubmit={handleSubmit(onSubmit)}>
         <FormControl marginBottom={5} isInvalid={!!errors.firstname}> {/* 1.rem  !! es negación en booleano */}  
                    <FormLabel>Nombre</FormLabel>
                        <Input
                        type='text'
                        placeholder="Ingresa tu nombre"
                        {...register("firstname")}// ESTO ES COMO HACER onBlur={onBlur} y asi
                        // hacemos un desctructuring de los datos y queda listo
                         />
                         {/* para validar los input */}
                         <FormErrorMessage>{errors.firstname?.message}</FormErrorMessage>
         </FormControl> 
         <FormControl marginBottom={5} isInvalid={!!errors.lastname}> {/* 1.rem  !! es negación en booleano */}  
                    <FormLabel>Apellido</FormLabel>
                        <Input
                        type='text'
                        placeholder="Ingresa tu apellido"
                        {...register("lastname")}// ESTO ES COMO HACER onBlur={onBlur} y asi
                        // hacemos un desctructuring de los datos y queda listo
                         />
                         {/* para validar los input */}
                         <FormErrorMessage>{errors.lastname?.message}</FormErrorMessage>
         </FormControl> 
         <FormControl marginBottom={5} isInvalid={!!errors.email}> {/* 1.rem  !! es negación en booleano */}  
                    <FormLabel>Email</FormLabel>
                        <Input
                        type='text'
                        placeholder="Ingresa tu email"
                        {...register("email")}// ESTO ES COMO HACER onBlur={onBlur} y asi
                        // hacemos un desctructuring de los datos y queda listo
                         />
                         {/* para validar los input */}
                         <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
         </FormControl> 
         <Flex gap={3}>
            <FormControl flex={5} marginRight={4}>
            <FormLabel>Tipo de documento</FormLabel>
               <Select placeholder='Seleccionar' {...register("document_type")}>
                  { //cargaramos el elemento con un map
                     DOC_TYPES.map((dt)=>(
                        <option key={dt} value={dt}>{dt}</option>
                     ))
                  }
               </Select>
            </FormControl>
            <FormControl flex={5} marginBottom={5} isInvalid={!!errors.document_value}> {/* 1.rem  !! es negación en booleano */}  
            <FormLabel>Email</FormLabel>
                           <Input
                           type='text'
                           placeholder="documento"
                           {...register("document_value")}// ESTO ES COMO HACER onBlur={onBlur} y asi
                           // hacemos un desctructuring de los datos y queda listo
                           />
                           {/* para validar los input */}
                           <FormErrorMessage>{errors.document_value?.message}</FormErrorMessage>
            </FormControl> 
         </Flex>
         <Button  colorScheme="purple" type="submit">
                  Crear
         </Button>
         </form>
         <DevTool control={control} /> {/* set up the dev tool */}
      </Card>
   </Container>)
}

export default NewClent;