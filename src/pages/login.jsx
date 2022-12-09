import Image from "next/image";
import Button from "../components/button/Button";
import Modal from "../components/modal/Modal";
import { useEffect } from "react";

const login = () =>{
    window.location.href="/"
}

const ModalLogin = (props) => (
    <Modal {...props}>
      <div className="flex justify-between flex-row w-[500px] h-[150px] p-[10px]">
        <span className="text-white text-4xl text-left pl-[20px] font-bold mb-10">
            Welcome to HarBer.id
        </span>
      </div>
  
      <div className="relative flex justify-end px-4">
        <Button onClick={login}>Register/Login</Button>
      </div>
    </Modal>
  );

const LoginPage = () =>{
    return(
        <div className="h-screen w-screen bg-[#F7FFF7]">
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
            </div>
        </div>
    )
}

export default LoginPage;