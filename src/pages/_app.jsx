import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';


function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
        <NextUIProvider>
            <ToastContainer/>
           <Component {...pageProps} /> 
        </NextUIProvider>
    )
}

export default MyApp;