/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast} from "react-toastify";
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import Button from "../components/button/Button";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Footer from "../components/footer/Footer";
import { Link, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { axiosHarber, axiosLocal, deleteWishlist } from "../helpers/axios";
import { saveWishlist } from "../helpers/axios";
import StarRateIcon from '@mui/icons-material/StarRate';
import { setAuthToken } from "../services/AuthService";


const productDetailPage = () =>{
    const [clicked, setClicked] = useState()
    const [product, setProduct] = useState([])
    const [wishlistId, setWishlistId] = useState()
    const [similiarProduct, setSimiliarProduct] = useState([])
    const router = useRouter()
    var similiar = "";
    var similiarName = "";
    // var similiarEcommerceId = "";
    const [tokens, setToken] = useState()

    useEffect(() =>{
        if (router.isReady) {
            getProductById(router.query.id);
            const token = localStorage.getItem("token");
            // console.log(token)
            if (token) {
                setAuthToken(token);
                setToken(token);
                checkIsWishlist(router.query.id);
            }
        }
    }, [router.isReady]);

    const checkIsWishlist = async(idParam)=>{
            const token = localStorage.getItem("token");
            // const result = await axiosLocal.get(`/check_wishlist/${idParam}`,{
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     } 
            // })
            const result = await axiosHarber.get(`/check_wishlist/${idParam}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                } 
            })
            // console.log(result.data)
            return (setClicked(result.data))
    }

    const getProductById = async (idParam) =>{
        // const result = await axiosLocal.get(`/product/${idParam}`)
        const result = await axiosHarber.get(`/product/${idParam}`)
        similiar = result.data.name?.split(" ",2)
        similiarName = similiar[0] + " " + similiar[1]
        // similiarEcommerceId = result.data.ecommerce.id
        let id = result.data.id;
        return (setProduct(result.data), getProductComparison(similiarName, id))
    }

    const getProductComparison = async(nameParam, idParam) =>{
        // const result = await axiosLocal.get(`/product?size=3&id.notIn=${idParam}&name.contains=${nameParam}&sort=price,ASC`)
        const result = await axiosHarber.get(`/product?size=3&id.notIn=${idParam}&name.contains=${nameParam}&sort=price,ASC`)
        // console.log(result.data)
        return setSimiliarProduct(result.data)
    }

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

    const addBookmark = () =>{
        if(clicked === true){
            deleteWishlist(router.query.id)
            setClicked("")
            toast.warn("Remove from your Wishlist")
            console.log("bookmark remove")
        }else {
            saveWishlist(router.query.id)
            setClicked(true)
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
                        {
                            tokens?<>
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
                            <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                                <Button onClick={() => window.location.href = "/login"}>LOGIN</Button>
                            </div>
                            </>
                        }
                    </div>
                </header>

                <div className="h-screen w-screen flex flex-col bg-[#F7FFF7]">
                    <div className="flex flex-row ml-[25%] gap-x-10 mb-[10px]">
                        <div className="flex flex-col gap-y-[5px]">
                           <img
                            src={product?.urlImage}
                            alt=""
                            width={300}
                            height={250}
                            className="rounded-md drop-shadow-lg"
                            />
                                {
                                    tokens?<>
                                        <div className="flex flex-row items-center">
                                            <IconButton onClick={addBookmark}>
                                                { clicked === true ?
                                                    <BookmarkIcon sx={{ fontSize: "45px" }}/> :  <BookmarkBorderIcon sx={{ fontSize: "45px" }}/> 
                                                }
                                            </IconButton> 
                                            <span className="font-bold text-2xl">Wishlist</span>
                                        </div>
                                    </>:<>
                                    </>
                                }
                        </div>
                        
                        <div className="flex flex-col">
                            <p className="font-bold tracking-[1px] w-[400px] text-2xl">{product?.name}</p>
                            <div className="mt-[15px] font-semibold flex flex-col text-slate-500 text-lg">
                                <span>Price: Rp&nbsp;{(product?.price)?.toLocaleString()}</span>
                                <span>Category: &nbsp;{product?.category?.name}</span>
                                <span>Location: &nbsp; {product?.location}</span>
                                <span>Ecommerce Origin: &nbsp;{product?.ecommerce?.name}</span>
                                <span>Shop Name: &nbsp;{product?.shopName}</span>
                                <span className="flex items-center">Rating: &nbsp;<StarRateIcon/>{product?.rating}</span>
                                <a href={product?.url} target="_blank" rel="noopener noreferrer" className="pt-[20px] underline text-[#4ECDC4]">GO TO PRODUCT URL</a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-[50px] flex flex-col justify-center items-center bg-[#F7FFF7]">
                        <Text size={28} className="font-bold tracking-[1px] text-center mb-[20px]">SIMILIAR PRODUCT FROM E-COMMERCE &#40;LOWEST TO HIGHEST&#41;</Text>
                        {   
                            // console.log(similiarProduct)
                            similiarProduct.map((item, index) => (
                                    <div className="w-[950px] h-[200px] bg-[#FFFFFF] drop-shadow-lg mb-10 border-[#DEDEDE] border-2 rounded-lg p-4" key={index}>
                                        <div className="flex flex-col">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                            <span className="font-bold text-[18px] text-[#4ECDC4]">{item.name}</span>
                                        </a> 
                                          <span className="font-semibold text-[19px]">Rp&nbsp;{(item.price)?.toLocaleString()}</span>
                                          {
                                            item.ecommerce.name === "Tokopedia" ? <>
                                            <Text css={{ color: "$green600", fontWeight: "$semibold", fontSize: "$lg" }}> 
                                                {item.ecommerce.name}
                                            </Text>
                                                </>:<>
                                                    {
                                                        item.ecommerce.name === "Shopee" ? <>
                                                        <Text css={{ color: "#F1582C", fontWeight: "$semibold", fontSize: "$lg" }}> 
                                                            {item.ecommerce.name}
                                                        </Text>
                                                        </>:<>
                                                        <Text css={{ color: "#0094D9", fontWeight: "$semibold", fontSize: "$lg" }}> 
                                                            {item.ecommerce.name}
                                                        </Text>
                                                        </>
                                                    }
                                                </>
                                        }
                                          <Button className="w-[140px] mt-[10px] flex flex-end text-center" onClick={async() =>{
                                            // const result = await axiosLocal.get(`/product/${item.id}`)
                                            const result = await axiosHarber.get(`/product/${item.id}`)
                                            router.push({
                                                pathname: `/product-detail/`,
                                                query: { "id": result.data.id },
                                              }).then(() => router.reload())
                                        }}>See Details</Button>
                                        </div>
                                    </div>
                            ))
                        }
                    </div>

                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default productDetailPage