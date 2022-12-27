/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { toast} from "react-toastify";
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import Button from "../components/button/Button";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Footer from "../components/footer/Footer";
import { Link, Text } from "@nextui-org/react";


const productDetailPage = () =>{
    const [clicked, setClicked] = useState(false)

    const bookmark = () =>{
        // dikasih validasi user udh login atau gk, kl belum gk bisa akses page

    }

    const editProfile = () =>{
        // dikasih validasi user udh login atau gk, kl belum gk bisa akses page
    }

    const logout = () =>{
        
    }

    const addBookmark = () =>{
        setClicked(current => !current);
        if(clicked == true){
            console.log("bookmark remove")
        }else {
            toast.success("Added to your Wishlist")
            console.log("bookmark added")
        }
    }

    return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col bg-[#F7FFF7]">
                <header className="pt-4 pb-[2%]">
                    <div className="items-center justify-center flex sm:justify-between px-20">
                        <Link href="/">
                            <Image
                                src="/assets/images/harber.png"
                                alt=""
                                width={150}
                                height={70}
                            />   
                        </Link>
                            <div className="px-2">
                                <input type="text" placeholder="Search Keyword" className="mt-[1.5%] py-1 px-4 w-[400px] h-[35px] border-[#ABABAB] border-2 text-base text-black rounded-lg font-semibold"></input>
                            </div>
                            <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                                <BookmarksIcon fontSize="large" className="cursor-pointer" onClick={bookmark}/>
                                <Button onClick={() => window.location.href = "/login"}>LOGIN</Button>
                                {/* <LogoutIcon fontSize="large" onClick={(logout)} className="cursor-pointer"/> */}
                            </div>
                    </div>
                </header>

                <div className="h-screen w-screen flex flex-col bg-[#F7FFF7]">
                    <div className="flex flex-row ml-[25%] gap-x-10 mb-[10px]">
                        <div className="flex flex-col gap-y-[5px]">
                           <img
                            src="https://nextui.org/images/fruit-1.jpeg"
                            alt=""
                            width={300}
                            height={250}
                            className="rounded-md drop-shadow-lg"
                            />
                            <div className="flex flex-row items-center">
                                <IconButton onClick={addBookmark}>
                                    { clicked?
                                    <BookmarkIcon sx={{ fontSize: "45px" }}/> :  <BookmarkBorderIcon sx={{ fontSize: "45px" }}/> 
                                    }
                                </IconButton>
                                <span className="font-bold text-2xl">Wishlist</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col">
                            <Text size={30} className="font-bold tracking-[1px]">ITEM TITLE</Text>
                            <div className="mt-[15px] font-semibold flex flex-col text-slate-500 text-lg">
                                <span>CATEGORY</span>
                                <span>LOCATION</span>
                                <span>RATING</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-row ml-[23.7%] items-center">
                        <IconButton onClick={addBookmark}>
                            { clicked?
                               <BookmarkIcon  sx={{ fontSize: "45px" }}/> :  <BookmarkBorderIcon  sx={{ fontSize: "45px" }}/> 
                            }
                        </IconButton>
                        <span className="font-bold text-2xl">Wishlist</span>
                    </div> */}

                    <div className="mt-[50px] flex flex-col justify-center items-center bg-[#F7FFF7]">
                        <Text size={28} className="font-bold tracking-[1px] text-center mb-3">PRICE LIST FROM E-COMMERCE &#40;LOWEST TO HIGHEST&#41;</Text>
                        <div className="w-[900px] h-[100px] bg-[#FFFFFF] drop-shadow-lg mb-10 border-[#DEDEDE] border-2 rounded-lg">

                        </div>
                        <div className="w-[900px] h-[100px] bg-[#FFFFFF] drop-shadow-lg mb-10 border-[#DEDEDE] border-2 rounded-lg">
                                
                        </div>
                        <div className="w-[900px] h-[100px] bg-[#FFFFFF] drop-shadow-lg mb-10 border-[#DEDEDE] border-2 rounded-lg">
                                
                        </div>
                    </div>

                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default productDetailPage