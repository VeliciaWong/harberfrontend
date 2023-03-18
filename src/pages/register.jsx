import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import Modal from "../components/modal/Modals";
import ModalSetRecovery from "../components/modal/ModalSetRecovery"
import * as React from 'react';
import * as yup from "yup";
import { useYupResolver } from "../helpers/yup";
import { useState} from "react";
import { useForm} from "react-hook-form";
import FormContainer  from "../components/forms/Container";
import Field  from "../components/forms/Field";
import { Input } from "../components/inputs";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { axiosHarber, axiosLocal } from "../helpers/axios";
import { useRouter } from "next/router";

const schema = yup.object().shape(
  {
    username: yup.string().required("Nama harus diisi"),
    email: yup.string().email('Format email tidak sesuai').required("Email harus diisi"),
    password: yup.string().required("Kata sandi harus diisi").min(8, "Kata sandi anda harus memiliki panjang 8 karakter")
    .matches(/[0-9]/, 'Kata sandi harus memiliki angka')
    .matches(/[a-z]/, 'Kata sandi harus memiliki huruf kecil')
    .matches(/[A-Z]/, 'Kata sandi harus memiliki huruf besar'),
    confirm_password: yup.string().required("Konfirmasi kata sandi harus diisi").oneOf([yup.ref('password')], 'Kata sandi tidak sesuai'),
  },
  []
);

const RegisterPage = () =>{
  const [modalChooseRecovery, setModalChooseRecovery] = useState(false);
  const [isShown, setIsSHown] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resolver = useYupResolver(schema);
  const { register, handleSubmit, control, formState: { errors }} = useForm({resolver});

//   useEffect(() => {
//     registers();
//     saveRecovery();
// });

  const registers = (data) =>{
    setUsername(data.username);
    setEmail(data.email);
    setPassword(data.password)
    setModalChooseRecovery(true);
  }

  const saveRecovery = async(data) =>{
    // nembak api buat nyimpen user + recovery
    // console.log(result.data);
    await axiosLocal.post(`/user/save`, {
      // await axiosHarber.post(`/user/save`, {
      "username": username,
      "password": password,
      "email": email,
      "questionRecovery":{
          "id":data.recoveryQuestion?.id
      },
      "answerRecovery": data.recovery_answer
  });
    toast.success("Akun anda berhasil dibuat !")
    await router.push(`/login`)
    // window.location.href="/login"
  }

    return(
        <div className="min-h-screen w-screen bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col">
                <div className="max-w-[150px] mt-[2%] mb-[2%] z-40 ml-[70px] xs:ml-[25px] sm:ml-[50px] lg:ml-[60px] xl:ml-[70px] cursor-pointer" onClick={() => window.location.href = "/"}>
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
                    <div className="text-white text-left pl-[20px] font-bold space-y-10 xs:space-y-2">
                        <span className="text-4xl xs:text-2xl lg:text-4xl">
                            Selamat Datang di HarBer.id
                        </span>
                        <p className="text-[30px] xs:text-[16px] md:text-[20px] lg:text-[30px] xs:hidden sm:flex">
                           Aplikasi Website Pembanding Harga Dari Beberapa E-commerce di Indonesia
                        </p>
                    </div>
              
                  <div className="relative flex px-4">
                    <FormContainer>
                      <div className="space-y-2">
                        <Field label="Nama" error={errors["username"]?.message}>
                          <Input {...register("username", { required: true })} />
                        </Field>
                        <Field label="Email" error={errors["email"]?.message}>
                          <Input {...register("email", { required: true })} />
                        </Field>
                        <Field label="Kata Sandi" error={errors["password"]?.message} className>
                          <Input  type={isShown ? "text" : "password"} {...register("password", { required: true })} />
                        </Field>
                        <Field label="Konfirmasi Kata Sandi" error={errors["confirm_password"]?.message} className>
                          <Input type={isShown ? "text" : "password"} {...register("confirm_password", { required: true })} />
                        </Field>
                        
                        <div className="flex justify-end pt-[3%]">
                          <Button onClick={handleSubmit(registers)}>DAFTAR</Button>
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
                    onSubmit={saveRecovery}
                  />
                </div>
                <footer>
                    <div className="text-black font-semibold text-center text-[25px] xs:text-[20px] lg:text-[25px] pt-[30px] pb-[30px] flex self-center justify-center items-center">
                            <span>©2022-2023 HarBer.Id | All right reserved</span>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default RegisterPage;