import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "../../components/button/Button";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Footer from "../../components/footer/Footer";
import Axios from "axios";
import { Card, Grid, Link, Row, Text } from "@nextui-org/react";

const alatTulisBukuPage = () =>{

  useEffect(() => {
   getalatTulisBuku() 
  }, []
  )

  const getalatTulisBuku = async () =>{
    // let result = await Axios.post(`http://localhost:8080/harberid/webresources/product`, {
    //   filterCategory: data.filterCategory,
    // });

    let result = await Axios.get(`http://localhost:8080/harberid/webresources/product?filterCategory=1`);
    console.log(result.data);
    return result.data;
  }

    const logout = () =>{
        toast.warn("Logout !");
        // router.back();
    }

    const bookmark = () =>{

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
            <div className="h-screen w-screen flex flex-col">
                <header className="pt-4 pb-[3%]">
                    <div className="items-center justify-center flex sm:justify-between px-10">
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

                <div className="h-screen w-screen flex flex-col">
                    <div className="flex justify-center items-center">
                      <div className="w-[1000px] h-[300px] bg-[#4ECDC4] rounded-lg flex flex-col justify-center self-center items-center">
                          <span className="text-white text-5xl font-bold">ALAT TULIS & BUKU</span>
                      </div>
                    </div>
                    

                    <div className="flex justify-center self-center items-center ml-[60px] pt-[50px] pb-[50px] px-10">
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
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default alatTulisBukuPage;