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
import { axiosLocal } from "../../helpers/axios";
import { useRouter } from "next/router";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const recoveryChangePasswordPage = () =>{
    const schema = yup.object().shape(
        {
            password: yup.string().required("Field password is required").min(8, "Password must be 8 Characters long"),
            confirm_password: yup.string().required("Field confirm password is required").oneOf([yup.ref('password')], 'Password does not match'),
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
        const [isShown, setIsSHown] = useState(false);
        const router = useRouter();
        var userId = ""

        useEffect(() =>{
            if (router.isReady) {
                userId = router.query.id
            }
        }, [router.isReady])
        
        const saveRecoveryPassword = async(data) =>{
            // masukin api buat nyimpen pass recovery ini jadi pass baru di db
            await axiosLocal.put(`/user_reset/reset_password/${userId}`, {password : data.password})
            toast.success("Reset password Success!");
            router.push(`/login`)
            // window.location.href="/login"
        }
        return(
        <div className="relative h-screen w-screen bg-[#F7FFF7]">
            <div className={`relative h-screen w-screen overflow-hidden xl:px-30 3xl:px-[139px]`}>
                <div className="max-w-[150px] mt-[2%] mb-[2%] z-40 ml-[70px] cursor-pointer">
                    <Link href="/">
                            <Image
                                src="/assets/images/harber.png"
                                alt=""
                                width={150}
                                height={70}
                            />   
                    </Link>
                </div>
                <Text size={30} className="text-black font-bold text-center mb-[20px]">Change your Password</Text>
                <div className="max-w-[600px] h-[380px] mx-auto bg-[#4ECDC4] shadow-xl bg-contain bg-center rounded-[18px] w-full p-5 mb-[5%]">
                    <div className="relative w-full h-full mx-auto">
                        <div className='mt-[8%] flex flex-col justify-center items-center'>
                            <FormContainer>
                                <div className="space-y-10">
                                    <Field label="Password" error={errors["password"]?.message}>
                                        <Input type={isShown ? "text" : "password"} {...register("password", { required: true })} />
                                    </Field>
                                    <Field label="Confirm Password" error={errors["confirm_password"]?.message} className>
                                        <Input type={isShown ? "text" : "password"} {...register("confirm_password", { required: true })} />
                                    </Field>
                                    <div className="flex justify-end">
                                        <Button onSubmit={handleSubmit(saveRecoveryPassword)}>SAVE</Button>
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