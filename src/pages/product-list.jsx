import Head from "next/head";
import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "../components/button/Button";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Footer from "../components/footer/Footer";
import Checkbox from "../components/inputs/Checkbox"
import { Card, Grid, Row, Text } from "@nextui-org/react";

const productListPage = () =>{
    const bookmark = () =>{
        // dikasih validasi user udh login atau gk, kl belum gk bisa akses page

    }

    const editProfile = () =>{
        // dikasih validasi user udh login atau gk, kl belum gk bisa akses page
    }

    const logout = () =>{
        
    }

    const list = [
        {
          title: "Orange",
          img: "/images/fruit-1.jpeg",
          price: "$5.50",
        },
        {
          title: "Tangerine",
          img: "/images/fruit-2.jpeg",
          price: "$3.00",
        },
        {
          title: "Cherry",
          img: "/images/fruit-3.jpeg",
          price: "$10.00",
        },
        {
          title: "Lemon",
          img: "/images/fruit-4.jpeg",
          price: "$5.30",
        },
        {
          title: "Avocado",
          img: "/images/fruit-5.jpeg",
          price: "$15.70",
        },
        {
          title: "Lemon 2",
          img: "/images/fruit-6.jpeg",
          price: "$8.00",
        },
        {
          title: "Banana",
          img: "/images/fruit-7.jpeg",
          price: "$7.50",
        },
        {
          title: "Watermelon",
          img: "/images/fruit-8.jpeg",
          price: "$12.20",
        },
        
      ];

    return(
        <div className="relative bg-[#F7FFF7]">
            <Head>
                <title>HarBer.id - Website Product Price Comparison from Various E-commerce in Indonesia</title>
                <meta name="description" content="HarBer.id description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen w-screen flex flex-col bg-[#F7FFF7]">
                <header className="pt-4 pb-[2%]">
                    <div className="items-center justify-center flex sm:justify-between px-20">
                            <Image
                            src="/assets/images/harber.png"
                            alt=""
                            width={150}
                            height={70}
                            />
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
                            <Text size={28} className="font-bold">Filter</Text>
                            <div className="w-[250px] h-[280px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                <Text size={21} className="font-bold">Kategori</Text>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Alat Tulis & Buku</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Pakaian</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Elektronik</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Kesehatan</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Makanan & Minuman</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Perlengkapan Rumah</span>
                                </div>
                            </div>
                            <div className="w-[250px] h-[140px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                <Text size={21} className="font-bold">Harga</Text>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Harga Terendah</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Harga Tertinggi</span>
                                </div>
                            </div>
                            <div className="w-[250px] h-[280px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                            <Text size={21} className="font-bold">Lokasi</Text>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">DKI Jakarta</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Sumatera</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Kalimantan</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Jawa</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Sulawesi</span>
                                </div>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">Lainnya</span>
                                </div>
                            </div>
                            <div className="w-[250px] h-[90px] bg-[#FFFFFF] border-[#DADADA] border-2 rounded-md mb-[20px] p-2 pl-4">
                                <Text size={21} className="font-bold">Rating</Text>
                                <div className="flex items-center">
                                    <Checkbox></Checkbox>
                                    <span className="font-semibold">4 keatas</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-screen flex flex-col justify-center self-center">
                            <div className="">
                                <Text size={16} className="ml-[20px] font-bold">Results "keyword"</Text>
                            </div>
                            <div className="mr-[90px]">
                                <Grid.Container gap={4} justify="flex-start">
                                {list.map((item, index) => (
                                    <Grid xs={6} sm={3} key={index}>
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