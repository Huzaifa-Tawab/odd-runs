import React from "react";
import NavBar from "../components/Navbar";

import Sidebar from "../components/Sidebar";
import { Box, HStack } from "@chakra-ui/react";
import data from "../components/test.json";
import OrganizeDataByCountry from "../components/OrganizeDataByCountry";
function Home() {
  return (
    <HStack
      gap={"0px"}
      justifyContent={"start"}
      alignItems={"start"}
      bg={"#F8F8FF"}
    >
      <Sidebar />
      <Box w={"80vw"}>
        <NavBar />
        <OrganizeDataByCountry data={data}></OrganizeDataByCountry>
      </Box>
    </HStack>
  );
}

export default Home;
