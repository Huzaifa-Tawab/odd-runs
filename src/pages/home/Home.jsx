import React from "react";
import NavBar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";
import { Box, HStack } from "@chakra-ui/react";
import data from "../../components/test.json";
import upcomingEvents from "../../json/upcomingEvent.json";
import sports from "../../json/sports";

import OrganizeDataByCountry from "../../components/OrganizeDataByCountry";
import HotMatches from "./HotMatches";
import TopEvents from "./TopEvents";
import NextMatches from "./NextMatches";
function Home() {
  return (
    <>
      <HStack
        gap={"0px"}
        justifyContent={"start"}
        alignItems={"start"}
        bg={"#F8F8FF"}
      >
        <Sidebar sportsList={sports}></Sidebar>
        <Box w={"80vw"}>
          <NavBar />
          <HStack>
            <Box w={"70%"} overflowY={"scroll"} h={"85vh"}>
              <HotMatches
                upcomingEvents={upcomingEvents}
                sportsList={sports}
              ></HotMatches>
              <TopEvents sportsList={sports}></TopEvents>
              <NextMatches sportsList={sports}></NextMatches>
            </Box>
            <Box w={"30%"} h={"100%"} bg={"black"}></Box>
          </HStack>

          {/* <OrganizeDataByCountry data={data}></OrganizeDataByCountry> */}
        </Box>
        {/* Right side */}
      </HStack>
    </>
  );
}

export default Home;
