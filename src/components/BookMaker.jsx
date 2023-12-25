import { Box, Text } from "@chakra-ui/react";
import React from "react";

const BookMaker = ({ id, per, img }) => {
  return (
    <Box
      h={"85px"}
      w={"85px"}
      borderRadius={"8px"}
      bg={"#F8F8FF"}
      textAlign={"center"}
    >
      <Text fontWeight={"600"} fontSize={"16px"} color={"#656EF5"}>
        {id}
      </Text>
      <Text>{img}</Text>
      <Text fontWeight={"600"} fontSize={"16px"}>
        {per}
      </Text>
    </Box>
  );
};

export default BookMaker;
