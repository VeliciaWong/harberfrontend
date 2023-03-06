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
import { useRouter } from "next/router";
import { axiosHarber, axiosLocal } from "../../helpers/axios";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
      const router = useRouter();
      const [emails, setEmail] = useState()
      const [recoveryQuestion, setRecoveryQuestion] = useState()

      var userId = ""

      useEffect(() =>{
        // const email = localStorage.getItem("email");
        const recoveryQ = localStorage.getItem("userRecoveryQuestion");
        setRecoveryQuestion(recoveryQ);
        // setEmail(email);
        // console.log(emails)
        // getRecoveryQuestionById();
        if (router.isReady) {
            userId = router.query.id
        }
      }, [router.isReady])

    //   const getRecoveryQuestionById = async () =>{
    //     const result = await axiosLocal.post(`/user_reset`, emails)
    //     console.log(result.data)
    //   }

        const getRecoveryById = async(data)=>{
            // await axiosLocal.post(`/user_reset/answer_recovery/${userId}`, { answerRecovery: data.recovery_answer } ).then(response =>{
                await axiosHarber.post(`/user_reset/answer_recovery/${userId}`, { answerRecovery: data.recovery_answer } ).then(response =>{
                console.log(response)
              // console.log(response.data?.questionRecovery?.question)
                // localStorage.setItem("userRecoveryQuestion", response.data?.questionRecovery?.question)
                router.push({
                  pathname: `/recovery/change-password/`,
                  query: { "id": userId }
                })
              }).catch(error =>{
                toast.warn("Your answer recovery is incorrect!")
                console.log(error)
              })
        }

    return(
        <div className="relative h-screen w-screen bg-[#F7FFF7]">
            <div className={`relative h-screen w-screen overflow-hidden`}>
                <div className="max-w-[150px] mt-[2%] mb-[2%] z-40 ml-[70px] xs:ml-[25px] sm:ml-[50px] lg:ml-[60px] xl:ml-[70px] cursor-pointer">
                            <Image
                                src="/assets/images/harber.png"
                                alt=""
                                width={150}
                                height={70}
                            />   
                </div>
                <Text className="text-black text-[30px] xs:text-[20px] lg:text-[30px] font-bold text-center mb-[20px] xs:mt-4">Harap jawab pertanyaan pemulihan anda untuk memulihkan kata sandi anda</Text>
                <div className="max-w-[600px] xs:max-w-[450px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[650px] h-[380px] mx-auto bg-[#4ECDC4] shadow-xl bg-contain bg-center rounded-[18px] w-full p-5 mb-[5%]">
                    <div className="relative w-full h-full mx-auto">
                        <div className='mt-[8%] flex flex-col justify-center items-center'>
                                <Text size={25} className="text-white font-bold text-center italic">{recoveryQuestion}</Text>
                            <FormContainer>
                                <div className="space-y-10 mt-[20px]">
                                    <Field label="Jawaban" error={errors["recovery_answer"]?.message} className>
                                        <Input {...register("recovery_answer", { required: true })} />
                                    </Field>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSubmit(getRecoveryById)}>KIRIM</Button>
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