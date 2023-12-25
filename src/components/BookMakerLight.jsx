import { Box, Text } from "@chakra-ui/react";
import React from "react";

const BookMakerLight = ({ id, per }) => {
  return (
    <Box
      h={"70px"}
      w={"70px"}
      borderRadius={"8px"}
      bg={"#F8F8FF"}
      textAlign={"center"}
    >
      <Text fontWeight={"600"} fontSize={"16px"} color={"#656EF5"}>
        {id}
      </Text>
      {/* <Text>{img}</Text> */}
      <Text fontWeight={"600"} fontSize={"16px"}>
        {per}
      </Text>
    </Box>
  );
};

export default BookMakerLight;
