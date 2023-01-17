import Head from "next/head";
import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "../components/button/Button";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from "../components/footer/Footer";
import Checkbox from "../components/inputs/Checkbox"
import { Card, Grid, Link, Row, Text } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {useForm, Controller} from "react-hook-form"
import Input from "../components/inputs/Input"
import ListBoxInput from "../components/inputs/ListBox"
import Axios from "axios";
import { useRouter } from "next/router";
import WishlistPagination from "../pagination/WishlistPagination";
import { setAuthToken } from "../services/AuthService";
import { axiosHarber, axiosLocal } from "../helpers/axios";

const wishlistPage = () =>{
    // const [product, setProduct] = useState([]);
    const [filter, setFilter] = useState([]);
    const router = useRouter()

    const categoryListQuery = useQuery({
        queryKey: ["category-list"],
        queryFn: async () => {
        // let result = await axiosLocal.get(`/category`);
        let result = await axiosHarber.get(`/category`);
        return result.data;
        },
    });


const {
    register,
    control,
    watch,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

const ratingList = [
    {
        name: "5",
        value: 5
    },
    {
        name: "4",
        value: 4
    },
    {
        name: "3",
        value: 3
    },
    {
        name: "2",
        value: 2
    },
    {
        name: "1",
        value: 1
    },
]

    const bookmark = () =>{
        router.push(`/wishlist`)

    }

    const editProfile = () =>{
        // dikasih validasi user udh login atau gk, kl belum gk bisa akses page
        router.push(`/edit-profile`)
    }

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken("")
        router.push(`/`)
    }

    const onSubmit = (data) =>{
        setFilter(data)
    }

    const [tokens, setToken] = useState()
    const [usernames, setUsername] = useState()

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        // console.log(token)
        if (token) {
            setAuthToken(token);
            setToken(token);
            setUsername(username);
        } else router.replace(`/login`);
    })

    return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col bg-[#F7FFF7] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                <header className="pt-4 pb-[2%]">
                    <div className="items-center flex justify-between px-10 xs:px-5 sm:px-8">
                        {
                            tokens?<>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/harber.png"
                                        alt=""
                                        width={150}
                                        height={70}
                                    />   
                                </Link>
                                <div className="flex sm:items-center space-x-[15px]">
                                    <div className="flex items-center space-x-1 cursor-pointer" onClick={bookmark}>
                                        <BookmarksIcon fontSize="large"/>
                                        <span className="font-semibold xs:hidden sm:flex">Wishlist</span>
                                    </div>
                                    <div className="flex items-center space-x-1 cursor-pointer" onClick={editProfile}>
                                        <AccountCircleIcon fontSize="large"/>
                                        <span className="font-semibold xs:hidden sm:flex">Profile</span>
                                    </div>
                                    <div className="flex items-center space-x-1 cursor-pointer" onClick={logout}>
                                      <LogoutIcon fontSize="large"/>
                                      <span className="font-semibold xs:hidden sm:flex">Logout</span>
                                    </div>
                                </div>
                            </>:<>
                            <Link href="/">
                                <Image
                                    src="/assets/images/harber.png"
                                    alt=""
                                    width={150}
                                    height={70}
                                />   
                            </Link>
                            <div className="sm:flex-end sm:space-x-[15px]">
                                <Button onClick={() => window.location.href = "/login"}>LOGIN</Button>
                            </div>
                            </>
                        }
                    </div>
                </header>

                <div className="h-screen w-screen flex flex-col bg-[#F7FFF7]">
                    <Text className="text-[40px] xs:text-[30px] md:text-[40px] ml-[80px] xs:ml-5 sm:ml-[25px] lg:ml-[30px] xl:ml-[80px] font-bold">{usernames}&apos;s Wishlist</Text>
                    <div className="flex flex-row bg-[#F7FFF7]">
                        <div className="ml-[80px] xs:ml-5 sm:ml-[25px] lg:ml-[30px] xl:ml-[80px] w-[300px] flex flex-col bg-[#F7FFF7]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <Text size={28} className="font-bold">Filter</Text>
                                <div className="w-[250px] h-[110px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                    <Text size={21} className="font-bold">Kategori</Text>
                                    {/* <ListBoxInput></ListBoxInput> */}
                                    <div className="items-center">
                                    <Controller
                                        name="category"
                                        render={({ field }) => (
                                            <ListBoxInput
                                            {...field}
                                            options={categoryListQuery.data?.map((category) => ({
                                                id: category.id,
                                                name: category.name,
                                            }))}
                                            />
                                        )}
                                        rules={{
                                            required: true,
                                        }}
                                        control={control}
                                    />
                                    </div>
                                </div>
                                <div className="w-[250px] h-[130px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                    <Text size={21} className="font-bold">Harga</Text>
                                    <div className="mt-1 flex flex-col gap-y-2">
                                        <Input defaultValue="1000" placeholder="Minimum Price" {...register("minPrice")}></Input>
                                        <Input defaultValue="10000000" placeholder="Maximal Price" {...register("maxPrice")}></Input>  
                                    </div>
                                    
                                </div>
                                <div className="w-[250px] h-[100px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                <Text size={21} className="font-bold">Lokasi</Text>
                                    <div className="items-center">
                                    <Input defaultValue="Tangerang" placeholder="Location" {...register("location")}></Input>
                                    </div>
                                </div>
                                <div className="w-[250px] h-[110px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                    <Text size={21} className="font-bold">Rating</Text>
                                    <Controller
                                        name="rating"
                                        render={({ field }) => (
                                            <ListBoxInput
                                            {...field}
                                            options={ratingList}
                                            />
                                        )}
                                        rules={{
                                            required: true,
                                        }}
                                        control={control}
                                    />
                                </div>
                                <Button type="submit" className="flex justify-self-end mb-[20px]">SUBMIT</Button>
                            </form>   
                        </div>

                        <div className="mt-[10px] ml-[40px] w-screen flex flex-col justify-center self-center">
                                <WishlistPagination data={{filter: filter}}/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default wishlistPage;