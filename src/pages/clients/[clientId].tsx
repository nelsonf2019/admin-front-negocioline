import { Card, Container, Heading } from "@chakra-ui/react";
import ClientForm from "components/entiti/clients/ClientForm";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const EditClient: NextPage=()=>{ 
    const router = useRouter()
    console.log({router})
    return(
        <Container mt={8}>
            <Card p={4}>
                <Heading textAlign="center" mb={6}>
                    Editando Cliente
                </Heading>
                <ClientForm clientId={router.query.clientId as string} />
            </Card>
        </Container>
    )
}

export default EditClient;