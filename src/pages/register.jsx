import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import Modal from "../components/modal/Modals";
import ModalSetRecovery from "../components/modal/ModalSetRecovery"
import * as React from 'react';
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormContainer  from "../components/forms/Container";
import Field  from "../components/forms/Field";
import { Input } from "../components/inputs";
import Footer from "../components/footer/Footer";

const RegisterPage = () =>{
  const { register, handleSubmit, control, formState: { errors }} = useForm();
  const registers = (data) =>{
    setModalChooseRecovery(true)
    console.log(data);
  }

  const saveRecovery = () =>{
    window.location.href="/"
  }

  const [modalChooseRecovery, setModalChooseRecovery] = useState(false);

    return(
        <div className="min-h-screen w-screen bg-[#F7FFF7]">
            <Head>
                <title>HarBer.id - Website Product Price Comparison from Various E-commerce in Indonesia</title>
                <meta name="description" content="HarBer.id description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-screen w-screen overflow-hidden flex flex-col px-10 xl:px-30 3xl:px-[139px]">
                <div className="max-w-[150px] mt-[2%] mb-[2%] z-40 ml-[70px] cursor-pointer" onClick={() => window.location.href = "/"}>
                    <Image
                        src="/assets/images/harber.png"
                        alt=""
                        layout="responsive"
                        width="150"
                        height="70"
                    />
                </div>
                <div className="flex-grow flex items-center justify-center">
                <Modal>
                    <div className="text-white text-left pl-[20px] font-bold space-y-10">
                        <span className="text-4xl">
                            Welcome to HarBer.id
                        </span>
                        <p className="text-[30px]">
                            Website Product Price<br/>Comparison from Various<br/>E-commerce in Indonesia
                        </p>
                    </div>
              
                  <div className="relative flex px-4">
                    <FormContainer>
                      <div className="space-y-3">
                        <Field label="Username" error={errors["username"]?.message}>
                          <Input {...register("username", { required: true })} />
                        </Field>
                        <Field label="Email" error={errors["email"]?.message}>
                          <Input {...register("email", { required: true })} />
                        </Field>
                        <Field label="Password" error={errors["password"]?.message} className>
                          <Input {...register("password", { required: true })} />
                        </Field>
                        <Field label="Confirm Password" error={errors["confirm_password"]?.message} className>
                          <Input {...register("confirm_password", { required: true })} />
                        </Field>
                        
                        <div className="flex justify-end pt-[5%]">
                          <Button onClick={handleSubmit(registers)}>REGISTER</Button>
                        </div>
                        
                      </div>
                    </FormContainer>
                  </div>
                </Modal>
                <ModalSetRecovery
                    open={modalChooseRecovery}
                    // loading={editMissionMut.isLoading}
                    onClose={() => {
                      setModalChooseRecovery(false);
                    }}
                    onSubmit={saveRecovery}/>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default RegisterPage;