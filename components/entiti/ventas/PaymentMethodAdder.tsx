import { useFormContext } from "react-hook-form";
import { Flex } from "@chakra-ui/react";
import MyInput from "../ui/input/MyInput";
import MyDeleteIcon from "../ui/icon/MyDeleteIcon";
import { PAYMENT_METHOD_TYPES, PaymenMethod, Sale, TIME_UNITS } from "schema/SaleSchema";
import MySelect from "../ui/selects/MySelect";

interface Props{
    fieldName: keyof Sale

}

function PaymentMethodAdder({fieldName}: Props){
    const { watch } = useFormContext()
    const paymentenMethods = watch(fieldName);
    return(
        <Flex flexDir="column" mb={4}>
        {paymentenMethods.map((_: PaymenMethod, index: number)=>
            <Flex gap={3} alignItems="flex-end" mb={5}>
                <MySelect 
                    fieldName={`payment_methods.${index}.method`}
                    label="Método" 
                    options={PAYMENT_METHOD_TYPES} 
                 />

                    {/* //Valor         */}
                 <MyInput 
                    fieldName={`payment_methods.${index}.amount`} 
                    label="Valor" 
                    showLabel={index === 0}
                    valueAsNumber
                />
                <MyInput 
                    fieldName={`payment_methods.${index}.time_value`} 
                    label="Plazo" 
                    showLabel={index === 0}
                    valueAsNumber
                />      
                <MySelect 
                    fieldName={`payment_methods.${index}.time_unit`}
                    label="Período" 
                    options={Object.keys(TIME_UNITS.Enum)} 
                />       
                 <MyDeleteIcon<Sale> fieldName="payment_methods" index={index} />
            </Flex>)}
        {/* <Button onClick={()=> addProduct(defaultProduct)}> Nuevo producto </Button> */}
    </Flex>
    )
}

export default PaymentMethodAdder;