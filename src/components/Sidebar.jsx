import {
  Box,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  HStack,
  Badge,
  Accordion,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import React from "react";
import MenuItems from "./MenuItems";
import data from "../components/test.json";

function Sidebar() {
  let leauges = 12;
  return (
    <Stack w={"30vw"} h={"100%"} bg={"#121432"}>
      <Text
        color="var(--White, #FFF)"
        textAlign="center"
        fontFamily="Poppins"
        fontSize="1.8rem"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="normal"
        padding={"20px 0px 0px 0px"}
      >
        OddsRun
      </Text>
      <Box width="80%" mx="auto">
        <Divider borderColor="white" borderWidth="1px" />
        <Stack
          borderRadius="16px"
          background="var(--Light-Purple, #272b63)"
          p="4"
          margin={"10px 0px"}
          color={"white"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <AddIcon />
            My Leauge
            <Box
              borderRadius="50%"
              width="24px"
              height="24px"
              border="1px solid black"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="white"
              color="black"
            >
              <Text fontSize="12px" fontWeight="bold">
                {leauges}
              </Text>
            </Box>
          </Flex>
          <Divider />
          <Text
            color="#FFF"
            letterSpacing="normal"
            textEdge="cap"
            fontFamily="Poppins"
            fontSize="12px"
            fontWeight="400"
            lineHeight="normal"
          >
            Manage my leagues
          </Text>
        </Stack>
      </Box>
      {/* Sports Menus */}
      <Accordion allowMultiple color={"white"} padding={"0px 20px"}>
        <MenuItems data={data} Title="FootBall" />
      </Accordion>
    </Stack>
  );
}

export default Sidebar;
