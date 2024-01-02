import { PaymenMethod, ProductForState } from "schema/SaleSchema"

interface defaultValues{
    [key: string ]: PaymenMethod | ProductForState
}

export const DEFAULT_VALUES: defaultValues = {
    payment_methods:{//metodo de pago por defecto
            method:"efectivo", 
            amount:0, 
            time_unit:"Meses", 
            time_value:0       
        },
    products:{
            code:"", 
            name:"Denomicacón",
            qty:0, 
            unit_price:0,
    }
} as const