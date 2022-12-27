import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import {
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";
import Head from "next/head";



function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)
    const queryClient = new QueryClient();
    return getLayout(
        <QueryClientProvider client={queryClient}>
           <NextUIProvider>
                <ToastContainer autoClose={1500} closeOnClick pauseOnHover={false}/>
                <Head><title>HarBer.id</title></Head>
                <Component {...pageProps} /> 
            </NextUIProvider> 
        </QueryClientProvider>
        
    )
}

export default MyApp;