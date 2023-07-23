import { 
   Button, 
   Card, 
   Container, 
   Flex, 
   FormControl, 
   FormErrorMessage, 
   FormLabel,
    Heading, 
    Input,
    Select
    } from "@chakra-ui/react";
import { NextPage } from "next"
import { useRouter } from "next/router";
import ClientForm from "components/entiti/clients/ClientForm";


const NewClent: NextPage = () => {
//HACE EL CONTROL DE DATOS DE LOS INPUT VALIDACION con resolver y zood
   const router = useRouter()


   return (
   <Container marginTop={8}>
      <Card padding={4}>
         <Heading textAlign="center" marginBottom={6}>
            Nuevo Cliente
         </Heading>
         <ClientForm />
      </Card>
   </Container>)
}

export default NewClent;