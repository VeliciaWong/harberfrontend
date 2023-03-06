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
    const [isLoading, setIsloading] = useState(true);

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
        console.log(similiar[0])
        similiarName = similiar[0] + " " + similiar[1]
        // similiarEcommerceId = result.data.ecommerce.id
        let id = result.data.id;
        return (setProduct(result.data), getProductComparison(similiarName, id))
    }

    const getProductComparison = async(nameParam, idParam) =>{
        // const result = await axiosLocal.get(`/product?size=3&id.notIn=${idParam}&name.contains=${nameParam}&sort=price,ASC`)
        const result = await axiosHarber.get(`/product?size=3&id.notIn=${idParam}&name.contains=${nameParam}&sort=price,ASC`)
        // console.log(result.data)
        setIsloading(false)
        return setSimiliarProduct(result.data)
    }

    const bookmark = () =>{
        router.push(`/wishlist`)
    }

    const editProfile = () =>{
        router.push(`/edit-profile`)
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
            toast.warn("Hapus dari Favorit anda")
            console.log("bookmark remove")
        }else {
            saveWishlist(router.query.id)
            setClicked(true)
            toast.success("Ditambahkan ke Favorit anda")
            console.log("bookmark added")
        }
    }

    return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col bg-[#F7FFF7] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
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
                               <div className="flex sm:items-center space-x-[15px]">
                                    <div className="flex items-center space-x-1 cursor-pointer" onClick={bookmark}>
                                        <BookmarksIcon fontSize="large"/>
                                        <span className="font-semibold xs:hidden sm:flex">Favorit</span>
                                    </div>
                                    <div className="flex items-center space-x-1 cursor-pointer" onClick={editProfile}>
                                        <AccountCircleIcon fontSize="large"/>
                                        <span className="font-semibold xs:hidden sm:flex">Profil</span>
                                    </div>
                                    <div className="flex items-center space-x-1 cursor-pointer" onClick={logout}>
                                      <LogoutIcon fontSize="large"/>
                                      <span className="font-semibold xs:hidden sm:flex">Keluar</span>
                                    </div>
                                </div>

                            </>:<>
                            <div className="sm:flex-end sm:space-x-[15px]">
                                <Button onClick={() => window.location.href = "/login"}>MASUK</Button>
                            </div>
                            </>
                        }
                    </div>
                </header>

                <div className="h-screen w-screen flex flex-col bg-[#F7FFF7]">
                    <div className="flex flex-row justify-center gap-x-10 xs:gap-x-5 lg:gap-x-10 mb-[10px]">
                        <div className="flex flex-col gap-y-[5px] p-2">
                           <img
                            src={product?.urlImage}
                            alt=""
                            width={300}
                            height={250}
                            className="rounded-md drop-shadow-lg"
                            />
                                {
                                    tokens?<>
                                        <div className="flex items-center">
                                            <IconButton onClick={addBookmark}>
                                                { clicked === true ?
                                                    <BookmarkIcon className="text-[45px] xs:text-[30px] sm:text-[45px]"/> :  <BookmarkBorderIcon className="text-[45px] xs:text-[30px] sm:text-[45px]"/> 
                                                }
                                            </IconButton> 
                                            <span className="font-bold text-2xl xs:text-lg sm:text-2xl">Favorit</span>
                                        </div>
                                    </>:<>
                                    </>
                                }
                        </div>
                        
                        <div className="flex flex-col">
                            <p className="mt-[10px] font-bold tracking-[1px] w-[400px] xs:w-[150px] sm:w-[200px] lg:w-[300px] xl:w-[400px] text-2xl xs:text-base sm:text-lg xl:text-2xl">{product?.name}</p>
                            <div className="mt-[10px] font-semibold flex flex-col text-slate-500 text-lg xs:text-sm lg:text-lg">
                                <span>Harga: Rp&nbsp;{(product?.price)?.toLocaleString()}</span>
                                <span>Kategori: &nbsp;{product?.category?.name}</span>
                                <span>Lokasi: &nbsp;{product?.location}</span>
                                <span>Asal E-commerce: &nbsp;{product?.ecommerce?.name}</span>
                                <span>Nama Toko: &nbsp;{product?.shopName}</span>
                                <span className="flex items-center">Penilaian: &nbsp;<StarRateIcon/>{product?.rating}</span>
                                <a href={product?.url} target="_blank" rel="noopener noreferrer" className="pt-[20px] underline text-[#4ECDC4]">GO TO PRODUCT URL</a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-[30px] flex flex-col justify-center items-center bg-[#F7FFF7]">
                        <Text className="text-[30px] xs:text-[20px] md:text-[25px] lg:text-[30px] font-bold tracking-[1px] text-center mb-[21px]">PRODUK SERUPA DARI E-COMMERCE &#40;HARGA TERENDAH KE TERTINGGI&#41;</Text>
                        {   
                            isLoading ?
                            <div className="font-bold flex justify-center items-center text-center text-3xl mb-8">
                                Memuat....
                            </div>:<>{
                                similiarProduct.length === 0 ? <>
                                    <div className="font-bold text-red-600 flex justify-center items-center text-center text-3xl xs:text-xl sm:text-2xl mb-4">
                                        TIDAK ADA PRODUK SERUPA
                                     </div>
                                </>:<>
                                    {
                                        similiarProduct.map((item, index) => (
                                            <div className="w-[950px] xs:w-[450px] sm:w-[600px] md:w-[750px] xl:w-[950px] h-[220px] content-center bg-[#FFFFFF] drop-shadow-lg mb-10 border-[#DEDEDE] border-2 rounded-lg p-4" key={index}>
                                                <div className="flex flex-col self-center">
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                    <span className="font-bold text-[16.5px] xs:text-[14px] sm:text-[16.5px] text-[#4ECDC4]">{item.name}</span>
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
                                                  <Button className="w-[140px] mt-[10px] flex text-center" onClick={async() =>{
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
                                </>
                            }</>
                            // console.log(similiarProduct)
                        }
                    </div>

                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default productDetailPage