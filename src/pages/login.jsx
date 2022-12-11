import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import Modal from "../components/modal/Modal";
import * as React from 'react';
import { useForm, Controller } from "react-hook-form";
import FormContainer  from "../components/forms/Container";
import Field  from "../components/forms/Field";
import { Input } from "../components/inputs";

const login = () =>{
    window.location.href="/"
}


const ModalLogin = (props) => {
  const { register, handleSubmit, control, formState: { errors }} = useForm();
  const onSubmit = data => console.log(data);

  return(
    <Modal {...props}>
        <span className="text-white text-4xl text-left pl-[20px] font-bold mb-10">
            Login to HarBer.id
        </span>
  
      <div className="relative flex px-4">
        <FormContainer>
          <div className="space-y-10">
            <Field label="Email" error={errors["email"]?.message}>
              <Input {...register("email", { required: true })} />
            </Field>
            <Field label="Password" error={errors["password"]?.message} className>
              <Input {...register("password", { required: true })} />
            </Field>
            <a className="text-white underline cursor-pointer" href="/register">Don’t have an account? Register here</a>
            <div className="flex justify-end">
              <Button onClick={login}>LOGIN</Button>
            </div>
            
          </div>
        </FormContainer>
      </div>
    </Modal>
  )
  };

const LoginPage = () =>{

    return(
        <div className="min-h-screen w-screen bg-[#F7FFF7]">
            <Head>
                <title>HarBer.id - Website Product Price Comparison from Various E-commerce in Indonesia</title>
                <meta name="description" content="HarBer.id description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-screen w-screen overflow-hidden flex flex-col px-10 xl:px-30 3xl:px-[139px]">
                <div className="max-w-[150px] mt-[3%] z-40 ml-[50px]">
                    <Image
                    src="/assets/images/harber.png"
                    alt=""
                    layout="responsive"
                    width="150"
                    height="20"
                    />
                </div>
                <div className="flex-grow flex items-center justify-center">
                <ModalLogin />
                </div>
                <div className="text-black font-semibold text-center text-[25px] leading-[20px] mt-1 mb-[30px]">
                  ©2022-2023 HarBer.Id | All right reserved
                </div>
            </div>
        </div>
    )
}

export default LoginPage;