import React from "react";
import NavBar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";
import { Box, HStack } from "@chakra-ui/react";
import data from "../../components/test.json";
import upcomingEvents from "../../json/upcomingEvent.json";
import sports from "../../json/sports";

import OrganizeDataByCountry from "../../components/OrganizeDataByCountry";
import HotMatches from "./HotMatches";
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
          {/* <OrganizeDataByCountry data={data}></OrganizeDataByCountry> */}
        </Box>
      </HStack>
      <HotMatches upcomingEvents={upcomingEvents} sports={sports}></HotMatches>
    </>
  );
}

export default Home;
