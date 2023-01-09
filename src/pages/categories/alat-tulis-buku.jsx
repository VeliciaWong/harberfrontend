import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "../../components/button/Button";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Footer from "../../components/footer/Footer";
import { axiosLocal } from "../../helpers/axios";
import { Card, Col, Grid, Link, Row, Text } from "@nextui-org/react";
import StarRateIcon from '@mui/icons-material/StarRate';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const alatTulisBukuPage = () =>{
  const [product, setProduct] = useState([]);
  const router = useRouter()

//   useEffect(() => {
//    getalatTulisBuku() 
//   }, []
//   )

//   const getalatTulisBuku = async () =>{
//     // let result = await Axios.post(`http://localhost:8080/harberid/webresources/product`, {
//     //   filterCategory: data.filterCategory,
//     // });

//     // let result = await Axios.get(`http://localhost:8080/harberid/webresources/product?filterCategory=1`);
//     // // console.log(result.data);
//     // return setProduct(result.data);

//     let result = await axiosLocal.get(`/product?categoryId.equals=1`);
//     console.log(result.data);
//     return setProduct(result.data);
  
//   }

const getalatTulisBuku = useQuery({
    queryKey: ["alatTulisBuku-list"],
    queryFn: async () => {
      let result = await axiosLocal.get(`/product?categoryId.equals=1`);

      return result.data;
    },
  });

    const logout = () =>{
        toast.warn("Logout !");
        // router.back();
    }

    const bookmark = () =>{

    }

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
                            <div className="hidden sm:flex sm:items-center sm:space-x-[14px]">
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
                            {/* {console.log(product)} */}
                            {getalatTulisBuku.data?.map((item, index) => (
                                <Grid xs={5} sm={3} key={index}>
                                <Card isPressable isHoverable css={{width: "350px"}} onClick={async() =>{
                                            const result = await axiosLocal.get(`/product/${item.id}`)
                                            console.log(result.data)
                                            router.push({
                                                pathname: `/product-detail/`,
                                                query: { "id": result.data.id },
                                              })
                                        }}>
                                    <Card.Body css={{ p: 0, height: "300px" }}>
                                      <Card.Image
                                          src={item.urlImage}
                                          objectFit="cover"
                                          width="100%"
                                          height={140}
                                          alt={item.name}
                                      />
                                      <Card.Footer css={{ justifyItems: "flex-start" }}>
                                        <div className="flex flex-col">
                                            <Text b fontSize={30}>{item.name}</Text>
                                            <div className="pt-2">
                                              <Row wrap="wrap" justify="space-between">
                                                <Text className="pr-3" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>Rp&nbsp; 
                                                  {item.price}
                                                  </Text>
                                                  <Text className="flex items-center" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}><StarRateIcon/>
                                                  {item.rating}
                                                  </Text>
                                              </Row>
                                              <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}> 
                                              {item.location}
                                              </Text>
                                              {
                                                item.ecommerce.name === "Tokopedia" ? <>
                                                  <Text css={{ color: "$green600", fontWeight: "$semibold", fontSize: "$sm" }}> 
                                                  {item.ecommerce.name}
                                                  </Text>
                                                </>:<>
                                                  {
                                                    item.ecommerce.name === "Shopee" ? <>
                                                      <Text css={{ color: "#F1582C", fontWeight: "$semibold", fontSize: "$sm" }}> 
                                                        {item.ecommerce.name}
                                                      </Text>
                                                    </>:<>
                                                      <Text css={{ color: "#0094D9", fontWeight: "$semibold", fontSize: "$sm" }}> 
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

export default alatTulisBukuPage;