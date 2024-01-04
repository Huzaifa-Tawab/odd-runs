import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Flex,
  Img,
  HStack,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import cal from "../../assets/Icons/calendar.png";
import bookmakers from "../../json/bookmakers.json";
import oddsMarketJson from "../../json/odds_market.json";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "@chakra-ui/icons";

let allHomeOddsList = [];
const EventComponent = (props) => {
  const [oddsMarkets, setOddsMarkets] = useState([]);
  const [odds, setOdds] = useState([]);
  const [oddsSummary, setOddsSummary] = useState({});
  const [currentMarket, setCurrentMarket] = useState("1_1");
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  const [isOddNameAsc, setIsOddNameAsc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let event_id = props.params["event_id"];
      console.log(props.params["event_id"]);
      try {
        if (event_id) {
          console.log(event_id);
          let eventResponse = await axios.get(
            `https://api.b365api.com/v1/event/view?event_id=${event_id}&token=179024-3d6U7zylacO78f`
          );
          if (eventResponse.data && eventResponse.data.results) {
            setEvent(eventResponse.data.results[0]);
            const oddSummaryResponse = await axios.get(
              `https://api.b365api.com/v2/event/odds/summary?event_id=${event_id}&token=179024-3d6U7zylacO78f`
            );
            setOddsSummary(oddSummaryResponse.data.results);
            let sources = Object.keys(oddSummaryResponse.data.results);

            const oddResponse = await Promise.all(
              sources.map((source) =>
                getEventOdsBySource(
                  `event/odds?event_id=${event_id}&token=179024-3d6U7zylacO78f&source=${source}`
                ).then((response) => {
                  return {
                    [source]: response.results,
                  };
                })
              )
            );

            if (oddResponse) {
              let oddsMarketList = [];
              oddResponse.forEach((odd) => {
                let oddValue = {};
                Object.entries(odd).forEach(([ok, ov]) => {
                  oddValue = ov;
                });
                let oddData = {};

                if (oddValue) {
                  Object.entries(oddValue).forEach(([ovk, ovv]) => {
                    if (ovk == "odds") {
                      oddData = ovv;
                    }
                  });

                  Object.entries(oddData).forEach(([ovkk, ovvv]) => {
                    if (!oddsMarketList.some((mk) => mk == ovkk)) {
                      oddsMarketList.push(ovkk);
                    }
                  });
                }
              });
              setOddsMarkets(oddsMarketList);
            }
            setOdds(oddResponse);
            setIsOddNameAsc(true);
          }
          setLoading(false);

          //   const oddsData = response.data.results?.odds?.["1_1"] || [];
          //   const latestOdd = oddsData[oddsData.length - 1]; // Get the latest odd
          //   const oddsWithoutLatest = oddsData.slice(0, -1); // Exclude the latest odd
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function getEventOdsBySource(uri) {
      let config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: `https://api.b365api.com/v2/${uri}`,
        headers: {},
      };
      try {
        let response = await axios.request(config);
        if (response && response.data) {
          return response.data;
        } else {
          return {};
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [props]);

  const getTeamUrl = (image_id) =>
    `https://assets.b365api.com/images/team/s/${image_id}.png`;
  const getFlagUrl = (countryCode) =>
    `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;

  const checkIfOddUpOrDown = (data, type) => {
    if (data) {
      if (type == "home") {
        if (
          data[0] &&
          data[1] &&
          data[0].home_od &&
          data[1].home_od &&
          data[0].home_od != "-" &&
          data[1].home_od != "-" &&
          Number(data[0].home_od) > Number(data[1].home_od)
        ) {
          return "up";
        } else {
          return "down";
        }
      } else if (type == "draw") {
        if (
          data[0] &&
          data[1] &&
          data[0].draw_od &&
          data[1].draw_od &&
          data[0].draw_od != "-" &&
          data[1].draw_od != "-" &&
          Number(data[0].draw_od) > Number(data[1].draw_od)
        ) {
          return "up";
        } else {
          return "down";
        }
      } else if (type == "away") {
        if (
          data[0] &&
          data[1] &&
          data[0].away_od &&
          data[1].away_od &&
          data[0].away_od != "-" &&
          data[1].away_od != "-" &&
          Number(data[0].away_od) > Number(data[1].away_od)
        ) {
          return "up";
        } else {
          return "down";
        }
      }
    }
  };

  const oddMovement = (data, type) => {
    if (data) {
      if (type == "home") {
        let openingOdds = {};
        if (data.some((d) => d.time_str == "00:00")) {
          openingOdds = data.find((d) => d.time_str == "00:00");
          console.log(openingOdds);
        }
        return (
          <>
            <div>
              opening odds
              {Object.keys(openingOdds)}
            </div>
          </>
        );
      }
    }
  };

  useEffect(() => {
    // if (odds) {
    //   if (isOddNameAsc) {
    //     let newodds = odds.sort((a, b) => {
    //       if (Object.keys(a)[0] > Object.keys(b)[0]) {
    //         return a;
    //       } else {
    //         return b;
    //       }
    //     });
    //     setOdds(newodds);
    //   } else {
    //   }
    // }
  }, [isOddNameAsc]);

  return (
    <Box p="4" bg={"white"} borderRadius={"12px"} margin={"5px"}>
      <Flex gap={"5px"} alignItems={"center"}>
        <Text color={"#656EF5"} textStyle={"medium"} fontSize={"16px"}>
          {" "}
          Home{" "}
        </Text>
        <Text fontSize={"16px"} textStyle={"medium"} color={"black"}>
          {">"}
        </Text>

        <Text color={"#656EF5"} textStyle={"medium"} fontSize={"16px"}>
          {" "}
          {props.params && props.params["sport"]}{" "}
        </Text>

        <Text fontSize={"16px"} textStyle={"medium"} color={"black"}>
          {">"}
        </Text>

        <Text color={"#656EF5"} textStyle={"medium"} fontSize={"16px"}>
          {" "}
          {props.params && props.params["country"]}
        </Text>

        <Text fontSize={"16px"} textStyle={"medium"} color={"black"}>
          {">"}
        </Text>
        <Text color={"#656EF5"} textStyle={"medium"} fontSize={"16px"}>
          {" "}
          {props.params && props.params["league"]}{" "}
        </Text>
        <Text fontSize={"16px"} textStyle={"medium"} color={"black"}>
          {">"}
        </Text>
        <Text color={"#121432"} textStyle={"medium"} fontSize={"16px"}>
          {" "}
          {event && event.home && event.home.name}{" "}
        </Text>
        <Text color={"#121432"} textStyle={"medium"} fontSize={"16px"}>
          {" "}
          -{" "}
        </Text>
        <Text color={"#121432"} textStyle={"medium"} fontSize={"16px"}>
          {" "}
          {event && event.away && event.away.name}
        </Text>
      </Flex>
      <Flex gap={"25px"} alignItems={"center"} margin={"20px 5px"}>
        <Text
          fontSize={"24px"}
          textStyle={"medium"}
          display={"flex"}
          gap={"15px"}
        >
          {event && event.home && event.home.name}
          {event && event.home && (
            <Img
              w={"32px"}
              h={"32px"}
              src={getTeamUrl(event.home.image_id || "/vite.svg")}
            />
          )}
        </Text>
        <Text fontSize={"24px"} textStyle={"medium"}>
          {event && event.ss ? event.ss : "-"}
        </Text>
        <Text
          fontSize={"24px"}
          textStyle={"medium"}
          display={"flex"}
          gap={"15px"}
        >
          {event && event.away && (
            <Img
              w={"32px"}
              h={"32px"}
              src={getTeamUrl(event.away.image_id || "/vite.svg")}
            />
          )}
          {event && event.away && event.away.name}
        </Text>
      </Flex>
      <HStack margin={"20px 3px"}>
        <Flex
          borderRadius={"30px"}
          padding={"5px 10px"}
          bg={"rgba(101, 110, 245, 0.2)"}
          color={"rgba(101, 110, 245, 1)"}
        >
          <Img src={cal}></Img>
          <Text fontSize={"14px"}>Saturday, 16 Dec 2023, 01:00</Text>
        </Flex>
        <Flex
          borderRadius={"30px"}
          padding={"5px 10px"}
          bg={"rgba(101, 110, 245, 0.2)"}
          color={"rgba(101, 110, 245, 1)"}
        >
          <Img src={cal}></Img>
          <Text fontSize={"14px"}>Live Streaming</Text>
        </Flex>
      </HStack>
      <Flex margin={"10px 3px"} gap={"20px"} flexWrap={"wrap"}>
        {odds &&
          oddsMarkets &&
          oddsMarkets.map((market) => {
            if (
              market &&
              oddsMarketJson.odds_market.some((m) => m.key == market)
            ) {
              return (
                <>
                  <div style={{ cursor: "pointer" }}>
                    <Text
                      onClick={() => {
                        allHomeOddsList = [];
                        setCurrentMarket(market);
                      }}
                    >
                      {
                        oddsMarketJson.odds_market.find((m) => m.key == market)
                          .value
                      }
                    </Text>
                  </div>
                </>
              );
            }
          })}
      </Flex>
      <Table border={"1px solid #656EF5"} borderTopRadius={"10px"}>
        <Thead>
          <Tr>
            <Td
              w={"300px"}
              borderRight={"1px solid #656EF5"}
              fontSize={"14"}
              textStyle={"regular"}
              onClick={() => sortOddName}
              cursor={"pointer"}
            >
              Bookmaker
            </Td>
            <Td
              w={"100px"}
              borderRight={"1px solid #656EF5"}
              fontSize={"14"}
              textStyle={"regular"}
            >
              1 <ArrowUpIcon color={"#656EF5"} />
            </Td>
            <Td
              w={"100px"}
              borderRight={"1px solid #656EF5"}
              fontSize={"14"}
              textStyle={"regular"}
            >
              2 <ArrowUpIcon color={"#656EF5"} />
            </Td>
            <Td
              w={"100px"}
              borderRight={"1px solid #656EF5"}
              fontSize={"14"}
              textStyle={"regular"}
            >
              X <ArrowUpIcon color={"#656EF5"} />
            </Td>
            <Td w={"200px"} fontSize={"14"} textStyle={"regular"}>
              PayOut <ArrowUpIcon color={"#656EF5"} />
            </Td>
          </Tr>
        </Thead>
        <Tbody>
          {odds &&
            odds.map((odd) => {
              let oddName = "";
              let oddValue = {};
              Object.entries(odd).forEach(([ok, ov]) => {
                oddName = ok;
                oddValue = ov;
              });

              let oddData = {};

              if (oddValue) {
                Object.entries(oddValue).forEach(([ovk, ovv]) => {
                  if (ovk == "odds") {
                    oddData = ovv;
                  }
                });
                let data = {};
                if (currentMarket) {
                  data = oddData[currentMarket];
                }

                if (currentMarket == "1_1") {
                  return (
                    <>
                      {data && data.length > 0 && (
                        <>
                          {!allHomeOddsList.some((s) =>
                            s.hasOwnProperty(oddName)
                          ) &&
                            (allHomeOddsList = [
                              ...allHomeOddsList,
                              { [oddName]: data[0].home_od },
                            ])}
                          {/* setAllHomeOddsList */}
                          {/* {!isNaN(data[0].home_od) &&
                        Number(data[0].home_od) > highestHomeOdd &&
                        setHighestHomeOdd(Number(data[0].home_od))}
                      {!isNaN(data[0].away_od) &&
                        Number(data[0].away_od) > highestAwayOdd &&
                        setHighestAwayOdd(Number(data[0].away_od))}
                      {!isNaN(data[0].draw_od) &&
                        Number(data[0].draw_od) > highestDrawOdd &&
                        setHighestDrawOdd(Number(data[0].draw_od))} */}
                          <Tr>
                            <Td
                              textStyle={"regular"}
                              fontSize={"16"}
                              borderRight={"1px solid #656EF5"}
                            >
                              <Flex gap={"10px"}>
                                {bookmakers &&
                                  bookmakers.bookmakers.some(
                                    (bm) => bm.name == oddName
                                  ) && (
                                    <Img
                                      w={"80px"}
                                      src={
                                        bookmakers.bookmakers.find(
                                          (bm) => bm.name == oddName
                                        ).image
                                      }
                                    />
                                  )}
                                <Text>{oddName}</Text>
                              </Flex>
                            </Td>
                            <Td borderRight={"1px solid #656EF5"}>
                              <Text
                                padding={"5px 10px"}
                                textStyle={"medium"}
                                fontSize={"14"}
                                textAlign={"center"}
                                borderRadius={"5px"}
                                bg={
                                  checkIfOddUpOrDown(data, "home") == "up"
                                    ? "rgba(38, 176, 26, 0.15)"
                                    : "rgba(255, 0, 0, 0.15)"
                                }
                              >
                                {" "}
                                {checkIfOddUpOrDown(data, "home") == "up" ? (
                                  <ArrowUpIcon />
                                ) : (
                                  <ArrowDownIcon />
                                )}
                                {data[0] && !isNaN(data[0].home_od)
                                  ? Number(data[0].home_od).toFixed(2)
                                  : data[0].home_od}
                              </Text>
                            </Td>
                            <Td borderRight={"1px solid #656EF5"}>
                              <Text
                                padding={"5px 10px"}
                                textStyle={"medium"}
                                fontSize={"14"}
                                textAlign={"center"}
                                borderRadius={"5px"}
                                bg={
                                  checkIfOddUpOrDown(data, "home") == "up"
                                    ? "rgba(38, 176, 26, 0.15)"
                                    : "rgba(255, 0, 0, 0.15)"
                                }
                              >
                                {" "}
                                {checkIfOddUpOrDown(data, "draw") == "up" ? (
                                  <ArrowUpIcon />
                                ) : (
                                  <ArrowDownIcon />
                                )}
                                {data[0] && !isNaN(data[0].draw_od)
                                  ? Number(data[0].draw_od).toFixed(2)
                                  : data[0].draw_od}
                              </Text>
                            </Td>
                            <Td borderRight={"1px solid #656EF5"}>
                              <Text
                                padding={"5px 10px"}
                                textStyle={"medium"}
                                fontSize={"14"}
                                textAlign={"center"}
                                borderRadius={"5px"}
                                bg={
                                  checkIfOddUpOrDown(data, "home") == "up"
                                    ? "rgba(38, 176, 26, 0.15)"
                                    : checkIfOddUpOrDown(data, "home") == "down"
                                    ? "rgba(255, 0, 0, 0.15)"
                                    : "white"
                                }
                              >
                                {checkIfOddUpOrDown(data, "away") == "up" ? (
                                  <ArrowUpIcon />
                                ) : (
                                  <ArrowDownIcon />
                                )}
                                {data[0] && !isNaN(data[0].away_od)
                                  ? Number(data[0].away_od).toFixed(2)
                                  : data[0].away_od}
                              </Text>
                            </Td>
                            <Td>
                              <Text fontSize={"14"} textStyle={"regular"}>
                                100%
                              </Text>
                            </Td>
                          </Tr>
                        </>
                      )}
                    </>
                  );
                } else if (currentMarket == "1_2") {
                  return (
                    <>
                      {data && data.length > 0 && (
                        <>
                          <Tr>
                            <Td
                              textStyle={"regular"}
                              fontSize={"16"}
                              borderRight={"1px solid #656EF5"}
                            >
                              <Flex gap={"10px"}>
                                {bookmakers &&
                                  bookmakers.bookmakers.some(
                                    (bm) => bm.name == oddName
                                  ) && (
                                    <Img
                                      w={"80px"}
                                      src={
                                        bookmakers.bookmakers.find(
                                          (bm) => bm.name == oddName
                                        ).image
                                      }
                                    />
                                  )}
                                <Text>{oddName}</Text>
                              </Flex>
                            </Td>
                            <Td borderRight={"1px solid #656EF5"}>
                              <Text
                                h={"30px"}
                                textStyle={"medium"}
                                fontSize={"14"}
                                textAlign={"center"}
                                borderRadius={"5px"}
                                bg={
                                  checkIfOddUpOrDown(data, "home") == "up"
                                    ? "green"
                                    : "red"
                                }
                              >
                                {" "}
                                {checkIfOddUpOrDown(data, "home") == "up" ? (
                                  <ArrowUpIcon />
                                ) : (
                                  <ArrowDownIcon />
                                )}
                                {data[0] && !isNaN(data[0].home_od)
                                  ? Number(data[0].home_od).toFixed(2)
                                  : data[0].home_od}
                              </Text>
                            </Td>
                            <Td borderRight={"1px solid #656EF5"}>
                              <Text
                                h={"30px"}
                                textStyle={"medium"}
                                fontSize={"14"}
                                textAlign={"center"}
                                borderRadius={"5px"}
                                bg={
                                  checkIfOddUpOrDown(data, "draw") == "up"
                                    ? "green"
                                    : "red"
                                }
                              >
                                {" "}
                                {checkIfOddUpOrDown(data, "draw") == "up" ? (
                                  <ArrowUpIcon />
                                ) : (
                                  <ArrowDownIcon />
                                )}
                                {data[0] && !isNaN(data[0].draw_od)
                                  ? Number(data[0].draw_od).toFixed(2)
                                  : data[0].draw_od}
                              </Text>
                            </Td>
                            <Td borderRight={"1px solid #656EF5"}>
                              <Text
                                h={"30px"}
                                textStyle={"medium"}
                                fontSize={"14"}
                                textAlign={"center"}
                                borderRadius={"5px"}
                                bg={
                                  checkIfOddUpOrDown(data, "away") == "up"
                                    ? "green"
                                    : "red"
                                }
                              >
                                {checkIfOddUpOrDown(data, "away") == "up" ? (
                                  <ArrowUpIcon />
                                ) : (
                                  <ArrowDownIcon />
                                )}
                                {data[0] && !isNaN(data[0].away_od)
                                  ? Number(data[0].away_od).toFixed(2)
                                  : data[0].away_od}
                              </Text>
                            </Td>
                            <Td>
                              <Text fontSize={"14"} textStyle={"regular"}>
                                100%
                              </Text>
                            </Td>
                          </Tr>
                          {/*                         <Td borderRight={"1px solid #656EF5"}>
                              <Text
                                h={"30px"}
                                textStyle={"medium"}
                                fontSize={"14"}
                                textAlign={"center"}
                                borderRadius={"5px"}
                                bg={
                                  checkIfOddUpOrDown(data, "home") == "up"
                                    ? "green"
                                    : "red"
                                }
                              >
                                {" "}
                                {checkIfOddUpOrDown(data, "home") == "up" ? (
                                  <ArrowUpIcon />
                                ) : (
                                  <ArrowDownIcon />
                                )}
                                {data[0] && !isNaN(data[0].home_od)
                                  ? Number(data[0].home_od).toFixed(2)
                                  : data[0].home_od}
                              </Text>
                            </Td>
                            <Td borderRight={"1px solid #656EF5"}>
                              <Text
                                h={"30px"}
                                textStyle={"medium"}
                                fontSize={"14"}
                                textAlign={"center"}
                                borderRadius={"5px"}
                                bg={
                                  checkIfOddUpOrDown(data, "draw") == "up"
                                    ? "green"
                                    : "red"
                                }
                              >
                                {" "}
                                {checkIfOddUpOrDown(data, "draw") == "up" ? (
                                  <ArrowUpIcon />
                                ) : (
                                  <ArrowDownIcon />
                                )}
                                {data[0] && !isNaN(data[0].draw_od)
                                  ? Number(data[0].draw_od).toFixed(2)
                                  : data[0].draw_od}
                              </Text>
                            </Td>
                            <Td borderRight={"1px solid #656EF5"}>
                              <Text
                                h={"30px"}
                                textStyle={"medium"}
                                fontSize={"14"}
                                textAlign={"center"}
                                borderRadius={"5px"}
                                bg={
                                  checkIfOddUpOrDown(data, "away") == "up"
                                    ? "green"
                                    : "red"
                                }
                              >
                                {checkIfOddUpOrDown(data, "away") == "up" ? (
                                  <ArrowUpIcon />
                                ) : (
                                  <ArrowDownIcon />
                                )}
                                {data[0] && !isNaN(data[0].away_od)
                                  ? Number(data[0].away_od).toFixed(2)
                                  : data[0].away_od}
                              </Text>
                            </Td>
                            <Td>
                              <Text fontSize={"14"} textStyle={"regular"}>
                                100%
                              </Text>
                            </Td>
                           {data[0] && data[0].handicap}/
                          {checkIfOddUpOrDown(data, "home")}
                          {data[0] && !isNaN(data[0].home_od)
                            ? Number(data[0].home_od).toFixed(2)
                            : data[0].home_od}
                          /{checkIfOddUpOrDown(data, "away")}
                          {data[0] && !isNaN(data[0].away_od)
                            ? Number(data[0].away_od).toFixed(2)
                            : data[0].away_od} */}
                        </>
                      )}
                    </>
                  );
                }
              }
            })}
          <div>
            {Math.max(
              ...allHomeOddsList.map((od) => {
                return Object.entries(od).map(([key, value]) => {
                  return Number(value);
                });
              })
            )}
          </div>
        </Tbody>
      </Table>
    </Box>
  );
};
export default EventComponent;
