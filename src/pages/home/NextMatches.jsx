import React, { useEffect, useState } from "react";
import { Flex, Img, Stack, Text, Box, HStack } from "@chakra-ui/react";
import football from "../../assets/sports/football.png";
import BookMakerLight from "../../components/BookMakerLight";

function NextMatches({ upcomingEvents }) {
  const [nextMatches, setNextMatches] = useState([]);

  useEffect(() => {
    setNextMatches(upcomingEvents.results);
  }, [upcomingEvents]);
  const getTeamUrl = (image_id) =>
    `https://assets.b365api.com/images/team/s/${image_id}.png`;
  const getFlagUrl = (countryCode) =>
    `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;
  return (
    <>
      <Box bg={"#fff"} borderRadius={"10px"} padding={"10px"} margin={"10px"}>
        <Text
          w={"109px"}
          fontSize={"16px"}
          textStyle={"medium"}
          paddingBottom={"5px"}
          borderBottom={"2px solid  #656EF5"}
        >
          Next Matches
        </Text>
        {/* Main */}
        {nextMatches &&
          nextMatches.map((match) => {
            return (
              <>
                <Stack gap={"15px"} margin={"10px"}>
                  <Flex justifyContent={"space-between"}>
                    <Flex gap={"5px"}>
                      <Text
                        gap={"5px"}
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"16px"}
                        padding={"10px 0px 0px 10px"}
                      >
                        <Img src={football} />
                        Football
                      </Text>
                      <Text fontSize={"22px"} padding={"10px 0px 0px 10px"}>
                        {" "}
                        -{" "}
                      </Text>
                      <Text
                        gap={"5px"}
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"16px"}
                        padding={"10px 0px 0px 10px"}
                      >
                        <Img src={getFlagUrl(match.league.cc || "")} />
                        {match.league.name}
                      </Text>
                    </Flex>
                    <Text
                      textAlign={"center"}
                      padding={"8px 15px"}
                      borderRadius={"30px"}
                      color={"#656EF5"}
                      bg={"#656FF513"}
                      fontSize={"13px"}
                      textStyle={"medium"}
                    >
                      Today
                    </Text>
                  </Flex>
                  <HStack
                    border={"1px solid #656EF5"}
                    h={"80px"}
                    borderRadius={"8px"}
                    padding={"5px"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    margin={"10px 0px 10px 0px"}
                  >
                    <Flex gap={"10px"} marginLeft={"20px"}>
                      <Text
                        gap={"5px"}
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"16px"}
                        textStyle={"medium"}
                      >
                        {match.home.name}
                        <Img src={getTeamUrl(match.home.image_id)} />
                      </Text>
                      <Text
                        textStyle={"bold"}
                        fontSize={"16px"}
                        color={"#656EF5"}
                      >
                        0 : 2{" "}
                      </Text>
                      <Text
                        gap={"5px"}
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"16px"}
                        textStyle={"medium"}
                      >
                        <Img src={getTeamUrl(match.away.image_id)} />
                        {match.away.name}
                      </Text>
                    </Flex>
                    <Flex gap={"5px"}>
                      <BookMakerLight id={1} per={2.82} />
                      <BookMakerLight id={1} per={2.82} />
                      <BookMakerLight id={1} per={2.82} />
                      <BookMakerLight id={1} per={2.82} />
                    </Flex>
                  </HStack>
                </Stack>
              </>
            );
          })}

        {/* Dummy */}
        {/* <Stack gap={"15px"} margin={"10px"}>
          <Flex justifyContent={"space-between"}>
            <Flex gap={"5px"}>
              <Text
                gap={"5px"}
                display={"flex"}
                alignItems={"center"}
                fontSize={"22px"}
                fontWeight={"400"}
                padding={"10px 0px 0px 10px"}
              >
                <Img src={football} />
                Football
              </Text>
              <Text fontSize={"22px"} padding={"10px 0px 0px 10px"}>
                {" "}
                -{" "}
              </Text>
              <Text
                gap={"5px"}
                display={"flex"}
                alignItems={"center"}
                fontSize={"22px"}
                fontWeight={"400"}
                padding={"10px 0px 0px 10px"}
              >
                <Img src={football} />
                Saudi Arabia / Division1
              </Text>
            </Flex>
            <Text
              textAlign={"center"}
              w={"120px"}
              padding={"10px"}
              borderRadius={"30px"}
              color={"#656EF5"}
              bg={"#656FF513"}
            >
              Today
            </Text>
          </Flex>
          <HStack
            border={"1px solid #656EF5"}
            h={"80px"}
            borderRadius={"8px"}
            padding={"5px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            margin={"10px 0px 10px 0px"}
          >
            <Flex gap={"10px"} marginLeft={"20px"}>
              <Text
                gap={"5px"}
                display={"flex"}
                alignItems={"center"}
                fontSize={"20px"}
                fontWeight={"600"}
              >
                Al-Qaisumah
                <Img src={football} />
              </Text>
              <Text fontWeight={"600"} fontSize={"20px"} color={"#656EF5"}>
                0 : 2{" "}
              </Text>
              <Text
                gap={"5px"}
                display={"flex"}
                alignItems={"center"}
                fontSize={"20px"}
                fontWeight={"600"}
              >
                <Img src={football} />
                Al-Qaisumah
              </Text>
            </Flex>
            <BookMakerLight id={1} per={2.82} />
          </HStack>
        </Stack> */}
      </Box>
    </>
  );
}

export default NextMatches;
