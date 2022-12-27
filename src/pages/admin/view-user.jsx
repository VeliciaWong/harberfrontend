import Head from "next/head";
import Image from "next/image";
import Button from "../../components/button/Button";
import { useState, useEffect, useRef } from "react";
import { Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast} from "react-toastify";
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/footer/Footer";

const adminViewUserPage = () =>{
    const logout = () =>{
        window.location.href = "/admin"
    }

    return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col">
                <header className="pt-4 px-4 pb-[30px]">
                    <div className="relative overflow-hidden xl:px-32 3xl:px-[139px] mx-auto items-center justify-center flex sm:justify-between">
                        <Image
                        src="/assets/images/harber.png"
                        alt=""
                        width={150}
                        height={70}
                        />
                        <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                            <LogoutIcon fontSize="large" onClick={(logout)} className="cursor-pointer"/>
                        </div>
                    </div>
                </header>
                <div className="">

                </div>
            </div>

        </div>
    )
}

export default adminViewUserPage;