import Head from "next/head";
import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "../components/button/Button";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Footer from "../components/footer/Footer";
import Checkbox from "../components/inputs/Checkbox"
import { Card, Grid, Link, Row, Text } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {useForm, Controller} from "react-hook-form"
import Input from "../components/inputs/Input"
import ListBoxInput from "../components/inputs/ListBox"
import Axios from "axios";
import ProductPagination from "../pagination/ProductPagination";

const productListPage = () =>{
    const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductWithKeyword()
    });


  const getProductWithKeyword = async() =>{
    let result = await Axios.get(`http://localhost:8080/harberid/webresources/product`);
    // console.log(result.data);
    // return setProduct(result.data);
  }

    const categoryListQuery = useQuery({
        queryKey: ["category-list"],
        queryFn: async () => {
          let result = await Axios.post(``);
          return result.data;
        },
    });

    const lokasiListQuery = useQuery({
        queryKey: ["lokasi-list"],
        queryFn: async () => {
          let result = await Axios.post(``);
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
        // dikasih validasi user udh login atau gk, kl belum gk bisa akses page

    }

    const editProfile = () =>{
        // dikasih validasi user udh login atau gk, kl belum gk bisa akses page
    }

    const logout = () =>{
        
    }
    
    const onSubmit = (data) =>{
        console.log(data);
        // let result = await Axios.post(``);
        // filterRating : data.value
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
                    <div className="flex flex-row bg-[#F7FFF7]">
                        <div className="px-20 w-[350px] flex flex-col bg-[#F7FFF7]">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Text size={28} className="font-bold">Filter</Text>
                                <div className="w-[250px] h-[110px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                    <Text size={21} className="font-bold">Kategori</Text>
                                    <ListBoxInput></ListBoxInput>
                                    <div className="items-center">
                                    {/* <Controller
                                        name="category"
                                        render={({ field }) => (
                                            <ListBoxInput
                                            {...field}
                                            options={categoryListQuery.data?.map((category) => ({
                                                id: category.categoryId,
                                                name: category.categoryName,
                                            }))}
                                            />
                                        )}
                                        rules={{
                                            required: true,
                                        }}
                                        control={control}
                                    /> */}
                                    </div>
                                </div>
                                <div className="w-[250px] h-[130px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                    <Text size={21} className="font-bold">Harga</Text>
                                    <div className="mt-1 flex flex-col gap-y-2">
                                        <Input placeholder="Minimum Price" {...register("minPrice")}></Input>
                                        <Input placeholder="Maximal Price" {...register("maxPrice")}></Input>  
                                    </div>
                                    
                                </div>
                                <div className="w-[250px] h-[110px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                <Text size={21} className="font-bold">Lokasi</Text>
                                <ListBoxInput></ListBoxInput>
                                    <div className="items-center">
                                    {/* <Controller
                                        name="lokasi"
                                        render={({ field }) => (
                                            <ListBoxInput
                                            {...field}
                                            options={lokasiListQuery.data?.map((location) => ({
                                                id: location.location_id,
                                                name: location.location_name,
                                            }))}
                                            />
                                        )}
                                        rules={{
                                            required: true,
                                        }}
                                        control={control}
                                    /> */}
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
                                <Button className="flex justify-self-end mb-[20px]">SUBMIT</Button>
                            </form>
                            
                        </div>

                        <div className="w-screen flex flex-col justify-center self-center">
                            <div className="">
                                <Text size={16} className="ml-[20px] font-bold">Results &quot;keyword&quot;</Text>
                            </div>
                            <div className="mr-[90px]">
                                <Grid.Container gap={3} justify="flex-start">
                                {product.map((item) => (
                                    <Grid xs={4} sm={3} key={item.id} >
                                    <Card isPressable isHoverable css={{width: "250px"}}>
                                        <Card.Body css={{ p: 0, height: "300px" }}>
                                        <Card.Image
                                            src={"https://nextui.org" + item.img}
                                            objectFit="cover"
                                            width="100%"
                                            height={140}
                                            alt={item.title}
                                        />
                                        <Card.Footer css={{ justifyItems: "flex-start" }}>
                                            <Row wrap="wrap" justify="space-between" align="center">
                                                <Text b>{item.title}</Text>
                                                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                                                {item.price}
                                                </Text>
                                            </Row>
                                        </Card.Footer>
                                        </Card.Body>
                                    </Card>
                                    </Grid>
                                ))}
                                </Grid.Container>
                                <ProductPagination setProduct= {(p) => setProduct(p)}/>
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