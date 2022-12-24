import React, { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

export default function Home(){
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          paritialVisibilityGutter: 60
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          paritialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          paritialVisibilityGutter: 20
        }
      };

    const bookmark = () =>{
        // dikasih validasi user udh login atau gk, kl belum gk bisa akses page

    }

    const editProfile = () =>{
        // dikasih validasi user udh login atau gk, kl belum gk bisa akses page
    }

    const logout = () =>{
        
    }

    return(
        <div className="relative bg-[#F7FFF7]">
            <div className="h-screen w-screen flex flex-col">
                <header className="pt-4 px-10 pb-[3%]">
                    <div className="items-center justify-center flex sm:justify-between px-10">
                        {/* bikin kondisi kl misalnya blm login headernya munculin yg mana, login yg mana*/}
                        {/* buat greetings user, nanti tarik dari BE buat ambil username user */}
                        <span className="font-bold text-2xl">Hi</span>
                        <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
                            <BookmarksIcon fontSize="large" className="cursor-pointer" onClick={bookmark}/>
                            <Buttons onClick={() => window.location.href = "/login"}>LOGIN</Buttons>
                        </div>
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
                        
                        <input type="text" placeholder="Search Keyword" className="mt-[1.5%] py-1 px-4 w-[400px] h-[35px] border-[#ABABAB] border-2 shadow-lg text-base text-black rounded-lg font-semibold"></input>
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
                            </div>
                            <div className="grid grid-cols-3 gap-x-[30px]">
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
                            <Fragment>
                                <Section>
                                    <Carousel
                                        ssr={true}
                                        additionalTransfrom={0}
                                        arrows
                                        autoPlaySpeed={3000}
                                        centerMode={false}
                                        className=""
                                        containerClass="carousel-container"
                                        dotListClass=""
                                        draggable
                                        focusOnSelect={false}
                                        infinite={false}
                                        itemClass=""
                                        keyBoardControl
                                        minimumTouchDrag={80}
                                        pauseOnHover
                                        renderArrowsWhenDisabled={false}
                                        renderButtonGroupOutside={false}
                                        renderDotsOutside={false}
                                        responsive={responsive}
                                        rewind={false}
                                        rewindWithAnimation={false}
                                        rtl={false}
                                        shouldResetAutoplay
                                        showDots={false}
                                        sliderClass=""
                                        slidesToSlide={2}
                                        swipeable
                                        >
                                            <Card sx={{ maxWidth: 250 }}>
                                                <CardActionArea style={{height: "300px"}}>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image=""
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Lizard
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                                        species, ranging across all continents except Antarctica
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                            <Card sx={{ maxWidth: 250 }}>
                                                <CardActionArea style={{height: "300px"}}>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image=""
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Lizard
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                                        species, ranging across all continents except Antarctica
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                            <Card sx={{ maxWidth: 250 }}>
                                                <CardActionArea style={{height: "300px"}}>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image=""
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Lizard
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                                        species, ranging across all continents except Antarctica
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                            <Card sx={{ maxWidth: 250 }}>
                                                <CardActionArea style={{height: "300px"}}>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image=""
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Lizard
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                                        species, ranging across all continents except Antarctica
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                            <Card sx={{ maxWidth: 250 }}>
                                                <CardActionArea style={{height: "300px"}}>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image=""
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Lizard
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                                        species, ranging across all continents except Antarctica
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                    </Carousel>
                                </Section>
                            </Fragment>
                        </div>
                    </div>
                    <Footer/>
                </div>     
            </div>
        </div>
    )
}