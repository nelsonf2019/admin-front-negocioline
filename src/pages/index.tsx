import { env } from "Y/env.mjs";
//import styles from "./index.module.css";
import Head from "next/head";
import { Button, ButtonGroup, Card, Container, Heading, Spinner } from '@chakra-ui/react'
import { type NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import VentasList from "components/entiti/ventas/VentasList";
import AuthHeader from "components/entiti/ui/globarl/AppHeader"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { SalesPanel } from "components/entiti/ventas/SalePanel";
import { ClientPanel } from "components/entiti/clients/ClientPanel";
import ProductsPanel from "components/entiti/products/ProductsPanel";


const Home: NextPage =()=> {


  const router = useRouter()
  return (
    <Container mt={8}>
     
    <AuthHeader />
      <Card p={4}>
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Ventas</Tab>
          <Tab>Clientes</Tab>
          <Tab>Productos</Tab>
        </TabList>

        <TabPanels>
          <SalesPanel />
          <ClientPanel />
          <ProductsPanel />
        </TabPanels>
      </Tabs>
        <Heading>Mis ventas</Heading>
      </Card> 
    </Container>
  );
}

export default Home;
