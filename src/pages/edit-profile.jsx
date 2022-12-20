import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import FormContainer  from "../components/forms/Container";
import Field  from "../components/forms/Field";
import { Input } from "../components/inputs";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import { Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast} from "react-toastify";
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/footer/Footer";


const saveEditProfile = () =>{
    // masukin api buat nyimpen edit profile user
    toast.success("Save Success!");
    window.location.href="/"
}

const editProfilePage = () =>{
    const { register, handleSubmit, control, formState: { errors }} = useForm();
    const router = useRouter();

    const logout = () =>{
        toast.warn("Logout !");
        // router.back();
    }

    return(
        <div className="relative bg-[#F7FFF7]">
            <Head>
                <title>HarBer.id - Website Product Price Comparison from Various E-commerce in Indonesia</title>
                <meta name="description" content="HarBer.id description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                <div className={`relative h-screen w-screen overflow-hidden xl:px-30 3xl:px-[139px]`}>
                
                <Text size={30} className="text-black font-bold text-center mb-[20px]">Edit My Profile</Text>
                <div className="max-w-[650px] h-[380px] mx-auto bg-[#4ECDC4] shadow-xl bg-contain bg-center rounded-[18px] w-full p-5 mb-[5%]">
                    <div className="relative w-full h-full mx-auto">
                        <div className='mt-[2%] flex flex-col justify-center items-center'>
                            <FormContainer>
                                <div className="space-y-5">
                                    <Field label="Username" error={errors["username"]?.message}>
                                        <Input {...register("username", { required: true })} />
                                    </Field>
                                    <Field label="Email" error={errors["email"]?.message}>
                                        <Input {...register("email", { required: true })} />
                                    </Field>
                                    <Field label="Password" error={errors["password"]?.message} className>
                                        <Input {...register("password", { required: true })} />
                                    </Field>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSubmit(saveEditProfile)}>SAVE</Button>
                                    </div>
                                </div>
                            </FormContainer>
                        </div>
                    </div>
                </div>
            </div>
                <Footer/>
            </div>
        </div>
    )
}

export default editProfilePage;