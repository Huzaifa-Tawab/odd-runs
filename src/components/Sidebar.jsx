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
import uuid from "react-uuid";

function Sidebar({ sportsList }) {
  const [sports, setSports] = useState([]);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSports(sportsList.results);
  }, [sportsList]);
  useEffect(() => {
    getSportsData();
  }, [sports]);
  async function getSportsData() {
    // let response1 = await axios.get(
    //   `https://api.b365api.com/v1/events/inplay?token=179024-3d6U7zylacO78f&sport_id=${sport.sport_id}`
    // );
    // let response2 = await axios.get(
    //   `https://api.b365api.com/v1/events/upcoming?token=179024-3d6U7zylacO78f&sport_id=${sport.sport_id}`
    // );

    const results = await Promise.all(
      sports.map((sport) =>
        getSportDataAPI(
          `events/upcoming?token=179024-3d6U7zylacO78f&sport_id=${sport.sport_id}`
        ).then((response) => {
          return {
            [sport.sport_id]: response,
          };
        })
      )
    );
    console.log(results);

    let d = { ...data };
    results.forEach((result) => {
      d = {
        ...result,
        ...d,
      };
    });
    setData(d);
    setIsLoading(false);
  }
  async function getSportDataAPI(uri) {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `https://api.b365api.com/v1/${uri}`,
      headers: {},
    };
    try {
      let response = await axios.request(config);
      if (response && response.data) {
        return response.data;
      } else {
        return {};
      }
    } catch (error) {
      console.log(error);
    }
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

      {isLoading ? (
        <div>loading</div>
      ) : (
        <Accordion allowMultiple color={"white"} padding={"0px 20px"}>
          {sports &&
            sports.map((sport) => {
              if (data[sport.sport_id]) {
                return (
                  <MenuItems
                    key={uuid()}
                    data={data[sport.sport_id]}
                    Title={sport.Name}
                    sport_id={sport.sport_id}
                    Image={sport.Image}
                  />
                );
              }
            })}
        </Accordion>
      )}
    </Stack>
  );
}

export default Sidebar;
