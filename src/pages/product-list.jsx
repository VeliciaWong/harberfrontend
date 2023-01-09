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
import { axiosLocal} from "../helpers/axios";
import ProductPagination from "../pagination/ProductPagination";
import StarRateIcon from '@mui/icons-material/StarRate';
import { useRouter } from "next/router";
import { setAuthToken } from "../services/AuthService";

const productListPage = () =>{
    // const [product, setProduct] = useState([]);
    const [filter, setFilter] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState()
    const router = useRouter()

    // const getKeyword = async()=>{
    //     let result = getProductByKeyword(data.searchkeyword)
    //     console.log(result)
    // }

    // const productListQuery = useQuery({
    //     queryKey: ["product-list"],
    //     queryFn: async () => {
    //       let result = await axiosLocal.get(`/product`);
    //       return result.data;
    //     },
    // });
    

    const categoryListQuery = useQuery({
        queryKey: ["category-list"],
        queryFn: async () => {
          let result = await axiosLocal.get(`/category`);
          setDefaultCategory(result.data[0])
        //   console.log(result.data[1])
          return result.data;
        },
    });

    // const lokasiListQuery = useQuery({
    //     queryKey: ["lokasi-list"],
    //     queryFn: async () => {
    //       let result = await axiosLocal.get(`/`);
    //       return result.data;
    //     },
    // });

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
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setToken("")
        router.push(`/`)
    }
    
    const onSubmit = (data) =>{
        setFilter(data)
    }

    const searchKeyword = (data)=>{
        router.push({
            pathname: `/product-list/`,
            query: { "keyword": data.searchkeyword },
          })
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
                    <div className="items-center justify-center flex sm:justify-between px-20">
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
                                <form onSubmit={handleSubmit(searchKeyword)}>
                                    <input type="text" placeholder="Search Keyword" className="mt-[1.5%] py-1 px-4 w-[400px] h-[35px] border-[#ABABAB] border-2 shadow-lg text-base text-black rounded-lg font-semibold" {...register("searchkeyword")}></input> 
                                </form>
                                <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                                    <BookmarksIcon fontSize="large" className="cursor-pointer" onClick={bookmark}/>
                                    <AccountCircleIcon fontSize="large" className="cursor-pointer" onClick={editProfile}/>
                                    <LogoutIcon fontSize="large" onClick={(logout)} className="ml-[93%] cursor-pointer"/>
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="text" placeholder="Search Keyword" className="mt-[1.5%] py-1 px-4 w-[400px] h-[35px] border-[#ABABAB] border-2 shadow-lg text-base text-black rounded-lg font-semibold" {...register("searchkeyword")}></input> 
                            </form>
                            <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                                <Button onClick={() => window.location.href = "/login"}>LOGIN</Button>
                            </div>
                            </>
                        }
                    </div>
                </header>

                <div className="h-screen w-screen flex flex-col bg-[#F7FFF7]">
                    <div className="flex flex-row bg-[#F7FFF7]">
                        <div className="px-20 w-[350px] flex flex-col bg-[#F7FFF7]">
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

                        <div className="w-screen flex flex-col justify-center self-center">
                            <div className="mb-2">
                                <Text size={16} className="ml-[20px] font-bold">Results &quot;{router.query.keyword}&quot;</Text>
                            </div>
                            <div className="mr-[90px]">
                                {/* <Grid.Container gap={3} justify="flex-start">
                                {productListQuery.data?.map((item, index) => (
                                    <Grid xs={4} sm={3} key={index} >
                                    <Card isPressable isHoverable css={{width: "250px"}}>
                                        <Card.Body css={{ p: 0, height: "300px" }}>
                                        <Card.Image
                                            src={item.urlImage}
                                            objectFit="cover"
                                            width="100%"
                                            height={140}
                                            alt={item.name}
                                        />
                                        <Card.Footer css={{ justifyItems: "flex-start" }}>
                                            <Row wrap="wrap" justify="space-between" align="center">
                                                <Text b>{item.name}</Text>
                                                <div className="pt-2">
                                                    <Row wrap="wrap" justify="space-between">
                                                        <Text className="pr-3" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>Rp 
                                                        {item.price}
                                                        </Text>
                                                        <Text className="flex items-center" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}><StarRateIcon/>
                                                        {item.rating}
                                                        </Text>
                                                    </Row>
                                                    <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}> 
                                                    {item.location}
                                                    </Text>
                                                </div>
                                            </Row>
                                        </Card.Footer>
                                        </Card.Body>
                                    </Card>
                                    </Grid>
                                ))}
                                </Grid.Container> */}
                                {/* {console.log(filter.category?.id)} */}
                                <ProductPagination data={{keyword : router.query.keyword, filter: filter}}/>
                                {/* <ProductPagination setProduct= {(p) => setProduct(p)}/> */}
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