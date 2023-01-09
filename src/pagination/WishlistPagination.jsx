import {Box, Pagination} from "@mui/material"
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosLocal, getWishlistPage } from "../helpers/axios";
import { Card, Col, Grid, Link, Row, Text } from "@nextui-org/react";
import StarRateIcon from '@mui/icons-material/StarRate';
import { useRouter } from "next/router";
import { setAuthToken } from "../services/AuthService";


const pageSize = 8;

// export default function ProductPagination({setProduct}){
//     const [pagination, setPagination] = useState({
//         count : 0,
//         from: 0,
//         to: pageSize,
//     })

//     useEffect(() => {
//         service.getData({from: pagination.from, to: pagination.to}).then(response =>{
//         setPagination({...pagination, count: response.count});
//         setProduct(response.data)
//     })
//     }, [pagination.from, pagination.to])

//     const handlePageChange = (event, page)=>{
//         const from = (page-1) * pageSize;
//         const to = (page-1) * pageSize + pageSize;
//         setPagination({...pagination, from: from, to: to})
//     }
//     return(
//         <Box justifyContent={"center"} alignItems={"center"} display={"flex"}
//             sx={{
//                 margin: "20px 0px"
//             }}
//         >
//            <Pagination
//             count={Math.ceil(pagination.count / pageSize)}
//             onChange={handlePageChange}/>
//         </Box>
//     )
// }

// const ProductPagination = () =>{
//     const [page, setPage] = useState(0)

//     const {
//         isLoading, isError, error,
//         data: product, isFetching, isPreviousData,
//     } = useQuery([`/product`, page], () => getProductPage(page), {
//         keepPreviousData: true
//     })

//     if (isLoading) return <p>Loading Products...</p>
//     if (isError) return <p>Error: {error.message}</p>

//     const content = product.data?.map((item, index) => {
//         <Grid xs={4} sm={3} key={index} >
//           <ProductCard product={item}/>  
//         </Grid>
//     })
//     const nextPage = () => setPage(prev => prev + 1)
//     const firstPage = () => setPage(0)
//     const totalPage = Math.ceil(product.length / pageSize);
//     const pageArray = Array(totalPage).fill().map((_, index) => index + 1)

//     const button = (
//         // <Box justifyContent={"center"} alignItems={"center"} display={"flex"}
//         //     sx={{
//         //         margin: "20px 0px"
//         //     }}
//         // >
//         //    <Pagination
//         //     onChange={handlePageChange}/>
//         // </Box>
//         <nav className="nav-ex2">
//             <button onClick={firstPage} disabled={isPreviousData || page === 1}>&lt;&lt;</button>
//             {/* Removed isPreviousData from PageButton to keep button focus color instead */}
//             {pageArray.map(pg => <button onClick={() => setPage(pg)}>{pg}</button>)}
//             <button onClick={nextPage} disabled={isPreviousData || page === totalPage}>&gt;&gt;</button>
//         </nav>
//     )

//     return(
//         <>
//             {isFetching && <span className="loading">Loading...</span>}
//             <Grid.Container gap={3} justify="flex-start">
//                {content} 
//             </Grid.Container>
//             {button}
//         </>
//     )
// }

const WishlistPagination = (data) =>{
    const [page, setPage] = useState(0)
    const [product, setProduct] = useState([])
    const router = useRouter()

    useEffect(() => {
        getWishlistPage(page, data.data?.filter ? data.data?.filter:{}).then(json => setProduct(json))

    }, [page, data])

    // const getWishlistPage = async (pageParam = 0, filterParam) =>{
    //     const result = await axiosLocal.get(`/wish_list?page=${pageParam}&categoryId.equals=${filterParam?.category?.id ? filterParam?.category?.id :""}&price.lessThan=${filterParam?.minPrice ? filterParam?.minPrice:""}&price.greaterThan=${filterParam?.maxPrice ? filterParam?.maxPrice:""}&location.contains=${filterParam?.location ? filterParam?.location:""}&rating.equals=${filterParam?.rating?.value ? filterParam?.rating?.value :""}`)
    //     // console.log(result.data)
    //     return result.data
    // }

    // const content = product.data?.map((item, index) => {
    //         <Grid xs={4} sm={3} key={index} >
    //             <ProductCard item={item}/>  
    //         </Grid>
    // })

    const nextPage = () => setPage(prev => prev + 1)
    const totalPage = Math.ceil(product.length / pageSize);
    const prevPage = () => setPage(prev => prev - 1)

    useEffect(()=>{
        console.log(product)
    })

    return (
        <>  <Text size={20} className="font-bold">{product.length} Items</Text>
            {
                product.length === 0 ?
                <div>
                    There is no product
                </div>:<>
                <Grid.Container gap={3} justify="flex-start">
                    {product.map((item, index) => (
                                        <Grid xs={4} sm={3} key={index} >
                                        <Card isPressable isHoverable css={{width: "250px"}} onClick={async() =>{
                                            const result = await axiosLocal.get(`/product/${item.id}`)
                                            // console.log(result.data)
                                            router.push({
                                                pathname: `/product-detail/`,
                                                query: { "id": result.data.id },
                                              })
                                        }}>
                                            <Card.Body css={{ p: 0, height: "350px" }}>
                                            <Card.Image
                                                src={item.product?.urlImage}
                                                objectFit="cover"
                                                width="100%"
                                                height={140}
                                                alt={item.product?.name}
                                            />
                                            <Card.Footer css={{ justifyItems: "flex-start" }}>
                                                <Col wrap="wrap" align="left">
                                                    <Text b>{item.product?.name}</Text>
                                                    <div className="pt-2">
                                                        <Row wrap="wrap" justify="left">
                                                            <Text className="pr-3" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>Rp &nbsp;
                                                            {item.product?.price}
                                                            </Text>
                                                            <Text className="flex items-center" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}><StarRateIcon/>
                                                            {item.product?.rating}
                                                            </Text>
                                                        </Row>
                                                        <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}> 
                                                        {item.product?.location}
                                                        </Text>
                                                        {
                                                                item.ecommerce?.name === "Tokopedia" ? <>
                                                                <Text css={{ color: "$green600", fontWeight: "$semibold", fontSize: "$sm" }}> 
                                                                {item.ecommerce?.name}
                                                                </Text>
                                                                </>:<>
                                                                {
                                                                    item.ecommerce?.name === "Shopee" ? <>
                                                                    <Text css={{ color: "#F1582C", fontWeight: "$semibold", fontSize: "$sm" }}> 
                                                                        {item.ecommerce?.name}
                                                                    </Text>
                                                                    </>:<>
                                                                    <Text css={{ color: "#0094D9", fontWeight: "$semibold", fontSize: "$sm" }}> 
                                                                    {item.ecommerce?.name}
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
                </>
            }
            <nav className="flex justify-center content-center items-center pb-[2%]">
                <button onClick={prevPage} disabled={page === 0} style={{
                    marginRight: "20px"
                }}>Prev Page</button>
                <button onClick={nextPage} disabled={page === totalPage}>Next Page</button>
            </nav>
            {/* {content} */}
        </>
    )
}

export default WishlistPagination