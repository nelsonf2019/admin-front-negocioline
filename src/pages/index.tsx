import { env } from "Y/env.mjs";
//import styles from "./index.module.css";
import Head from "next/head";
import { Button, ButtonGroup, Card, Container } from '@chakra-ui/react'
import { type NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";

const Home: NextPage =()=> {
  const router = useRouter()
  return (
    <Container mt={8}>
      <Card p={4}>
      <Head>
        <title>App mi negocio online</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div >

          <ButtonGroup>
            <Button colorScheme='blue' onClick={()=>{
                router.push("/login")
            }}>Inicio</Button>
            <Button colorScheme='green' onClick={()=>{
               axios.get(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/ventas`, {
                withCredentials: true,
               })
            }}>Mostrar ventas</Button>
             <Button colorScheme='purple' onClick={()=>{
                router.push("/clients")
            }}>Clientes</Button>
          
          </ButtonGroup>
          
        </div>
      </main>
      </Card> 
    </Container>
  );
}

export default Home;
