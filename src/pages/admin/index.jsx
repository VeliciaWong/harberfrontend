import Head from "next/head";
import Image from "next/image";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modals";
import ModalRecovery from "../../components/modal/ModalRecovery";
import * as React from 'react';
import * as yup from "yup";
import { useYupResolver } from "../../helpers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormContainer  from "../../components/forms/Container";
import Field  from "../../components/forms/Field";
import { Input } from "../../components/inputs";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import qs from "qs"
import { setAuthToken } from "../../services/AuthService";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

const schema = yup.object().shape(
  {
    username: yup.string().required("Field username is required"),
    password: yup.string().required("Field password is required"),
    
  },
);


const AdminLoginPage = () =>{
  const resolver = useYupResolver(schema);
  const { register, handleSubmit, control, formState: { errors }} = useForm({resolver});
  const [isShown, setIsSHown] = useState(false);
  const router = useRouter();
  
  const login = async (data) =>{
    // await axios({
    //   method: 'post',
    //   url: 'http://localhost:8091/api/login',
    //   data: qs.stringify({
    //     username: data.username,
    //     password: data.password
    //   }),
    //   headers: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   }
    // })

    await axios({
      method: 'post',
      url: 'https://harber.herokuapp.com/api/login',
      data: qs.stringify({
        username: data.username,
        password: data.password
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(response => {
      //get token from response
      const token  =  response.data?.access_token;
      const role = response.data?.role;
      // const username  =  response.data?.username;
      // console.log(username)
  
      //set JWT token to local
      if(role === "Admin"){
          localStorage.setItem("token", token);
      
          //set token to axios common header
          setAuthToken(token);
      
          //redirect user to home page
          router.push({
            pathname: `/admin/view-user`,
            // query: { "token": token },
          })
      }else {
        toast.error("You don't have Admin role!");
      }
    })
    .catch(err => {
      toast.error("Your Email/Password is incorrect!")
      console.log(err)
    });
  }
    return(
        <div className="h-screen w-screen bg-[#F7FFF7]">
            <div className="relative h-screen w-screen top-0">
              <div className="h-screen w-screen flex flex-col">
                <div className="max-w-[150px] mt-[2%] mb-[2%] z-40 ml-[70px] cursor-pointer">
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
                          Admin Login HarBer.id
                      </span>
                
                    <div className="relative flex px-4">
                      <FormContainer>
                        <div className="space-y-5">
                          <Field label="Username" error={errors["username"]?.message}>
                            <Input {...register("username", { required: true })} />
                          </Field>
                          <Field label="Password" error={errors["password"]?.message} className>
                            <Input type={isShown ? "text" : "password"} {...register("password", { required: true })} />
                          </Field>
                          <div className="flex justify-end">
                            <Button onClick={handleSubmit(login)}>LOGIN</Button>
                          </div>
                        </div>
                      </FormContainer>
                    </div>
                  </Modal>
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

export default AdminLoginPage;