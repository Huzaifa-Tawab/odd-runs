import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Flex, Img, HStack } from "@chakra-ui/react";
import cal from "../../assets/Icons/calendar.png";
import bookmakers from "../../json/bookmakers.json";
import oddsMarketJson from "../../json/odds_market.json";

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
      let event_id = "7217694" || props.params["event_id"];

      try {
        if (event_id) {
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
      Home / {props.params && props.params["sport"]} /
      {props.params && props.params["country"]} /
      {props.params && props.params["league"]} /{" "}
      {event && event.home && event.home.name} -{" "}
      {event && event.away && event.away.name}
      <Flex gap={"5px"} alignItems={"center"}>
        <Text fontSize={"24px"} textStyle={"medium"}>
          {event && event.home && (
            <Img
              w={"32px"}
              h={"32px"}
              src={getTeamUrl(event.home.image_id || "/vite.svg")}
            />
          )}
          {event && event.home && event.home.name}
        </Text>
        <Text fontSize={"24px"} textStyle={"medium"}>
          {event && event.ss ? event.ss : "-"}
        </Text>
        <Text fontSize={"24px"} textStyle={"medium"}>
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
      <HStack>
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
      {odds &&
        oddsMarkets &&
        oddsMarkets.map((market) => {
          if (
            market &&
            oddsMarketJson.odds_market.some((m) => m.key == market)
          ) {
            return (
              <>
                <div
                  onClick={() => {
                    allHomeOddsList = [];
                    setCurrentMarket(market);
                  }}
                >
                  {
                    oddsMarketJson.odds_market.find((m) => m.key == market)
                      .value
                  }
                </div>
              </>
            );
          }
        })}
      <div onClick={() => sortOddName}>sort arrow for odds name</div>
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
                      {bookmakers &&
                        bookmakers.bookmakers.some(
                          (bm) => bm.name == oddName
                        ) && (
                          <Img
                            src={
                              bookmakers.bookmakers.find(
                                (bm) => bm.name == oddName
                              ).image
                            }
                          />
                        )}
                      {oddName} ............
                      {checkIfOddUpOrDown(data, "home")}
                      {/* {oddMovement(data, "home")} */}
                      {data[0] && !isNaN(data[0].home_od)
                        ? Number(data[0].home_od).toFixed(2)
                        : data[0].home_od}
                      /{checkIfOddUpOrDown(data, "draw")}
                      {data[0] && !isNaN(data[0].draw_od)
                        ? Number(data[0].draw_od).toFixed(2)
                        : data[0].draw_od}{" "}
                      /{checkIfOddUpOrDown(data, "away")}
                      {data[0] && !isNaN(data[0].away_od)
                        ? Number(data[0].away_od).toFixed(2)
                        : data[0].away_od}
                    </>
                  )}
                </>
              );
            } else if (currentMarket == "1_2") {
              return (
                <>
                  {data && data.length > 0 && (
                    <>
                      {bookmakers &&
                        bookmakers.bookmakers.some(
                          (bm) => bm.name == oddName
                        ) && (
                          <Img
                            src={
                              bookmakers.bookmakers.find(
                                (bm) => bm.name == oddName
                              ).image
                            }
                          />
                        )}
                      {oddName} ............ /{data[0] && data[0].handicap}/
                      {checkIfOddUpOrDown(data, "home")}
                      {/* {oddMovement(data, "home")} */}
                      {data[0] && !isNaN(data[0].home_od)
                        ? Number(data[0].home_od).toFixed(2)
                        : data[0].home_od}
                      /{checkIfOddUpOrDown(data, "away")}
                      {data[0] && !isNaN(data[0].away_od)
                        ? Number(data[0].away_od).toFixed(2)
                        : data[0].away_od}
                    </>
                  )}
                </>
              );
            }
          }
        })}
      maxhomeod
      <div>
        {Math.max(
          ...allHomeOddsList.map((od) => {
            return Object.entries(od).map(([key, value]) => {
              return Number(value);
            });
          })
        )}
      </div>
    </Box>
  );
};
export default EventComponent;
