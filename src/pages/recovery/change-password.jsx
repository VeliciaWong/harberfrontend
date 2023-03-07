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
import { axiosHarber, axiosLocal } from "../../helpers/axios";
import { useRouter } from "next/router";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const recoveryChangePasswordPage = () =>{
    const schema = yup.object().shape(
        {
            password: yup.string().required("Kata sandi harus diisi").min(8, "Kata sandi anda harus memiliki panjang 8 karakter")
            .matches(/[0-9]/, 'Kata sandi harus memiliki angka')
            .matches(/[a-z]/, 'Kata sandi harus memiliki huruf kecil')
            .matches(/[A-Z]/, 'Kata sandi harus memiliki huruf besar'),
            confirm_password: yup.string().required("Konfirmasi kata sandi harus diisi").oneOf([yup.ref('password')], 'Kata sandi tidak sesuai'),
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
            // await axiosLocal.put(`/user_reset/reset_password/${userId}`, {password : data.password})
            await axiosHarber.put(`/user_reset/reset_password/${userId}`, {password : data.password})
            toast.success("Setel ulang kata sandi berhasil !");
            router.push(`/login`)
            // window.location.href="/login"
        }
        return(
        <div className="relative h-screen w-screen bg-[#F7FFF7]">
            <div className={`relative h-screen w-screen overflow-hidden xl:px-30 3xl:px-[139px]`}>
                <div className="max-w-[150px] mt-[2%] mb-[2%] z-40 ml-[70px] xs:ml-[25px] sm:ml-[50px] lg:ml-[60px] xl:ml-[70px]  cursor-pointer">
                            <Image
                                src="/assets/images/harber.png"
                                alt=""
                                width={150}
                                height={70}
                            />   
                </div>
                <Text className="text-black text-[30px] xs:text-[25px] lg:text-[30px] font-bold text-center mb-[20px] xs:mt-4">Ubah Kata Sandi Anda</Text>
                <div className="max-w-[600px] xs:max-w-[450px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[650px] h-[380px] mx-auto bg-[#4ECDC4] shadow-xl bg-contain bg-center rounded-[18px] w-full p-5 mb-[5%]">
                    <div className="relative w-full h-full mx-auto">
                        <div className='mt-[8%] flex flex-col justify-center items-center'>
                            <FormContainer>
                                <div className="space-y-10">
                                    <Field label="Kata Sandi" error={errors["password"]?.message}>
                                        <Input type={isShown ? "text" : "password"} {...register("password", { required: true })} />
                                    </Field>
                                    <Field label="Konfirmasi Kata Sandi" error={errors["confirm_password"]?.message} className>
                                        <Input type={isShown ? "text" : "password"} {...register("confirm_password", { required: true })} />
                                    </Field>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSubmit(saveRecoveryPassword)}>SIMPAN</Button>
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