import React, { useEffect, useState } from "react";
import { Box, Flex, HStack, Img, Stack, Text } from "@chakra-ui/react";

import BookMaker from "../../components/BookMaker";
import { color } from "framer-motion";
import SportsIMG from "../../json/sportsImg";

function HotMatches({ upcomingEvents, sportsList }) {
  const [events, setEvents] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    setEvents(upcomingEvents.results);
    setSports(sportsList.results);
  }, [upcomingEvents, sportsList]);

  const getTeamUrl = (image_id) =>
    `https://assets.b365api.com/images/team/s/${image_id}.png`;
  const getFlagUrl = (countryCode) =>
    `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;
  return (
    <Box bg={"#fff"} borderRadius={"10px"} padding={"10px"} margin={"10px"}>
      <Text
        fontSize={"24px"}
        fontWeight={"600"}
        textDecoration={"underline #656EF5"}
      >
        Hot Matches
      </Text>

      <div>
        {events &&
          sports &&
          events.slice(0, 3).map((event) => {
            let sportName = "";
            sports.forEach((e) => {
              if (e.sport_id == event.sport_id) {
                sportName = e.Name;
              }
            });
            return (
              <>
                <Stack>
                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    marginTop={"20px"}
                    padding={"5px"}
                  >
                    <Img src={SportsIMG[sportName]} />
                    <Text fontSize={"16px"}>{sportName}</Text>
                    <Text fontSize={"25px"}> - </Text>
                    <Img
                      h={"20px"}
                      w={"20px"}
                      src={getFlagUrl(event.league.cc || "Unknown")}
                    />
                    <Text fontSize={"16px"}>{event.league.name.split("")}</Text>
                  </Flex>
                  <HStack
                    h={"95px"}
                    padding={"5px"}
                    borderRadius={"10px"}
                    border={"1px solid #656EF5"}
                    justifyContent={"space-between"}
                  >
                    <Stack gap={"10px"}>
                      <Flex gap={"5px"}>
                        <Text
                          gap={"5px"}
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"16px"}
                          fontWeight={"600"}
                          padding={"10px 0px 0px 10px"}
                        >
                          <Img src={getTeamUrl(event.home.image_id)} />
                          {event.home.name}
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
                          fontWeight={"600"}
                          padding={"10px 0px 0px 10px"}
                        >
                          <Img src={getTeamUrl(event.away.image_id)} />
                          {event.away.name}
                        </Text>
                      </Flex>
                      <Text
                        textAlign={"center"}
                        w={"120px"}
                        padding={"5px"}
                        borderRadius={"30px"}
                        color={"#656EF5"}
                        bg={"#656FF513"}
                      >
                        {new Date(event.time).toLocaleString()}
                      </Text>
                    </Stack>
                    <BookMaker id={"0"} per={"1.5"} img={"1xBet"} />
                  </HStack>
                </Stack>
              </>
            );
          })}
      </div>
    </Box>
  );
}

export default HotMatches;
