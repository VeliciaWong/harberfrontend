import React from 'react'
import { Card, Grid, Link, Row, Text } from "@nextui-org/react";

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
    return(
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-8 gap-[18rem] overflow-x-scroll px-2'>
                {list.map((item, index) => (
                        <Card isPressable isHoverable css={{width: "250px"}} key={index}>
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
                ))}
        </div>
    )
}

export default SliderofCards;