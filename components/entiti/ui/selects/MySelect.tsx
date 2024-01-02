import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface Props<T>{
    fieldName: keyof T
    label: string
    flex?: number
    options: readonly string[]
}

export function MySelect<T>({options, label, flex = 3, fieldName}: Props<T>){
    const { 
            formState: {errors}, 
            register 
          }  =  useFormContext()
    return(
        <FormControl flex={flex} marginRight={4}>
        <FormLabel>{label}</FormLabel>
           <Select placeholder='Seleccionar' {...register(fieldName as string)}>
              { //cargaramos el elemento con un map
                 options.map((o)=>(
                    <option key={o} value={o}>{o}</option>
                 ))
              }
           </Select>
        </FormControl>
    )
}

export default MySelect;