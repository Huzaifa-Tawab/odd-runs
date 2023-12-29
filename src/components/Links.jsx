import { Box, Text, Img, Flex, Divider } from "@chakra-ui/react";
import React from "react";
import dropodds from "../assets/Links Icons/dropodds.svg";
import blockodds from "../assets/Links Icons/blockodds.svg";
import valuebets from "../assets/Links Icons/value.svg";
import hotmatches from "../assets/Links Icons/fire.svg";
import archive from "../assets/Links Icons/archresult.svg";
import standings from "../assets/Links Icons/standings.svg";

function Links() {
  return (
    <>
      <Divider marginBottom={"10px"} />
      <Flex gap={"5px"} padding={"5px"}>
        <Img src={dropodds} />
        <Text fontSize={"15px"}>Dropping Odds</Text>
      </Flex>
      <Flex gap={"5px"} padding={"5px"}>
        <Img src={blockodds} />
        <Text fontSize={"15px"}>Blocked Odds</Text>
      </Flex>
      <Flex gap={"5px"} padding={"5px"}>
        <Img src={valuebets} />
        <Text fontSize={"15px"}>Value Bets</Text>
      </Flex>
      <Flex gap={"5px"} padding={"5px"}>
        <Img src={hotmatches} />
        <Text fontSize={"15px"}>Hot Matches</Text>
      </Flex>
      <Flex gap={"5px"} padding={"5px"}>
        <Img src={archive} />
        <Text fontSize={"15px"}>Archived Results</Text>
      </Flex>
      <Flex gap={"5px"} padding={"5px"}>
        <Img src={standings} />
        <Text fontSize={"15px"}>Standing</Text>
      </Flex>
    </>
  );
}

export default Links;
