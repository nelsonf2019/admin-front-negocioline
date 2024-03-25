import { Button } from "@chakra-ui/react";
import { DEFAULT_VALUES } from "constant";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ProductForState, Sale } from "schema/SaleSchema";

interface Props{
    fieldName: keyof Sale

}


const MyAdderButton =({ fieldName }: Props)=>{
    const { control } = useFormContext()
    const { append } = useFieldArray({control, name: fieldName,}); // unique name for your Field Array
    
    console.log({append})

    const defaultValues = DEFAULT_VALUES[fieldName]


    return(
        <Button
        size="xs"
        fontSize="1rem"
        lineHeight="1rem"
        py={4}
        colorScheme="blue"
        onClick={()=> append(defaultValues) }
    >
        Agregar
    </Button>
    )
}

export default MyAdderButton;