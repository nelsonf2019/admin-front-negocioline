import { Button, Spinner, TabPanel, useDisclosure } from "@chakra-ui/react"
import ClientsList from "./ClienteList"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { env } from "Y/env.mjs"
import  MyModal  from "../ui/modals/MyModal"
import ClientForm from "./ClientForm"




export const ClientPanel =()=>{
   

    return(
    <TabPanel p={0}>
         <ClientsList />
        
        <MyModal title="Nuevo Cliente" children={<ClientForm />}/>
         
    </TabPanel>
    )
}