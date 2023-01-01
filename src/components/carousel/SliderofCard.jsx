import { useState, useEffect } from "react";
import { Card, Grid, Link, Row, Text } from "@nextui-org/react";
import Axios from "axios";
import StarRateIcon from '@mui/icons-material/StarRate';

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

const SliderofCards = () =>{
  const [productRecommend, setProductRecommend] = useState([]);

    useEffect(() => {
    getProductRecommend() 
    }, []
    )

    const getProductRecommend = async () =>{
      // let result = await Axios.post(`http://localhost:8080/harberid/webresources/product`, {
      //   filterCategory: data.filterCategory,
      // });

      let result = await Axios.get(`http://localhost:8080/harberid/webresources/product?pageSize=10`);
      // console.log(result.data);
      return setProductRecommend(result.data);
    }

    return(
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-8 gap-[18rem] overflow-x-scroll px-2'>
                {productRecommend.data?.map((item) => (
                    <Card isPressable isHoverable css={{width: "250px"}}>
                        <Card.Body css={{ p: 0, height: "300px" }}>
                          <Card.Image
                              src={item.productUrlImage}
                              objectFit="cover"
                              width="100%"
                              height={140}
                              alt={item.productName}
                          />
                          <Card.Footer css={{ justifyItems: "flex-start" }}>
                            <div className="flex flex-col">
                                <Text b fontSize={30}>{item.productName}</Text>
                                <div className="pt-2">
                                    <Text className="pr-5" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>Rp 
                                      {item.productPrice}
                                    </Text>
                                  <Row wrap="wrap" justify="space-between">
                                      <Text className="flex items-center mr-[100px]" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>Sold : &nbsp;
                                      {item.productSold}
                                      </Text>
                                      &nbsp;
                                      <Text className="flex items-center flex-end" css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}><StarRateIcon/>
                                      {item.productRating}
                                      </Text>
                                  </Row>
                                  <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}> 
                                  {item.productLocation}
                                  </Text>
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