import { Button, Spinner, TabPanel, useDisclosure } from "@chakra-ui/react"
import ClientsList from "./ClienteList"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { env } from "Y/env.mjs"
import  MyModal  from "../ui/modals/MyModal"
import ClientForm from "./ClientForm"
import SaleForm from "../ventas/VentasForms"
import { useState } from "react"
import { ClientFromDB } from "schema/clienteSchema"




export const ClientPanel =()=>{
   
    const [selectedClient, setSelectedClient] =useState<ClientFromDB | null>()
    return(
    <TabPanel p={0}>
         <ClientsList 
                selectedClientId={selectedClient?._id}
                onClick={(c)=> {
                const valueToSet = c._id === selectedClient?._id ? null : c
                setSelectedClient(valueToSet)
            }
            }/>
        
        <MyModal title="Nuevo Cliente" mr={2}>
                <ClientForm />
        </MyModal>
        <MyModal title="Nueva venta" colorSchema="green" disabledButton={!selectedClient}>
                <SaleForm />
        </MyModal>
    </TabPanel>
    )
}