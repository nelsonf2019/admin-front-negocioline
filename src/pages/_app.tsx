import { type AppType } from "next/dist/shared/lib/utils";
import "Y/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
 return(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <Component {...pageProps} />;
    </ChakraProvider>

  </QueryClientProvider>
 )
};

export default MyApp;
