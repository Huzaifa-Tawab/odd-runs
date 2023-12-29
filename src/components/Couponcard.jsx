import { Divider, Flex, Img, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import cross from '../assets/Icons/cross.svg'
import check from '../assets/Icons/check.png'
function CouponCard() {
  return (
    <>
    <Divider marginBottom={"20px"}/>
    <Stack>
        <Flex justify={'space-between'}>
            <Flex gap={"5px"}>
                <Img src={check} w={"35px"} h={"35px"}/>
                <Text fontSize={"20px"}> Ntondele Zinga T. - Girelle C.</Text>
            </Flex>
            <Img src={cross} w={"30px"} h={"30px"}/>
        </Flex>
        <Flex justify={'space-between'} alignItems={"center"}>
            <Text fontSize={"20px"}>
            Tip: 2 (H/A) - WON
            </Text>
            <Text fontSize={"20px"} bg={"green"} w={"70px"} textAlign={"center"} h={"40px"} borderRadius={"20px"} color={"white"} padding={"6px"}>
                    1.45
            </Text>
        </Flex>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
              w={"120px"}
              padding={"5px"}
              borderRadius={"30px"}
              color={"#656EF5"}
              bg={"#656FF513"}
              textAlign={"center"}
              fontSize={'20px'}
              fontWeight={"600"}
            >
              Today
            </Text>
            <Flex>
                <Text fontSize={"20px"} fontWeight={600}>Final Result:</Text>
                <Text fontSize={"20px"} color={"#656EF5"}>1:2</Text>
            </Flex>
        </Flex>
    </Stack>
    </>
  )
}

export default CouponCard