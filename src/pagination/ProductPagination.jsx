import {Box, Pagination} from "@mui/material"
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosHarber, axiosLocal, getProductPage } from "../helpers/axios";
import { Card, Col, Grid, Link, Row, Text } from "@nextui-org/react";
import StarRateIcon from '@mui/icons-material/StarRate';
import { useRouter } from "next/router";


const pageSize = 8;

const ProductPagination = (data) =>{
    const [page, setPage] = useState(0)
    const [product, setProduct] = useState([])
    const [total, setTotal] = useState()
    const router = useRouter()

    useEffect(() => {
        const totalProducts = localStorage.getItem("totalProduct");
        setTotal(totalProducts);
        // console.log(data.data.keyword)
        // console.log(data.data.filter.category?.id)
        getProductPage(page, data.data?.keyword ? data.data?.keyword:"",data.data?.filter ? data.data?.filter:{}).then(json => setProduct(json))

    }, [page, data])

    // const content = product.data?.map((item, index) => {
    //         <Grid xs={4} sm={3} key={index} >
    //             <ProductCard item={item}/>  
    //         </Grid>
    // })

    const nextPage = () => setPage(prev => prev + 1)
    const totalPage = Math.ceil(total / pageSize);
    // const totalPage = Math.ceil(product.length / pageSize);
    const prevPage = () => setPage(prev => prev - 1)

    return (
        <>  
        {console.log(totalPage)}
            {
                product.length === 0 ?
                <div className="font-bold flex justify-center items-center text-center text-3xl">
                    There is no product
                </div>:<>
                <Grid.Container spacing={4} justify="flex-center" className="gap-y-[2rem]">
                    {product.map((item, index) => (
                                            <Grid xs={5} sm={4} md={3} key={index} className="gap-x-8">
                                            <Card isPressable isHoverable className="w-[250px] xs:w-[200px] sm:w-[200px] lg:w-[250px]" onClick={async() =>{
                                                // const result = await axiosLocal.get(`/product/${item.id}`)
                                                const result = await axiosHarber.get(`/product/${item.id}`)
                                                // console.log(result.data)
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
                                                    <Col wrap="wrap" align="left">
                                                        <Text b className="text-[14px] xs:text-[9px] sm:text-[11px] lg:text-[12px] xl:text-[14px]">{item.name}</Text>
                                                        <div className="pt-1">
                                                            <Row wrap="wrap" justify="left">
                                                                <Text className="pr-3 text-[15px] xs:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[15px]" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>Rp &nbsp;
                                                                {(item.price)?.toLocaleString()}
                                                                </Text>
                                                                <Text className="p-1 flex items-center text-[15px] xs:text-[12px] sm:text-[12px] lg:text-[12px]" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}><StarRateIcon fontSize="small"/>
                                                                {item.rating}
                                                                </Text>
                                                            </Row>
                                                            <Text css={{ color: "$accents7", fontWeight: "$semibold"}} className="text-[13px] xs:text-[10px] sm:text-[12px] lg:text-[12px] xl:text-[13px]"> 
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
                                                                    <Text css={{ color: "#F1582C", fontWeight: "$semibold"}} className="text-[15px] xs:text-[10px] sm:text-[12px] lg:text-[12px] xl:text-[15px]"> 
                                                                        {item.ecommerce.name}
                                                                    </Text>
                                                                    </>:<>
                                                                    <Text css={{ color: "#0094D9", fontWeight: "$semibold" }} className="text-[15px] xs:text-[10px] sm:text-[12px] lg:text-[12px] xl:text-[15px]"> 
                                                                    {item.ecommerce.name}
                                                                    </Text>
                                                                    </>
                                                                }
                                                                </>
                                                            }
                                                        </div>
                                                    </Col>
                                                </Card.Footer>
                                                </Card.Body>
                                            </Card>
                                            </Grid>
                                        ))}
                </Grid.Container>
                <nav className="flex justify-center content-center items-center mt-[2%] pb-[2%] font-semibold">
                    <button onClick={prevPage} disabled={page === 0} style={{
                        marginRight: "20px"
                    }}>Prev Page</button>
                    <button onClick={nextPage} disabled={page === totalPage}>Next Page</button>
                </nav>
                </>
            }
        </>
    )
}

export default ProductPagination