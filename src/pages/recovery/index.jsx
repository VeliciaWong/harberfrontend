import Head from "next/head";
import Image from "next/image";
import Button from "../../components/button/Button";
import FormContainer  from "../../components/forms/Container";
import Field  from "../../components/forms/Field";
import { Input } from "../../components/inputs";
import { useState, useEffect, useRef } from "react";
import { Link, Text } from "@nextui-org/react";
import * as yup from "yup";
import { useYupResolver } from "../../helpers/yup";
import { useForm } from "react-hook-form";
import Footer from "../../components/footer/Footer";

const goToRecoveryPassword = () =>{
    // cek udh bener atau gk jawaban recoverynya, kl bener ke halaman change password tp kl salah kasih alert salah
    window.location.href="/recovery/change-password"
}


const recoveryPage = () =>{
    const schema = yup.object().shape(
        {
            recovery_answer: yup.string().required("Field recovery answer is required"),
          
        },
        []
    );
    const resolver = useYupResolver(schema);
    const {
        register,
        control,
        watch,
        handleSubmit,
        resetField,
        formState: { errors },
      } = useForm({
        resolver,
      });

    return(
        <div className="relative h-screen w-screen bg-[#F7FFF7]">
            <div className={`relative h-screen w-screen overflow-hidden xl:px-30 3xl:px-[139px]`}>
                <div className="max-w-[150px] mt-[2%] mb-[2%] z-40 ml-[70px] cursor-pointer" onClick={() => window.location.href = "/"}>
                    <Link href="/">
                            <Image
                                src="/assets/images/harber.png"
                                alt=""
                                width={150}
                                height={70}
                            />   
                    </Link>
                </div>
                <Text size={30} className="text-black font-bold text-center mb-[20px]">Please answer your recovery question to recover your password</Text>
                <div className="max-w-[600px] h-[380px] mx-auto bg-[#4ECDC4] shadow-xl bg-contain bg-center rounded-[18px] w-full p-5 mb-[5%]">
                    <div className="relative w-full h-full mx-auto">
                        <div className='mt-[8%] flex flex-col justify-center items-center'>
                            <FormContainer>
                                <div className="space-y-10">
                                    <Text size={25} className="text-white font-bold text-center italic">Question ?</Text>
                                    <Field label="Your Answer" error={errors["recovery_answer"]?.message} className>
                                        <Input {...register("recovery_answer", { required: true })} />
                                    </Field>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSubmit(goToRecoveryPassword)}>SUBMIT</Button>
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

export default recoveryPage;