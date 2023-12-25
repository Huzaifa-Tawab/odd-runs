import React, { useEffect, useState } from "react";
import { Box, Flex, HStack, Img, Stack, Text } from "@chakra-ui/react";

import BookMaker from "../../components/BookMaker";

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
      <Text fontSize={"20px"} fontWeight={"500"}>
        Hot matches
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
                  <Flex alignItems={"center"} gap={"10px"}>
                    <Text>{sportName}</Text>
                    <Text> - </Text>
                    <Img
                      h={"20px"}
                      w={"20px"}
                      src={getFlagUrl(event.league.cc || "Unknown")}
                    />
                    <Text>{event.league.name.split("")}</Text>
                  </Flex>
                  <HStack
                    h={"95px"}
                    margin={"10px"}
                    padding={"5px"}
                    borderRadius={"10px"}
                    border={"1px solid #656EF5"}
                    justifyContent={"space-between"}
                  >
                    <Stack gap={"20px"}>
                      <Flex gap={"5px"}>
                        <Text
                          gap={"5px"}
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"16px"}
                          fontWeight={"600"}
                        >
                          <Img src={getTeamUrl(event.home.image_id)} />
                          {event.home.name}
                        </Text>
                        <Text> - </Text>
                        <Text
                          gap={"5px"}
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"16px"}
                          fontWeight={"600"}
                        >
                          <Img src={getTeamUrl(event.away.image_id)} />
                          {event.away.name}
                        </Text>
                      </Flex>
                      <Text
                        TextAlign={"center"}
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