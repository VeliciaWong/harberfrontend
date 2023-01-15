import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "../../components/button/Button";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from "../../components/footer/Footer";
import { Card, Grid, Link, Row, Text } from "@nextui-org/react";
import StarRateIcon from '@mui/icons-material/StarRate';
import { axiosHarber, axiosLocal } from "../../helpers/axios";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { setAuthToken } from "../../services/AuthService";

const perlengkapanRumahTanggaPage = () =>{
  const [product, setProduct] = useState([]);
  const router = useRouter()
  const [tokens, setToken] = useState()


  useEffect(()=>{
    const token = localStorage.getItem("token");
    // console.log(username)
    if (token) {
        setAuthToken(token);
        setToken(token)
    } else localStorage.removeItem("token");
})
  const getPerlengkapanRumah = useQuery({
    queryKey: ["perlengkapanRumah-list"],
    queryFn: async () => {
      // let result = await axiosLocal.get(`/product?categoryId.equals=6`);
      let result = await axiosHarber.get(`/product?categoryId.equals=6`);
      return result.data;
    },
  });

  const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("")
    router.push(`/`)
      // router.back();
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

    return(
      <div className="relative bg-[#F7FFF7]">
      <div className="h-screen w-screen flex flex-col">
          <header className="pt-4 pb-[3%]">
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
              <div className="flex justify-center items-center">
                <div className="w-[1000px] xs:w-[450px] sm:w-[650px] lg:w-[900px] xl:w-[1000px] h-[300px] xs:h-[200px] sm:h-[250px] lg:h-[300px] bg-[#4ECDC4] rounded-lg flex flex-col justify-center self-center items-center">
                    <span className="text-white text-center text-5xl xs:text-2xl sm:text-4xl lg:text-5xl font-bold">PERLENGKAPAN RUMAH TANGGA</span>
                </div>
              </div>
              

              <div className="flex justify-center self-center items-center pt-[50px] pb-[50px] px-10 bg-[#F7FFF7]">
                  <Grid.Container spacing={5} className="gap-y-[2rem]" justify="flex-start">
                      {/* {console.log(product)} */}
                      {getPerlengkapanRumah.data?.map((item, index) => (
                          <Grid xs={4} sm={3} md={3} lg={3} key={index} className="gap-x-6">
                          <Card isPressable isHoverable className="w-[300px] xs:w-[250px] sm:w-[250px] lg:w-[250px] xl:w-[300px]" onClick={async() =>{
                                      // const result = await axiosLocal.get(`/product/${item.id}`)
                                      let result = await axiosHarber.get(`/product?categoryId.equals=3`);
                                      console.log(result.data)
                                      router.push({
                                          pathname: `/product-detail/`,
                                          query: { "id": result.data.id },
                                        })
                                  }}>
                              <Card.Body css={{ p: 0}} className="h-[300px] xs:h-[250px] sm:h-[250px] lg:h-[250px] xl:h-[300px]">
                                <Card.Image
                                    src={item.urlImage}
                                    objectFit="cover"
                                    width="100%"
                                    height={140}
                                    alt={item.name}
                                />
                                <Card.Footer css={{ justifyItems: "flex-start" }}>
                                  <div className="flex flex-col">
                                      <Text b className="text-[15px] xs:text-[9px] sm:text-[12px] lg:text-[12px] xl:text-[15px]">{item.name}</Text>
                                      <div className="pt-1">
                                        <Row wrap="wrap" justify="space-between" className="flex items-center">
                                          <Text className="pr-3 text-[15px] xs:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[15px]" css={{ color: "$accents7", fontWeight: "$semibold"}}>Rp&nbsp; 
                                            {(item.price)?.toLocaleString()}
                                            </Text>
                                            <Text className="p-1 flex items-center text-[15px] xs:text-[12px] sm:text-[12px] lg:text-[12px]" css={{ color: "$accents7", fontWeight: "$semibold" }}><StarRateIcon fontSize="small"/>
                                            {item.rating}
                                            </Text>
                                        </Row>
                                        <Text css={{ color: "$accents7", fontWeight: "$semibold"}} className="text-[15px] xs:text-[10px] sm:text-[12px] lg:text-[12px] xl:text-[15px]"> 
                                        {item.location}
                                        </Text>
                                        {
                                          item.ecommerce.name === "Tokopedia" ? <>
                                            <Text css={{ color: "$green600", fontWeight: "$semibold" }} className="text-[15px] xs:text-[10px] sm:text-[12px] lg:text-[12px] xl:text-[15px]"> 
                                            {item.ecommerce.name}
                                            </Text>
                                          </>:<>
                                            {
                                              item.ecommerce.name === "Shopee" ? <>
                                                <Text css={{ color: "#F1582C", fontWeight: "$semibold" }} className="text-[15px] xs:text-[10px] sm:text-[12px] lg:text-[12px] xl:text-[15px]"> 
                                                  {item.ecommerce.name}
                                                </Text>
                                              </>:<>
                                                <Text css={{ color: "#0094D9", fontWeight: "$semibold"}} className="text-[15px] xs:text-[10px] sm:text-[12px] lg:text-[12px] xl:text-[15px]"> 
                                                {item.ecommerce.name}
                                              </Text>
                                              </>
                                            }
                                          </>
                                        }
                                      </div>
                                  </div>
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

export default perlengkapanRumahTanggaPage;