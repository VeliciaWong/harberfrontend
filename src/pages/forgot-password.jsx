import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import * as React from 'react';
import * as yup from "yup";
import { useYupResolver } from "../helpers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormContainer  from "../components/forms/Container";
import Field  from "../components/forms/Field";
import { Input } from "../components/inputs";
import Footer from "../components/footer/Footer";
import {axiosLocal} from"../helpers/axios"
import { useRouter } from "next/router";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, Text } from "@nextui-org/react";

const schema = yup.object().shape(
    {
        email: yup.string().required("Field email is required"),
    },
    []
);

const forgotPassword = () =>{
    const router = useRouter();
    const resolver = useYupResolver(schema);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver,
      });

      const goToRecovery = async(data) =>{
          // console.log(data)
        // localStorage.setItem("email", data)
        await axiosLocal.post(`/user_reset`, data)

        .then(response =>{
          const userId = response.data?.id
        // console.log(response.data?.questionRecovery?.question)
          localStorage.setItem("userRecoveryQuestion", response.data?.questionRecovery?.question)
          router.push({
            pathname: `/recovery/`,
            query: { "id": userId }
          })
        })
        .catch(error =>{
          toast.warn("Email is not registered!")
          console.log(error)
        })
        // window.location.href = "/recovery"
      }

    return(
        <div className="h-screen w-screen bg-[#F7FFF7] overflow-hidden">
            <div className={`relative w-screen overflow-hidden`}>
                <div className="max-w-[150px] mt-[2%] mb-[2%] z-40 ml-[70px] xs:ml-[25px] sm:ml-[50px] lg:ml-[60px] xl:ml-[70px] cursor-pointer" onClick={() => window.location.href = "/"}>
                    <Link href="/">
                            <Image
                                src="/assets/images/harber.png"
                                alt=""
                                width={150}
                                height={70}
                            />   
                    </Link>
                </div>
                <Text className="text-black font-bold text-center mb-[20px] text-[30px] xs:text-[20px] sm:text-[25px] lg:text-[30px] xl:text-[30px]">Please input your email account !</Text>
                <div className="max-w-[600px] xs:max-w-[350px] sm:max-w-[450px] lg:max-w-[500px] xl:max-w-[600px] h-[380px] mx-auto bg-[#4ECDC4] shadow-xl bg-contain bg-center rounded-[18px] w-full p-5 mb-[3.9%] flex items-center self-center">
                    <div className="relative w-full h-full mx-auto">
                        <div className='mt-[8%] flex justify-center items-center self-center'>
                            <FormContainer>
                                <div className="space-y-10">
                                    <Field label="Email" error={errors["email"]?.message} className>
                                        <Input {...register("email", { required: true })} />
                                    </Field>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSubmit(goToRecovery)}>SUBMIT</Button>
                                    </div>
                                </div>
                            </FormContainer>
                        </div>
                    </div>
                </div>
            </div>
                <Footer/>
        </div>
    )
}

export default forgotPassword;