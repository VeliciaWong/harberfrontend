import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import Head from "next/head";


function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
        <NextUIProvider>
            <ToastContainer autoClose={1500} closeOnClick pauseOnHover={false}/>
            <Head><title>HarBer.id</title></Head>
           <Component {...pageProps} /> 
        </NextUIProvider>
    )
}

export default MyApp;