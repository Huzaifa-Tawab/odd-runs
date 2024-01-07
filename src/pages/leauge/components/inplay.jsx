import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Img,
  Stack,
  Text,
  Box,
  HStack,
  CircularProgress,
} from "@chakra-ui/react";
import sports from "../../../json/sports.json";
import BookMakerLight from "../../../components/BookMakerLight";
function LeaguesInplayMatches({ sport_id, league_id, sport, country, league }) {
  const [isLoading, setIsLoading] = useState(true);
  const [inplayEvents, setInplayEvents] = useState([]);
  useEffect(() => {
    getInplayEvents();
  }, [sport, country, league]);

  async function getInplayEvents() {
    if (sport_id) {
      try {
        let response = await axios.get(
          `https://api.b365api.com/v1/events/inplay?token=179024-3d6U7zylacO78f&sport_id=${sport_id}&league_id=${league_id}`
        );
        let inplayEventsList = [];
        if (response.status == 200 && response.data) {
          inplayEventsList = [...response.data.results];
          if (inplayEventsList) {
            inplayEventsList.sort(function (a, b) {
              return (
                new Date(a.time * 1000).toLocaleDateString() -
                new Date(a.time * 1000).toLocaleDateString()
              );
            });
          }
          setIsLoading(false);
          setInplayEvents(inplayEventsList);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }
  const getTeamUrl = (image_id) =>
    `https://assets.b365api.com/images/team/s/${image_id}.png`;
  const getFlagUrl = (countryCode) =>
    `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;
  return (
    <>
      {isLoading == false ? (
        <>
          {inplayEvents
            ? inplayEvents.map((event) => {
                return (
                  <div key={event.id}>
                    <Stack gap={"15px"} margin={"10px"}>
                      <Flex justifyContent={"space-between"}>
                        <Text
                          textAlign={"center"}
                          padding={"8px 15px"}
                          borderRadius={"30px"}
                          color={"#656EF5"}
                          bg={"#656FF513"}
                          fontSize={"13px"}
                          textStyle={"medium"}
                        >
                          {new Date(event.time * 1000).toLocaleDateString([], {
                            day: "2-digit",
                            year: "numeric",
                            month: "short",
                          })}
                        </Text>
                      </Flex>
                      <a href={`/${sport}/${country}/${league}/${event.id}`}>
                        <HStack
                          border={"1px solid #656EF5"}
                          h={"80px"}
                          borderRadius={"8px"}
                          padding={"5px"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          margin={"10px 0px 10px 0px"}
                        >
                          <Flex
                            gap={"10px"}
                            marginLeft={"20px"}
                            alignItems={"center"}
                          >
                            <Text
                              textStyle={"bold"}
                              fontSize={"16px"}
                              bg={"#656EF5"}
                              color={"white"}
                              padding={"5px"}
                            >
                              {new Date(event.time * 1000).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </Text>
                            <Text
                              gap={"5px"}
                              display={"flex"}
                              alignItems={"center"}
                              fontSize={"16px"}
                              textStyle={"medium"}
                            >
                              {event.home.name}
                              <Img src={getTeamUrl(event.home.image_id)} />
                            </Text>
                            <Text
                              textStyle={"bold"}
                              fontSize={"16px"}
                              color={"#656EF5"}
                            >
                              {event.ss != null ? event.ss : "-"}
                            </Text>
                            <Text
                              gap={"5px"}
                              display={"flex"}
                              alignItems={"center"}
                              fontSize={"16px"}
                              textStyle={"medium"}
                            >
                              <Img src={getTeamUrl(event.away.image_id)} />
                              {event.away.name}
                            </Text>
                          </Flex>
                          <Flex gap={"5px"}>
                            <BookMakerLight id={1} per={2.82} />
                            <BookMakerLight id={"X"} per={2.82} />
                            <BookMakerLight id={2} per={2.82} />
                          </Flex>
                        </HStack>
                      </a>
                    </Stack>
                  </div>
                );
              })
            : "No inplay events"}
        </>
      ) : (
        <>
          <CircularProgress isIndeterminate color="teal.500" />{" "}
        </>
      )}
    </>
  );
}
export default LeaguesInplayMatches;
