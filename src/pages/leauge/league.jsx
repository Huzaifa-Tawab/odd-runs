import React, { useRef, useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";
import axios from "axios";
import { Route, Link, Routes, useParams, useLocation } from "react-router-dom";
import { Flex, Img, Stack, Text, Box, HStack } from "@chakra-ui/react";
import sports from "../../json/sports.json";
import SportsIMG from "../../json/sportsImg";
import BookMakerLight from "../../components/BookMakerLight";
function SportCountryLeague() {
  const [mobileView, setMobileView] = useState(window.innerWidth < 700);

  const handleResize = () => {
    setMobileView(window.innerWidth < 700);
  };

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { state } = useLocation();
  const [sport, setCurrentSport] = useState(state.sport_id);

  const [league, setLeague] = useState(state.leagueName);

  const params = useParams();

  useEffect(() => {
    if (
      sports &&
      params["sport"] &&
      sports.results.some(
        (sport) => sport["Name"].toLowerCase() == params["sport"].toLowerCase()
      )
    ) {
      setCurrentSport(
        sports.results.find((sport) => sport["Name"] == params["sport"])
      );
    }
    getUpcomingEvents();
  }, [params]);

  async function getUpcomingEvents() {
    if (sport) {
      let leagueId = "3237";
      try {
        let response = await axios.get(
          `https://api.b365api.com/v1/events/upcoming?token=179024-3d6U7zylacO78f&sport_id=${state.sport_id}&league_id=${leagueId}`
        );
        let upcomingEventsList = [];

        if (response.status == 200 && response.data) {
          upcomingEventsList = [...response.data.results];
          let totalPage = Math.ceil(response.data.pager.total / 50);
          if (totalPage > 1) {
            for (let i = 2; i <= totalPage; i++) {
              let response1 = await axios.get(
                `https://api.b365api.com/v1/events/upcoming?token=179024-3d6U7zylacO78f&sport_id=${state.sport_id}&league_id=${leagueId}&page=${i}`
              );
              if (response1.status == 200 && response1.data) {
                upcomingEventsList = [
                  ...upcomingEventsList,
                  ...response1.data.results,
                ];
              }
            }
          }

          new Date(event.time * 1000).toLocaleTimeString();
          if (upcomingEventsList) {
            upcomingEventsList.sort(function (a, b) {
              return (
                new Date(a.time * 1000).toLocaleDateString() -
                new Date(a.time * 1000).toLocaleDateString()
              );
            });
          }
          setUpcomingEvents(upcomingEventsList);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  const getTeamUrl = (image_id) =>
    `https://assets.b365api.com/images/team/s/${image_id}.png`;
  const getFlagUrl = (countryCode) =>
    `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

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

  return (
    <HStack
      gap={"0px"}
      justifyContent={"start"}
      alignItems={"start"}
      bg={"#F8F8FF"}
    >
      {mobileView ? <></> : <Sidebar sportsList={sports} />}
      <Box w={mobileView ? "100vw" : "80vw"}>
        <NavBar />
        <HStack
          alignItems={"end"}
          bg={"white"}
          borderRadius={"16px"}
          margin={"5px"}
          padding={"10px"}
        >
          <Box
            w={mobileView ? "100%" : "80%"}
            overflowY={"scroll"}
            h={"85vh"}
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#656EF5",
                borderRadius: "24px",
              },
            }}
          >
            <>
              {sport && (
                <>
                  <HStack>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"#656EF5"}
                    >
                      {params["sport"]}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"black"}
                    >
                      {">"}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"#656EF5"}
                    >
                      {params["country"]}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"black"}
                    >
                      {">"}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"black"}
                    >
                      {params["league"]}
                    </Text>
                  </HStack>
                  <Text
                    marginTop={"10px"}
                    fontSize={"22px"}
                    textStyle={"medium"}
                    color={"black"}
                  >
                    {params["league"]}
                  </Text>
                </>
              )}
              {upcomingEvents &&
                upcomingEvents.map((event) => {
                  return (
                    <div>
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
                            {new Date(event.time * 1000).toLocaleDateString(
                              [],
                              {
                                day: "2-digit",
                                year: "numeric",
                                month: "short",
                              }
                            )}
                          </Text>
                        </Flex>
                        <a
                          href={`/${params["sport"]}/${params["country"]}/${params["league"]}/${event.id}`}
                        >
                          {new Date(event.time * 1000).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
                                {event.home.name}
                                <Img src={getTeamUrl(event.home.image_id)} />
                              </Text>
                              <Text
                                textStyle={"bold"}
                                fontSize={"16px"}
                                color={"#656EF5"}
                              >
                                {event.ss != null ? event.ss : "0-0"}
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
                              <BookMakerLight id={1} per={2.82} />
                              <BookMakerLight id={1} per={2.82} />
                              <BookMakerLight id={1} per={2.82} />
                            </Flex>
                          </HStack>
                        </a>
                      </Stack>
                    </div>
                  );
                })}
            </>
          </Box>
          {/* Right side */}
          {mobileView ? (
            <></>
          ) : (
            <Box w={"20%"} h={"100%"} maxW={"300px"}>
              <RightSidebar />
            </Box>
          )}
        </HStack>
      </Box>
    </HStack>
  );
}

export default SportCountryLeague;
