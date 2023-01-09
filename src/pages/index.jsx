import React, { Fragment, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Buttons from "../components/button/Button";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from "../components/inputs";
import Section from "../components/carousel/Section"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import { Text } from "@nextui-org/react";
import Footer from "../components/footer/Footer";
import SliderofCards from "../components/carousel/SliderofCard";
import {useForm, Controller} from "react-hook-form"
import {axiosLocal, getProductByKeyword} from "../helpers/axios";
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { setAuthToken } from "../services/AuthService";

export default function Home(){
    const [usernames, setUsername] = useState([]);
    const router = useRouter()
    // useEffect(() => {
    //     onSubmit() 
    //    }, []
    //    )

    const {
        register,
        control,
        watch,
        handleSubmit,
        resetField,
        formState: { errors },
      } = useForm();

    const onSubmit = async (data)=>{
        // let result = await axiosLocal.get(`/product`, {params: {
        //     name.contains : data.searchkeyword,
        // }});
        // let result = getProductByKeyword(data.searchkeyword)
        // console.log(result)
        router.push({
            pathname: `/product-list/`,
            query: { "keyword": data.searchkeyword },
          })
        // console.log(data.searchkeyword);
    }

    const bookmark = () =>{
        router.push(`/wishlist`)

    }

    const editProfile = () =>{
        router.push(`/edit-profile`)
        // router.push({
        //     pathname: `/edit-profile/`,
        //     query: { "id": userId}
        // })
    }

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken("")
        router.push(`/`)
    }
    const [tokens, setToken] = useState()

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        // console.log(username)
        if (token) {
            setAuthToken(token);
            setToken(token)
            setUsername(username)
        } else localStorage.removeItem("token");
    })

    return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col">
                <header className="pt-4 px-10 pb-[3%]">
                    <div className="items-center justify-center flex sm:justify-between px-10">
                        {
                            tokens?<>
                                <div>
                                    <span className="font-bold text-2xl">Hi, {usernames}</span>  
                                </div>
                                <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                                    <BookmarksIcon fontSize="large" className="cursor-pointer" onClick={bookmark}/>
                                    <AccountCircleIcon fontSize="large" className="cursor-pointer" onClick={editProfile}/>
                                    <LogoutIcon fontSize="large" onClick={(logout)} className="ml-[93%] cursor-pointer"/>
                                </div>
                            </>:<>
                            <div>
                                {/* <span className="font-bold text-2xl">Hi</span>   */}
                            </div>
                            <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                                <Buttons onClick={() => window.location.href = "/login"}>LOGIN</Buttons>
                            </div>
                            </>
                        }
                        {/* bikin kondisi kl misalnya blm login headernya munculin yg mana, login yg mana*/}
                        {/* buat greetings user, nanti tarik dari BE buat ambil username user */}
                        {/* <div>
                          <span className="font-bold text-2xl">Hi</span>  
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                            <BookmarksIcon fontSize="large" className="cursor-pointer" onClick={bookmark}/>
                            <Buttons onClick={() => window.location.href = "/login"}>LOGIN</Buttons>
                        </div> */}
                        {/* <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                            <BookmarksIcon fontSize="large" className="cursor-pointer" onClick={bookmark}/>
                            <AccountCircleIcon fontSize="large" className="cursor-pointer" onClick={editProfile}/>
                            <LogoutIcon fontSize="large" onClick={(logout)} className="ml-[93%] cursor-pointer"/>
                        </div> */}
                    </div>
                </header>
                <div className="h-screen w-screen flex flex-col">
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src="/assets/images/harber.png"
                            alt=""
                            width={300}
                            height={150}
                        />
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                           <input type="text" placeholder="Search Keyword" className="mt-[1.5%] py-1 px-4 w-[400px] h-[35px] border-[#ABABAB] border-2 shadow-lg text-base text-black rounded-lg font-semibold" {...register("searchkeyword")}></input> 
                        </form>
                    </div>
                    
                    <div className="bg-[#F7FFF7] relative flex flex-col">
                      <Text size={20} className="text-black font-bold mb-[20px] pt-[8%] text-3xl text-center">PROMOS</Text>
                        <div className="flex flex-row justify-center items-center gap-x-6 relative sm:gap-x-2 md:gap-x-6">
                            <a href="https://www.tokopedia.com/promo/" target="_blank" rel="noopener noreferrer">
                                <div className="w-[350px] h-[150px] bg-[#54C55B] flex shrink items-center justify-center rounded-lg drop-shadow-lg shadow-lg cursor-pointer sm:w-[190px] md:w-[300px]">
                                    <img
                                        src="/assets/images/tokopedia.png"
                                        alt=""
                                        className="p-[10px] w-[200px] sm:w-[150px] md:w-[200px]"
                                    />
                                </div>
                            </a>

                            <a href="https://shopee.co.id/campaigns/" target="_blank" rel="noopener noreferrer">
                                <div className="w-[350px] h-[150px] bg-[#F1582C] flex items-center justify-center rounded-lg drop-shadow-lg shadow-lg cursor-pointer sm:w-[190px] md:w-[300px]">
                                    <img
                                        src="/assets/images/shopee.png"
                                        alt=""
                                        className="p-[10px] w-[200px] sm:w-[150px] md:w-[200px]"
                                    />
                                </div>
                            </a>

                            <a href="https://www.blibli.com/promosi/" target="_blank" rel="noopener noreferrer">
                                <div className="w-[350px] h-[150px] bg-[#0094D9] flex items-center justify-center rounded-lg drop-shadow-lg shadow-lg cursor-pointer sm:w-[190px] md:w-[300px]">
                                    <img
                                        src="/assets/images/blibli.png"
                                        alt=""
                                        className="p-[10px] w-[200px] sm:w-[150px] md:w-[200px]"
                                    />
                                </div>
                            </a>
                        </div>

                        <Text size={20} className="text-black font-bold mb-[20px] pt-[10%] text-3xl text-center">CATEGORIES</Text>
                        <div className="flex flex-col justify-center items-center gap-y-[50px]">
                            <div className="grid grid-cols-3 gap-x-[30px]">
                                <Card sx={{ maxWidth: 250 }} style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}} onClick={() => window.location.href = "/categories/alat-tulis-buku"}>
                                    <CardActionArea style={{height: "300px"}}>
                                        <CardMedia
                                        component="img"
                                        height="150"
                                        image="/assets/images/alat-tulis-buku.jpg"
                                        alt=""
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className="text-center font-semibold">
                                            Alat Tulis & Buku
                                        </Typography>
                                        
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                                <Card sx={{ maxWidth: 250 }} style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}} onClick={() => window.location.href = "/categories/elektronik"}>
                                    <CardActionArea style={{height: "300px"}}>
                                        <CardMedia
                                        component="img"
                                        height="150"
                                        image="/assets/images/elektronik.jpg"
                                        alt=""
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className="text-center font-semibold">
                                            Elektronik
                                        </Typography>
                                        
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <Card sx={{ maxWidth: 250 }} style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}} onClick={() => window.location.href = "/categories/kesehatan"}>
                                    <CardActionArea style={{height: "300px"}}>
                                        <CardMedia
                                        component="img"
                                        height="150"
                                        image="/assets/images/kesehatan.png"
                                        alt=""
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className="text-center font-semibold">
                                            Kesehatan
                                        </Typography>
                                        
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                            <div className="grid grid-cols-3 gap-x-[30px]">
                                <Card sx={{ maxWidth: 250 }} style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}} onClick={() => window.location.href = "/categories/makanan-minuman"}>
                                    <CardActionArea style={{height: "300px"}}>
                                        <CardMedia
                                        component="img"
                                        height="150"
                                        image="/assets/images/makanan-minuman.jpg"
                                        alt=""
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className="text-center font-semibold">
                                            Makanan & Minuman
                                        </Typography>
                                        
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <Card sx={{ maxWidth: 250 }} style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}} onClick={() => window.location.href = "/categories/pakaian"}>
                                    <CardActionArea style={{height: "300px"}}>
                                        <CardMedia
                                        component="img"
                                        height="150"
                                        image="/assets/images/pakaian.png"
                                        alt=""
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className="text-center font-semibold">
                                            Pakaian
                                        </Typography>
                                        
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <Card sx={{ maxWidth: 250 }} style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}} onClick={() => window.location.href = "/categories/perlengkapan-rumah"}>
                                    <CardActionArea style={{height: "300px"}}>
                                        <CardMedia
                                        component="img"
                                        height="150"
                                        image="/assets/images/perlengkapan-rumah.png"
                                        alt=""
                                        style={{height: "200px", width: "200px", marginLeft: "20px"}}
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className="text-center font-semibold">
                                            Perlengkapan Rumah Tangga
                                        </Typography>
                                        
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </div>

                        <div className="bg-[#4ECDC4] w-[200px] mb-[20px] mt-[5%] p-2 rounded-lg flex items-center justify-center content-center self-center">
                            <Text size={20} className="text-white text-center font-bold text-3xl">FOR YOU</Text>
                        </div>
                        <div className="mb-[20px]">
                            <SliderofCards></SliderofCards>
                        </div>
                    </div>
                    <Footer/>
                </div>     
            </div>
        </div>
    )
}