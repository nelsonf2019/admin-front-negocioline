import { ProductFormDB } from "schema/ProducSchema";

const CalcProductPrice =(product: ProductFormDB)=>{
    const{
        supplier_cost,
        micro,
        iva,
        profit_margin,
        salvament_cost
    } = product
    const baseCost = micro + supplier_cost
    const minimumCost = baseCost / (1 - salvament_cost)
    const finalPrice = +(minimumCost / (1 - profit_margin)).toFixed(3)
    return finalPrice;
}

export default CalcProductPrice;