import Head from "next/head";
import Image from "next/image";
import Button from "../../components/button/Button";
import {TableGroup } from "../../components/tables";
import { useState, useEffect, useRef, useMemo } from "react";
import { Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast} from "react-toastify";
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../components/footer/Footer";
import { createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { axiosLocal } from "../../helpers/axios";
import { setAuthToken } from "../../services/AuthService";
import { useRouter } from "next/router";

const adminViewUserPage = () =>{
    const router = useRouter();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
        } else localStorage.removeItem("token");
    })

    const logout = () =>{
        localStorage.removeItem("token")
        router.push(`/admin`)
    }

    const exportCsv = () =>{

    }

    const userListQuery = useQuery({
        queryKey: ["user-list"],
        queryFn: async () => {
        const token = localStorage.getItem("token");
          let result = await axiosLocal.get(`/user`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
          return result.data;
        },
      });

        const columnHelper = createColumnHelper();
        const columns = useMemo(
            () => [
            columnHelper.accessor("id", {
                header: () => <span>No</span>,
                cell: (info) => <p>{info.getValue()}</p>,
            }),
            columnHelper.accessor("username", {
                header: () => <span>Username</span>,
                cell: (info) => <p>{info.getValue()}</p>,
            }),
            columnHelper.accessor("role.name", {
                header: () => <span>Role</span>,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("email", {
                header: () => <span>email</span>,
                cell: (info) => info.getValue(),
            }),
            ],
            []
        );

    return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col">
                <header className="pt-4 px-4 pb-[30px]">
                    <div className="relative overflow-hidden xl:px-32 3xl:px-[139px] mx-auto items-center justify-center flex sm:justify-between">
                        <Image
                        src="/assets/images/harber.png"
                        alt=""
                        width={150}
                        height={70}
                        />
                        <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                            <LogoutIcon fontSize="large" onClick={(logout)} className="cursor-pointer"/>
                        </div>
                    </div>
                </header>
                <div className="w-screen h-screen flex flex-col">
                    <div className="flex justify-between px-[9.5%] mb-10">
                        <Text size={35} className="text-black font-bold">List of Users</Text>
                        <Button onClick={exportCsv}>Export .csv</Button>
                    </div>

                    <div className="z-30 flex items-center justify-center">
                        <div className="max-w-[1250px] h-[450px] mx-auto bg-[#4ECDC4] drop-shadow-lg shadow-lg bg-contain bg-center rounded-[18px] w-full p-[30px]">
                        <TableGroup
                            keyProp="user_id"
                            selectionMode="none"
                            data={userListQuery.data}
                            columns={columns}
                        />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default adminViewUserPage;