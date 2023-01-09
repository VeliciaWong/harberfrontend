import { useState, useEffect } from "react";
import { Card, Grid, Link, Row, Text } from "@nextui-org/react";
import StarRateIcon from '@mui/icons-material/StarRate';
import { axiosLocal } from "../../helpers/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

// const list = [
//     {
//       title: "Orange",
//       img: "/images/fruit-1.jpeg",
//       price: "$5.50",
//     },
//     {
//       title: "Tangerine",
//       img: "/images/fruit-2.jpeg",
//       price: "$3.00",
//     },
//     {
//       title: "Cherry",
//       img: "/images/fruit-3.jpeg",
//       price: "$10.00",
//     },
//     {
//       title: "Lemon",
//       img: "/images/fruit-4.jpeg",
//       price: "$5.30",
//     },
//     {
//       title: "Avocado",
//       img: "/images/fruit-5.jpeg",
//       price: "$15.70",
//     },
//     {
//       title: "Lemon 2",
//       img: "/images/fruit-6.jpeg",
//       price: "$8.00",
//     },
//     {
//       title: "Banana",
//       img: "/images/fruit-7.jpeg",
//       price: "$7.50",
//     },
//     {
//       title: "Watermelon",
//       img: "/images/fruit-8.jpeg",
//       price: "$12.20",
//     },
    
//   ];

const SliderofCards = () =>{
  const [productRecommend, setProductRecommend] = useState([]);
  const router = useRouter()

    // useEffect(() => {
    // getProductRecommend() 
    // }, []
    // )

    // const getProductRecommend = async () =>{
    //   // let result = await Axios.post(`http://localhost:8080/harberid/webresources/product`, {
    //   //   filterCategory: data.filterCategory,
    //   // });

    //   let result = await axiosLocal.get(`/product`);
    //   console.log(result.data);
    //   return setProductRecommend(result.data);
    // }

    const getProductRecommend = useQuery({
      queryKey: ["productRecommend-list"],
      queryFn: async () => {
        let result = await axiosLocal.get(`/product?size=10&sort=rating,DESC`);
  
        return result.data;
      },
    });

    return(
        <div className='bg-[#F7FFF7] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-10 gap-[18rem] overflow-x-scroll px-2'>
                {getProductRecommend.data?.map((item, index) => (
                    <Card isPressable isHoverable css={{width: "250px"}} key={index} onClick={async() =>{
                      const result = await axiosLocal.get(`/product/${item.id}`)
                      // console.log(result.data)
                      router.push({
                          pathname: `/product-detail/`,
                          query: { "id": result.data.id },
                      })
                  }}>
                        <Card.Body css={{ p: 0, height: "350px" }}>
                          <Card.Image
                              src={item.urlImage}
                              objectFit="cover"
                              width="100%"
                              height={140}
                              alt={item.name}
                          />
                          <Card.Footer css={{ justifyItems: "flex-start" }}>
                            <div className="flex flex-col">
                                <Text b size={13}>{item.name}</Text>
                                <div className="pt-2">
                                    <Text className="pr-5" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>Rp &nbsp; 
                                      {item.price}
                                    </Text>
                                  <Row wrap="wrap" justify="space-between">
                                      <Text className="flex items-center mr-[100px]" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                                      {item.sold}
                                      </Text>
                                      &nbsp;
                                      <Text className="flex items-center flex-end" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}><StarRateIcon/>
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
                ))}
        </div>
    )
}

export default SliderofCards;