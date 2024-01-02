import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Flex, Img, HStack } from "@chakra-ui/react";
import cal from "../../assets/Icons/calendar.png";
import bookmakers from "../../json/bookmakers.json";
import oddsMarketJson from "../../json/odds_market.json";

const EventComponent = (props) => {
  const [oddsMarkets, setOddsMarkets] = useState([]);
  const [odds, setOdds] = useState([]);
  const [oddsSummary, setOddsSummary] = useState({});
  const [currentMarket, setCurrentMarket] = useState("1_1");
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

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
          console.log(market);
          if (
            market &&
            oddsMarketJson.odds_market.some((m) => m.key == market)
          ) {
            return (
              <>
                <div
                  onClick={() => {
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

            return (
              <>
                {data && (
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
                    <div key={oddName}>{oddName}</div>
                    ---------
                  </>
                )}
              </>
            );
          }
        })}
    </Box>
  );
};
export default EventComponent;
