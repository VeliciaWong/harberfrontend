import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import FormContainer  from "../components/forms/Container";
import Field  from "../components/forms/Field";
import { Input } from "../components/inputs";
import { useState, useEffect, useRef } from "react";
import { Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Footer from "../components/footer/Footer";

const saveRecoveryPassword = () =>{
    // masukin api buat nyimpen pass recovery ini jadi pass baru di db
    window.location.href="/login"
}

const recoveryChangePasswordPage = () =>{
    const { register, handleSubmit, control, formState: { errors }} = useForm();

    return(
        <div className="relative h-screen w-screen bg-[#F7FFF7]">
            <div className={`relative h-screen w-screen overflow-hidden xl:px-30 3xl:px-[139px]`}>
                <div className="max-w-[150px] mt-[2%] mb-[2%] z-40 ml-[70px] cursor-pointer" onClick={() => window.location.href = "/"}>
                    <Image
                        src="/assets/images/harber.png"
                        alt=""
                        layout="responsive"
                        width="150"
                        height="70"
                    />
                </div>
                <Text size={30} className="text-black font-bold text-center mb-[20px]">Change your Password</Text>
                <div className="max-w-[600px] h-[380px] mx-auto bg-[#4ECDC4] shadow-xl bg-contain bg-center rounded-[18px] w-full p-5 mb-[5%]">
                    <div className="relative w-full h-full mx-auto">
                        <div className='mt-[8%] flex flex-col justify-center items-center'>
                            <FormContainer>
                                <div className="space-y-10">
                                    <Field label="Password" error={errors["password"]?.message}>
                                        <Input {...register("password", { required: true })} />
                                    </Field>
                                    <Field label="Confirm Password" error={errors["confirm_password"]?.message} className>
                                        <Input {...register("confirm_password", { required: true })} />
                                    </Field>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSubmit(saveRecoveryPassword)}>SAVE</Button>
                                    </div>
                                </div>
                            </FormContainer>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default recoveryChangePasswordPage;