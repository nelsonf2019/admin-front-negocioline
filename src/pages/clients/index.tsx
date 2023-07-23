import { Button, ButtonGroup, Card, Container, Heading, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { env } from "Y/env.mjs";
import axios from "axios";
import ClientsList from "components/entiti/clients/ClienteList";
import { NextPage } from "next";
import loadConfig from "next/dist/server/config";
import { useRouter } from "next/router";

const Clients: NextPage =()=>{

        const {data: clients, isLoading} = 
        useQuery({queryKey:["clients"], queryFn: async ()=>{
        const res = await axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/clients`,
        {withCredentials:true})//para que nos permite pasar a traves de Credentials
        return res.data.data //esta data es data de axios
        }})
    //    // console.log({ clients, isLoading })
        
        const router = useRouter()

        return <Container marginTop={8}>
            <Card padding={4}>
                <Heading textAlign="center">Clientes</Heading>
                {isLoading ? <Spinner /> : <ClientsList clients={clients}/>}
               <ButtonGroup>
               <Button
                    mt={6}
                    colorScheme='purple' onClick={()=>{
                    router.push("/clients/new")
                }}>Nuevo cliente</Button>
                <Button 
                    mt={6}
                    colorScheme="green"
                    onClick={()=>{
                        router.push("/")
                    }}>
                    Voler
                </Button>
               </ButtonGroup>
            </Card>

        </Container>
}

export default Clients;