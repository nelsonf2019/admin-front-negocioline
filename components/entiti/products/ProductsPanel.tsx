import {TabPanel } from "@chakra-ui/react"
import ProductsList from "./ProductsList"

const ProductsPanel =()=>{
//Usamos TabPanel para el las pestañas tab, que se ven en pantalla
    return(
        <TabPanel p={0}>
            <ProductsList onClick={()=>console.log("Click")}/>
        </TabPanel>

    )
}

export default ProductsPanel;