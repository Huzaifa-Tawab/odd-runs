import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import CouponCard from "./Couponcard";
import Links from "./Links";
import doc from "../assets/Icons/doc.png";

function RightSidebar() {
  return (
    <>
      {/* <Box bg={"#fff"} borderRadius={"10px"} padding={"10px"} margin={"10px"}>
    <Flex gap={"10px"} alignItems={"center"} marginBottom={"10px"}>
        <Img src={doc} w={"25px"} h={"25px"}/>
        <Text fontSize={"24px"} fontWeight={"600"}>My Coupon</Text>
        <Box
              borderRadius="50%"
              width="24px"
              height="24px"
            //   border="1px solid black"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="#656EF5"
              color="white"
            >
              <Text fontSize="12px" fontWeight="bold">
                2
              </Text>
            </Box>

    </Flex>
    <CouponCard/>

   </Box> */}
      <Box bg={"#fff"} borderRadius={"10px"} padding={"10px"} margin={"10px"}>
        <Flex padding={"10px"}>
          <Text fontSize={"16px"} textStyle={"medium"}>
            Betting Tools
          </Text>
        </Flex>
        <Links />
      </Box>
    </>
  );
}

export default RightSidebar;
