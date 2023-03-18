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
import { axiosHarber, axiosLocal, getUserData } from "../../helpers/axios";
import { setAuthToken } from "../../services/AuthService";
import { useRouter } from "next/router";

const adminViewUserPage = () =>{
    const router = useRouter();
    const userListQuery = useQuery({
        queryKey: ["user-list"],
        queryFn: async () => {
        const token = localStorage.getItem("token");
          let result = await axiosLocal.get(`/user`,{
            // let result = await axiosHarber.get(`/user`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // for(let n = 0; n < result.data.length; n++){
        //     result.data[n].key = (n+1).toString() 
        //   }

        return result.data
        },
    });

    const [tokens, setToken] = useState()

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
            setToken(token);
            // setUsername(username);
        } else router.replace(`/admin`);
    })

    const logout = () =>{
        localStorage.removeItem("token")
        router.push(`/admin`)
    }

    const exportCsv = async() =>{
        getUserData()
        
    }


        const columnHelper = createColumnHelper();
        const columns = useMemo(
            () => [
            // columnHelper.accessor("id", {
            //     header: () => <span>User id</span>,
            //     cell: (info) => <p>{info.getValue()}</p>,
            // }),
            columnHelper.accessor("username", {
                header: () => <span>Nama</span>,
                cell: (info) => <p>{info.getValue()}</p>,
            }),
            columnHelper.accessor("email", {
                header: () => <span>Email</span>,
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("createdDate", {
                header: () => <span>Dibuat pada</span>,
                cell: (info) => new Date(info.getValue()).toLocaleString(),
            }),
            ],
            [userListQuery?.data]
        );

    return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col">
                <header className="pt-4 px-4 pb-[30px]">
                    <div className="relative overflow-hidden mx-auto items-center flex justify-between px-10 xs:px-2 sm:px-2">
                        <Image
                        src="/assets/images/harber.png"
                        alt=""
                        width={150}
                        height={70}
                        />
                        <div className="flex items-center space-x-1 cursor-pointer" onClick={(logout)} >
                            <LogoutIcon fontSize="large" className="cursor-pointer"/>
                            <span className="font-semibold xs:hidden sm:flex">Keluar</span>
                        </div>
                    </div>
                </header>
                <div className="w-screen h-screen flex flex-col">
                    <div className="flex justify-between px-[9%] xs:px-[5%] sm:px-[5%] md:px-[6%] lg:px-[7%] xl:px-[9%] mb-10">
                        <Text size={35} className="text-black font-bold">Daftar Pengguna</Text>
                        <Button onClick={exportCsv}>Ekspor .xlsx</Button>
                    </div>

                    <div className="z-30 flex items-center justify-center">
                        <div className="max-w-[1250px] xs:max-w-[450px] sm:max-w-[625px] md:max-w-[750px] lg:max-w-[950px] xl:max-w-[1250px] h-[425px] mx-auto bg-[#4ECDC4] drop-shadow-lg shadow-lg bg-contain bg-center rounded-[18px] w-full p-[30px]">
                        <TableGroup
                            selectionMode="none"
                            data={userListQuery?.data}
                            columns={columns}
                            tableOpt={
                                {
                                  autoResetPageIndex: false
                                }
                              }
                        />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default adminViewUserPage;