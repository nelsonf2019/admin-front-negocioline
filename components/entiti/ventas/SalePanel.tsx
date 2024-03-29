import {TabPanel } from "@chakra-ui/react"
import VentasList from "./VentasList"

import MyModal from "../ui/modals/MyModal"
import SaleForm from "./VentasForms"

export const SalesPanel =()=>{

       
   
    return(
        <TabPanel p={0}>
            <VentasList />
          
        </TabPanel>
      
      
    )
}