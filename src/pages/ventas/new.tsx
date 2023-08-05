import {  
    Card, 
    Container, 
     Heading, 
     } from "@chakra-ui/react";
import VentasForms from "components/entiti/ventas/VentasForms";
 import { NextPage } from "next"
 import { useRouter } from "next/router";

 
 
 const NewVenta: NextPage = () => {
 //HACE EL CONTROL DE DATOS DE LOS INPUT VALIDACION con resolver y zood
    const router = useRouter()

    return (
    <Container marginTop={8}>
       <Card padding={4} width={{ lg:"40rem" }}>
          <Heading textAlign="center" marginBottom={6}>
             Nueva venta
          </Heading>   
          <VentasForms />   
       </Card>
    </Container>)
 }
 export default NewVenta;