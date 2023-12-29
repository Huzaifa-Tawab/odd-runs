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
import React, { useEffect, useState } from "react";
import MenuItems from "./MenuItems";
import test from "../components/test.json";
import axios from "axios";

function Sidebar({ sportsList }) {
  const [sports, setSports] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    setSports(sportsList.results);
    getSportsData();
  }, [sportsList]);
  function getSportsData() {
    sports.forEach((sport) => {
      console.log(sport);
      console.log(
        get(`league?token=179024-3d6U7zylacO78f&sport_id=${sport.sport_id}`)
      );
    });
  }
  function get(uri) {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `https://api.b365api.com/v3/${uri}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  let leauges = 12;
  return (
    <Stack w={"20vw"} h={"100%"} minH={"100vh"} bg={"#121432"}>
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
        {sports &&
          sports.map((sport) => {
            return (
              <MenuItems data={test} Title={sport.Name} Image={sport.Image} />
            );
          })}
      </Accordion>
    </Stack>
  );
}

export default Sidebar;
