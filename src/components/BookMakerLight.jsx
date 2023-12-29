import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

const BookMakerLight = ({ id, per }) => {
  return (
    <Stack
      h={"70px"}
      w={"70px"}
      borderRadius={"8px"}
      bg={"#F8F8FF"}
      textAlign={"center"}
      justifyContent={"space-between"}
      padding={"10px"}
    >
      <Text fontWeight={"600"} fontSize={"14px"} color={"#656EF5"}>
        {id}
      </Text>
      {/* <Text>{img}</Text> */}
      <Text fontWeight={"600"} fontSize={"14px"}>
        {per}
      </Text>
    </Stack>
  );
};

export default BookMakerLight;
