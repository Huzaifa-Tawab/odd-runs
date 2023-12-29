import React, { useEffect, useState } from "react";
import { Box, Button, Flex, HStack, Img, Stack, Text } from "@chakra-ui/react";

import BookMaker from "../../components/BookMaker";
import { color } from "framer-motion";
import SportsIMG from "../../json/sportsImg";

function HotMatches({ upcomingEvents, sportsList }) {
  const [events, setEvents] = useState([]);
  const [sports, setSports] = useState([]);
  const [mobileView, setMobileView] = useState(window.innerWidth < 700);

  const handleResize = () => {
    setMobileView(window.innerWidth < 700);
  };

  function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  useEffect(() => {
    setEvents(upcomingEvents.results);
    setSports(sportsList.results);
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [upcomingEvents, sportsList]);

  const getTeamUrl = (image_id) =>
    `https://assets.b365api.com/images/team/s/${image_id}.png`;
  const getFlagUrl = (countryCode) =>
    `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;
  return (
    <Box bg={"#fff"} borderRadius={"10px"} padding={"10px"} margin={"10px"}>
      <Text
        w={"116px"}
        fontSize={"18px"}
        textStyle={"medium"}
        paddingBottom={"5px"}
        borderBottom={"2px solid  #656EF5"}
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
                <Stack gap={"10px"}>
                  <Flex
                    alignItems={"center"}
                    gap={"10px"}
                    marginTop={"10px"}
                    marginLeft={"5px"}
                  >
                    <Img src={SportsIMG[sportName]} />
                    <Text fontSize={mobileView ? "14px" : "16px"}>
                      {sportName}
                    </Text>
                    <Text
                      fontSize={"18px"}
                      textStyle={"bold"}
                      padding={"5px 0px 0px 0px"}
                    >
                      -
                    </Text>
                    <Img
                      h={"20px"}
                      w={"20px"}
                      src={getFlagUrl(event.league.cc || "Unknown")}
                    />
                    <Text fontSize={mobileView ? "12px" : "16px"}>
                      {event.league.name.split("")}
                    </Text>
                  </Flex>
                  <HStack
                    h={mobileView ? "100%" : "100px"}
                    padding={"10px"}
                    borderRadius={"10px"}
                    border={"1px solid #656EF5"}
                    justifyContent={"space-between"}
                    flexDirection={mobileView ? "column" : "row"}
                    alignItems={mobileView ? "start" : "center"}
                  >
                    <Stack gap={"10px"}>
                      <Flex gap={"5px"}>
                        <Text
                          gap={"5px"}
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={mobileView ? "10px" : "14px"}
                          textStyle={"bold"}
                        >
                          <Img src={getTeamUrl(event.home.image_id)} />
                          {event.home.name}
                        </Text>
                        <Text
                          fontSize={"18px"}
                          textStyle={"bold"}
                          padding={"0px 10px"}
                        >
                          -
                        </Text>
                        <Text
                          gap={"5px"}
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={mobileView ? "10px" : "14px"}
                          textStyle={"bold"}
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
                        fontSize={"13px"}
                        textStyle={"medium"}
                        color={"#656EF5"}
                        bg={"rgba(101,110,245,0.10)"}
                      >
                        {new Date(event.time).toLocaleString()}
                      </Text>
                    </Stack>
                    <Flex gap={"5px"}>
                      <BookMaker id={"0"} per={"1.5"} img={"1xBet"} />
                      <BookMaker id={"0"} per={"1.5"} img={"1xBet"} />
                      <BookMaker id={"0"} per={"1.5"} img={"1xBet"} />
                    </Flex>
                  </HStack>
                </Stack>
              </>
            );
          })}
      </div>
      <Flex padding={"20px"} justifyContent={"end"}>
        <Button
          borderRadius="24px"
          bg="var(--Light-Purple, #656EF5)"
          color="white" // Set text color as needed
          _hover={{ bg: "var(--Dark-Purple, #434190)" }} // Change background color on hover if desired
        >
          <Text
            fontSize={"14px"}
            fontStyle={"regular"}
            fontWeight={"400"}
            padding={"0px 20px"}
          >
            All Hot Matches
          </Text>
        </Button>
      </Flex>
    </Box>
  );
}

export default HotMatches;
