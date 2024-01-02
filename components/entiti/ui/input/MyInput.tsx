import { SearchIcon } from "@chakra-ui/icons"
import { Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input } from "@chakra-ui/react"
import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"
import { MyInputProps } from "schema/UiSchemas"
  

function MyInput<T>({
    fieldName,
    label, 
    placeholder,
    mb=5,
    flex=4,
    type="text",
    showLabel= true,
    valueAsNumber= false,
    valueAsDate = false,
    searchFn = false 
    }: MyInputProps<T>){
    const { getValues, formState: {errors}, register }  =  useFormContext()
    const handleSearch = ()=> {
        const fieldValues = getValues(fieldName as string)
        if(typeof searchFn === "function"){
            searchFn(fieldValues)
        }
    }
    const registerOption = valueAsNumber ? { valueAsNumber } : { valueAsDate }
    return (
        <FormControl mb={mb} isInvalid={!!errors[fieldName as string]} flex={flex}> {/* 1.rem  !! es negación en booleano */}  
                  {showLabel && <FormLabel>{label}</FormLabel>}
                  <Flex gap={2}>     
                  { searchFn  && (
                    <IconButton
                      colorScheme='blue'
                      aria-label='Search database'
                      icon={<SearchIcon />}
                      onClick={handleSearch}
                    />
                  )

                  }
                      <Input 
                        type={type}
                        placeholder=
                         { placeholder || label}
                         {...register(fieldName as string, registerOption)}// ESTO ES COMO HACER onBlur={onBlur} y asi
                        // hacemos un desctructuring de los datos y queda listo

                        />
                    </Flex> 
                        {/* para validar los input */}
                        <FormErrorMessage>
                            {errors[fieldName]?.message as ReactNode}
                        </FormErrorMessage>
        </FormControl> 
    )
}

export default MyInput;