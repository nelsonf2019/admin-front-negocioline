export interface MyInputProps<T>{//recibe un generico
    fieldName: keyof T
    label:string
    valueAsNumber?: boolean
    valueAsDate?: boolean
    placeholder?: string
    mb?: number
    flex?: number
    type?: string
    showLabel?: boolean
    searchFn?: ((state:any) => void) | boolean
}
   