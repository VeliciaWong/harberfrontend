import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';


function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
        <NextUIProvider>
            <ToastContainer autoClose={1500} closeOnClick pauseOnHover={false}/>
           <Component {...pageProps} /> 
        </NextUIProvider>
    )
}

export default MyApp;