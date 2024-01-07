import React, { useState, useEffect } from "react";
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
import BookMakerLight from "../../../components/BookMakerLight";
function LeagueEndedEvents({ sport_id, league_id, sport, country, league }) {
  const [isLoading, setIsLoading] = useState(true);
  const [endedEvents, setEndedEvents] = useState([]);
  const [endedFilteredEvents, setEndedFilteredEvents] = useState([]);
  const [nextEventsOdds, setNextEventsOdds] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setEndedEvents([]);
    getUpcomingEvents();
  }, [sport, country, league, sport_id, league_id]);

  useEffect(() => {
    filteredBasedOnDate();
  }, [endedEvents]);
  const filteredBasedOnDate = () => {
    if (endedEvents) {
      console.log(endedEvents);
      setEndedFilteredEvents([endedEvents]);
    }
  };
  async function getUpcomingEvents() {
    if (sport_id) {
      try {
        let endedEventsResponse = await axios.get(
          `https://api.b365api.com/v3/events/ended?token=179024-3d6U7zylacO78f&sport_id=${sport_id}&league_id=${league_id}`
        );
        let endedEventsList = [];

        // if upcoming events exists add them
        if (endedEventsResponse.status == 200 && endedEventsResponse.data) {
          endedEventsList = [...endedEventsResponse.data.results];
          setEndedEvents(endedEventsList);
          setIsLoading(false);
          let totalPage = Math.ceil(endedEventsResponse.data.pager.total / 50);

          // if in upcoming events more than one page exist add them
          if (totalPage > 1) {
            for (let i = 2; i <= totalPage; i++) {
              let response1 = await axios.get(
                `https://api.b365api.com//v3/events/ended?token=179024-3d6U7zylacO78f&sport_id=${sport_id}&league_id=${league_id}&page=${i}`
              );
              if (response1.status == 200 && response1.data) {
                endedEventsList = [
                  ...endedEventsList,
                  ...response1.data.results,
                ];
                setEndedEvents(endedEventsList);
              }
            }
          }
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

  const getOdd = (type, eventId) => {
    let filteredEventOdd = [];
    if (Object.values(nextEventsOdds.find((odd) => odd[eventId]))) {
      filteredEventOdd = Object.values(
        nextEventsOdds.find((odd) => odd[eventId])
      );
    }

    if (type == "home") {
      let list = [];
      filteredEventOdd.forEach((filtered) => {
        Object.entries(filtered).forEach((value, key) => {
          let bookmarker = value[1];
          if (bookmarker && bookmarker.odds) {
            if (
              bookmarker.odds.end &&
              Object.values(bookmarker.odds.end) &&
              Object.values(bookmarker.odds.end)[0]
            ) {
              let odds = Object.values(bookmarker.odds.end)[0];
              if (odds.home_od) {
                list.push(Number(odds.home_od));
              } else {
                list.push(0);
              }
            }
          }
        });
      });
      let average = 0;
      if (list) {
        average =
          list.reduce((ac, currentValue) => ac + currentValue, 0) / list.length;
      }

      return average > 0 ? average.toFixed(2) : "-";
    } else if (type == "Bs") {
      let list = [];
      filteredEventOdd.forEach((filtered) => {
        Object.entries(filtered).forEach((value, key) => {
          let bookmarker = value[1];
          if (bookmarker && bookmarker.odds) {
            if (
              bookmarker.odds.end &&
              Object.values(bookmarker.odds.end) &&
              Object.values(bookmarker.odds.end)[0]
            ) {
              let odds = Object.values(bookmarker.odds.end)[0];
              if (odds.home_od) {
                list.push(Number(odds.home_od));
              } else {
                list.push(0);
              }
            }
          }
        });
      });

      return list && list.length > 0 ? list.length : "-";
    } else if (type == "draw") {
      let list = [];
      filteredEventOdd.forEach((filtered) => {
        Object.entries(filtered).forEach((value, key) => {
          let bookmarker = value[1];
          if (bookmarker && bookmarker.odds) {
            if (
              bookmarker.odds.end &&
              Object.values(bookmarker.odds.end) &&
              Object.values(bookmarker.odds.end)[0]
            ) {
              let odds = Object.values(bookmarker.odds.end)[0];
              if (odds.draw_od) {
                list.push(Number(odds.draw_od));
              } else {
                list.push(0);
              }
            }
          }
        });
      });
      let average = 0;
      if (list) {
        average =
          list.reduce((ac, currentValue) => ac + currentValue, 0) / list.length;
      }

      return average > 0 ? average.toFixed(2) : "-";
    } else if (type == "away") {
      let list = [];
      filteredEventOdd.forEach((filtered) => {
        Object.entries(filtered).forEach((value, key) => {
          let bookmarker = value[1];
          if (bookmarker && bookmarker.odds) {
            if (
              bookmarker.odds.end &&
              Object.values(bookmarker.odds.end) &&
              Object.values(bookmarker.odds.end)[0]
            ) {
              let odds = Object.values(bookmarker.odds.end)[0];
              if (odds.away_od) {
                list.push(Number(odds.away_od));
              } else {
                list.push(0);
              }
            }
          }
        });
      });
      let average = 0;
      if (list) {
        average =
          list.reduce((ac, currentValue) => ac + currentValue, 0) / list.length;
      }

      return average > 0 ? average.toFixed(2) : "-";
    }
  };
  return (
    <>
      {isLoading == false ? (
        <>
          {endedFilteredEvents
            ? endedFilteredEvents.map((event) => {
                console.log(event);
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
                          {/* {nextEventsOdds &&
                            nextEventsOdds.some((odd) =>
                              odd.hasOwnProperty(event.id)
                            ) && (
                              <>
                                <Flex gap={"5px"}>
                                  <BookMakerLight
                                    id={1}
                                    per={getOdd("home", event.id)}
                                  />
                                  <BookMakerLight
                                    id={"X"}
                                    per={getOdd("draw", event.id)}
                                  />
                                  <BookMakerLight
                                    id={2}
                                    per={getOdd("away", event.id)}
                                  />
                                  <BookMakerLight
                                    id={"B's"}
                                    per={getOdd("Bs", event.id)}
                                  />
                                </Flex>
                              </>
                            )} */}
                        </HStack>
                      </a>
                    </Stack>
                  </div>
                );
              })
            : "No ended events"}
        </>
      ) : (
        <>
          <CircularProgress isIndeterminate color="teal.500" />{" "}
        </>
      )}
    </>
  );
}
export default LeagueEndedEvents;
