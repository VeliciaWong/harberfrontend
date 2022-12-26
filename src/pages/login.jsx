import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import Modal from "../components/modal/Modals";
import ModalRecovery from "../components/modal/ModalRecovery";
import * as React from 'react';
import * as yup from "yup";
import { useYupResolver } from "../helpers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormContainer  from "../components/forms/Container";
import Field  from "../components/forms/Field";
import { Input } from "../components/inputs";
import Footer from "../components/footer/Footer";

const login = () =>{
    window.location.href="/"
}

const checkingAnswer = () =>{
  window.location.href = "/recovery-change-password"
}

const schema = yup.object().shape(
  {
    email: yup.string().required("Field email is required"),
    password: yup.string().required("Field password is required"),
    
  },
  []
);

const LoginPage = () =>{

    const resolver = useYupResolver(schema);
    const { register, handleSubmit, control, formState: { errors }} = useForm({resolver});
    const [modalRecovery, setModalRecovery] = useState(false);

    return(
        <div className="h-screen w-screen bg-[#F7FFF7]">
            <div className="relative h-screen w-screen top-0">
              <div className="h-screen w-screen flex flex-col">
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
                      <span className="text-white text-4xl text-center pl-[20px] font-bold mb-10">
                          Login to HarBer.id
                      </span>
                
                    <div className="relative flex px-4">
                      <FormContainer>
                        <div className="space-y-5">
                          <Field label="Email" error={errors["email"]?.message}>
                            <Input {...register("email", { required: true })} />
                          </Field>
                          <Field label="Password" error={errors["password"]?.message} className>
                            <Input {...register("password", { required: true })} />
                          </Field>
                          <div className="flex flex-col">
                            <a className="text-white underline cursor-pointer" onClick={() => setModalRecovery(true)}>Forgot Password?</a>
                          <a className="text-white underline cursor-pointer" href="/register">Don’t have an account? Register here</a>
                          </div>
                          <div className="flex justify-end">
                            <Button onClick={handleSubmit(login)}>LOGIN</Button>
                          </div>
                        </div>
                      </FormContainer>
                    </div>
                  </Modal>
                  <ModalRecovery
                    open={modalRecovery}
                    // loading={editMissionMut.isLoading}
                    onClose={() => {
                      setModalRecovery(false);
                    }}
                    onSubmit={checkingAnswer}/>
                </div>
                <footer>
                    <div className="text-black font-semibold text-center text-[25px] pt-[30px] pb-[30px] flex self-center justify-center items-center">
                            <span>©2022-2023 HarBer.Id | All right reserved</span>
                    </div>
                </footer>
              </div>
            </div>
            
        </div>
    )
}

export default LoginPage;