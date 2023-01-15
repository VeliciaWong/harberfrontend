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
import { axiosHarber, axiosLocal} from "../helpers/axios";
import ProductPagination from "../pagination/ProductPagination";
import StarRateIcon from '@mui/icons-material/StarRate';
import { useRouter } from "next/router";
import { setAuthToken } from "../services/AuthService";

const productListPage = () =>{
    // const [product, setProduct] = useState([]);
    const [filter, setFilter] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState()
    const router = useRouter()
    
    const categoryListQuery = useQuery({
        queryKey: ["category-list"],
        queryFn: async () => {
        //   let result = await axiosLocal.get(`/category`);
        let result = await axiosHarber.get(`/category`);
          setDefaultCategory(result.data[0])
        //   console.log(result.data[1])
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

      const searchkeywords = async (data)=>{
        router.push({
            pathname: `/product-list/`,
            query: { "keyword": data.searchkeyword },
          })
        // console.log(data.searchkeyword);
    }

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
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setToken("")
        router.push(`/`)
    }
    
    const onSubmit = (data) =>{
        setFilter(data)
    }

    const [tokens, setToken] = useState()

    useEffect(()=>{
        const token = localStorage.getItem("token");
        // const username = localStorage.getItem("username");
        // console.log(username)
        if (token) {
            setAuthToken(token);
            setToken(token)
        }
    })

    return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col bg-[#F7FFF7]">
                <header className="pt-4 pb-[2%]">
                    <div className="items-center flex justify-between px-10 xs:px-3 sm:px-6">
                        <Link href="/">
                            <Image
                                src="/assets/images/harber.png"
                                alt=""
                                width={150}
                                height={70}
                            />   
                        </Link>
                        {
                            tokens?<>
                                <div className="flex sm:items-center space-x-[5px]">
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
                            <div className="sm:flex-end sm:space-x-[15px]">
                                <Button onClick={() => window.location.href = "/login"}>LOGIN</Button>
                            </div>
                            </>
                        }
                    </div>
                </header>

                <div className="h-screen w-screen flex flex-col bg-[#F7FFF7]">
                    <div className="flex flex-row bg-[#F7FFF7]">
                        <div className="xs:hidden px-20 sm:px-10 lg:px-20 w-[350px] sm:flex flex-col bg-[#F7FFF7]">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Text size={28} className="font-bold">Filter</Text>
                                <div className="w-[250px] sm:w-[200px] lg:w-[250px] h-[110px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
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
                                <div className="w-[250px] sm:w-[200px] lg:w-[250px] h-[130px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                    <Text size={21} className="font-bold">Harga</Text>
                                    <div className="mt-1 flex flex-col gap-y-2">
                                        <Input defaultValue="1000" placeholder="Minimum Price" {...register("minPrice")}></Input>
                                        <Input defaultValue="10000000" placeholder="Maximal Price" {...register("maxPrice")}></Input>  
                                    </div>
                                    
                                </div>
                                <div className="w-[250px] sm:w-[200px] lg:w-[250px] h-[100px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                <Text size={21} className="font-bold">Lokasi</Text>
                                    <div className="items-center">
                                    <Input defaultValue="Tangerang" placeholder="Location" {...register("location")}></Input>
                                    </div>
                                </div>
                                <div className="w-[250px] sm:w-[200px] lg:w-[250px] h-[110px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
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

                        <div className="w-screen flex flex-col justify-center self-center">
                            <div className="pt-[50px]">
                                {router.query.keyword ? <>
                                <Text size={16} className="ml-[20px] font-bold">Results &quot;{router.query.keyword}&quot;</Text>
                                
                                </>:<>
                                <div></div>
                                </>}
                            </div>
                            <div className="mr-[90px]">
                                <ProductPagination data={{keyword : router.query.keyword, filter: filter}}/>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default productListPage;