import Head from "next/head";
import Image from "next/image";
import Button from "../components/button/Button";
import FormContainer  from "../components/forms/Container";
import Field  from "../components/forms/Field";
import { Input } from "../components/inputs";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import { Link, Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Footer from "../components/footer/Footer";
import { axiosHarber, axiosLocal } from "../helpers/axios";
import { setAuthToken } from "../services/AuthService";
import * as yup from "yup";
import { useYupResolver } from "../helpers/yup";

const schema = yup.object().shape(
    {
        username: yup.string().required("Nama harus diisi"),
        email: yup.string().email('Format email tidak sesuai').required("Email harus diisi"),
        password: yup.string().required("Kata sandi harus diisi").min(8, "Kata sandi anda harus memiliki panjang 8 karakter")
        .matches(/[0-9]/, 'Kata sandi harus memiliki angka')
        .matches(/[a-z]/, 'Kata sandi harus memiliki huruf kecil')
        .matches(/[A-Z]/, 'Kata sandi harus memiliki huruf besar'),
    },
    []
  );

const editProfilePage = () =>{
    const resolver = useYupResolver(schema);
    const { register, handleSubmit, control, formState: { errors }} = useForm({resolver});
    const router = useRouter();
    const [isShown, setIsSHown] = useState(false);
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [id, setId] = useState()
    const [tokens, setToken] = useState()
    
    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        router.push(`/`)
    }
    
    useEffect(()=>{
        getUserDetail();
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
            setToken(token);
            setUsername(username);
        } else router.replace(`/login`);
        // saveEditProfile()
    })
    
    const getUserDetail = async()=>{
        const token = localStorage.getItem("token");
        let result = await axiosLocal.get(`/user/see_my_profile`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        // let result = await axiosHarber.get(`/user/see_my_profile`,{
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        return(
            setUsername(result.data?.username),
            setEmail(result.data?.email),
            setId(result.data?.id)
            )
    }
        
        const saveEditProfile = async(data) =>{
            // masukin api buat nyimpen edit profile user
            const token = localStorage.getItem("token");
            await axiosLocal.put(`/user/${id}`, {
                username : data.username,
                password : data.password,
                email : data.email,
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res =>{
                toast.success("Save Success!");
                // localStorage.removeItem("token");
                localStorage.setItem("username", res.data?.username);
                router.push(`/`)
            }).catch(error =>{
                toast.warn("Username or email already registered!")
                console.log(error)
              })
            // await axiosHarber.put(`/user/${id}`, {
            //     username : data.username,
            //     password : data.password,
            //     email : data.email,
            // },{
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     }
            // })
            .then(res =>{
                toast.success("Perubahan tersimpan !");
                localStorage.setItem("username", res.data?.username);

                // if(res.data?.message == "Check Verifikasi Email!"){
                //     toast.info("Edit Success! Please check your mail to verification")
                // }else toast.success("Edit Success!");
                // // localStorage.removeItem("token");
                setTimeout(()=>{          
                    router.push(`/`).then(() => router.reload())
                }, 3000)
            }).catch(error =>{
                toast.warn("Nama atau email sudah diambil !")
                console.log(error)
              })
            // window.location.href="/"
        }
        return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col">
                <header className="pt-4 px-4 pb-[30px]">
                    <div className="relative overflow-hidden xl:px-32 3xl:px-[139px] mx-auto items-center flex justify-between px-10 xs:px-2 sm:px-2">
                        <Link href="/">
                                <Image
                                    src="/assets/images/harber.png"
                                    alt=""
                                    width={150}
                                    height={70}
                                />   
                        </Link>
                        <div className="flex sm:items-center space-x-[5px]">
                            <div className="flex items-center space-x-1 cursor-pointer" onClick={logout}>
                                <LogoutIcon fontSize="large"/>
                                <span className="font-semibold">Keluar</span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className={`relative h-screen w-screen overflow-hidden xl:px-30 3xl:px-[139px]`}>
                
                <Text size={30} className="text-black font-bold text-center mb-[20px]">Sunting Profil Saya</Text>
                <div className="max-w-[650px] xs:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] h-[380px] mx-auto bg-[#4ECDC4] shadow-xl bg-contain bg-center rounded-[18px] w-full p-5 mb-[5%]">
                    <div className="relative w-full h-full mx-auto">
                        <div className='mt-[2%] flex flex-col justify-center items-center'>
                            <FormContainer>
                                <div className="space-y-5">
                                    <Field label="Nama" error={errors["username"]?.message}>
                                        <Input defaultValue={username} {...register("username", { required: true })} />
                                    </Field>
                                    <Field label="Email" error={errors["email"]?.message}>
                                        <Input defaultValue={email} {...register("email", { required: true })} />
                                    </Field>
                                    <Field label="Kata Sandi" error={errors["password"]?.message} className>
                                        <Input type={isShown ? "text" : "password"} {...register("password", { required: true })} />
                                    </Field>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSubmit(saveEditProfile)}>SIMPAN</Button>
                                    </div>
                                </div>
                            </FormContainer>
                        </div>
                    </div>
                </div>
            </div>
                <Footer/>
            </div>
        </div>
    )
}

export default editProfilePage;