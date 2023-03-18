import { useState, useEffect } from "react";
import { Card, Grid, Link, Row, Text } from "@nextui-org/react";
import StarRateIcon from '@mui/icons-material/StarRate';
import { axiosHarber, axiosLocal } from "../../helpers/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const SliderofCards = () =>{
  const router = useRouter()

    const getProductRecommend = useQuery({
      queryKey: ["productRecommend-list"],
      queryFn: async () => {
        let result = await axiosLocal.get(`/product?size=10&sort=rating,DESC`);
        // let result = await axiosHarber.get(`/product?size=10&sort=rating,DESC`);
        return result.data;
      },
    });

    return(
        <div className='bg-[#F7FFF7] grid grid-cols-10 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-[18rem] xs:gap-[16.5rem] sm:gap-[17rem] md:gap-[17rem] lg:gap-[18rem] xl:gap-[18rem] overflow-x-scroll  px-2'>
                {getProductRecommend.data?.map((item, index) => (
                    <Card isPressable isHoverable css={{width: "250px"}} key={index} onClick={async() =>{
                      const result = await axiosLocal.get(`/product/${item.id}`)
                      // const result = await axiosHarber.get(`/product/${item.id}`)
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
                                      {(item.price)?.toLocaleString()}
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