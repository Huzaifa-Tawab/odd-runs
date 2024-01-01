import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  CircularProgress,
  Tooltip,
  Text,
  Flex,
  Img,
  HStack,
} from "@chakra-ui/react";
import cal from "../../assets/Icons/calendar.png";
const Event = () => {
  const [latestOdds, setLatestOdds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const source = "1xbet";

        const response = await axios.get(
          `https://api.b365api.com/v2/event/odds?event_id=7638406&token=179024-3d6U7zylacO78f&source=${source}`
        );

        const oddsData = response.data.results?.odds?.["1_1"] || [];
        const latestOdd = oddsData[oddsData.length - 1]; // Get the latest odd
        const oddsWithoutLatest = oddsData.slice(0, -1); // Exclude the latest odd
        setLatestOdds({ latestOdd, oddsWithoutLatest, source });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p="4" bg={"white"} borderRadius={"12px"} margin={"5px"}>
      <Flex gap={"5px"} alignItems={"center"}>
        <Text fontSize={"24px"} textStyle={"medium"}>
          Tottenham
        </Text>
        <Img w={"32px"} h={"32px"} src="/vite.svg" alt="" />
        <Text fontSize={"24px"} textStyle={"medium"}>
          -
        </Text>
        <Img w={"32px"} h={"32px"} src="/vite.svg" alt="" />

        <Text fontSize={"24px"} textStyle={"medium"}>
          Tottenham
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
      {loading ? (
        <CircularProgress isIndeterminate color="teal.500" />
      ) : (
        <Box
          border={"1px solid var(--Light-Purple, #656EF5)"}
          borderRadius={"16px"}
          margin={"10px 0px"}
          padding={"10px"}
        >
          <Table style={{ width: "100%" }}>
            <Thead>
              <Tr>
                <Th>
                  <Text fontSize={"14px"} textStyle={"regular"}>
                    BookMakers
                  </Text>
                </Th>
                <Th>Home Odds</Th>
                <Th>Draw Odds</Th>
                <Th>Away Odds</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr key={latestOdds.latestOdd.id}>
                <Td>
                  <HStack w={"300px"}>
                    <Box w={"150px"} h={"50px"} bg={"black"}></Box>
                    <Text>{latestOdds.source}</Text>
                  </HStack>
                </Td>

                <Td>
                  <Tooltip
                    label={
                      <Table variant="simple" fontSize={"10px"}>
                        <Thead>
                          <Tr>
                            <Th>Home Odds</Th>
                            {/* <Th>Draw Odds</Th>
                          <Th>Away Odds</Th>
                          <Th>Score</Th> */}
                            <Th>Time</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {latestOdds.oddsWithoutLatest.map((odd) => (
                            <Tr key={odd.id}>
                              <Td>{odd.home_od}</Td>
                              {/* <Td>{odd.draw_od}</Td>
                            <Td>{odd.away_od}</Td>
                            <Td>{odd.ss}</Td> */}
                              <Td>
                                {Date(latestOdds.latestOdd.add_time * 1000)}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    }
                  >
                    <Box as="span" cursor="pointer">
                      <Tooltip
                        label={
                          <Table variant="simple" fontSize={"10px"}>
                            <Thead>
                              <Tr>
                                <Th>Home Odds</Th>

                                <Th>Time</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {latestOdds.oddsWithoutLatest.map((odd) => (
                                <Tr key={odd.id}>
                                  <Td>{odd.home_od}</Td>
                                  {/* <Td>{odd.draw_od}</Td>
                            <Td>{odd.away_od}</Td>
                            <Td>{odd.ss}</Td> */}
                                  <Td>
                                    {Date(latestOdds.latestOdd.add_time * 1000)}
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        }
                      >
                        {latestOdds.latestOdd.home_od}
                      </Tooltip>
                    </Box>
                  </Tooltip>
                </Td>
                <Td>{latestOdds.latestOdd.draw_od}</Td>
                <Td>
                  <Tooltip
                    label={
                      <Table variant="simple" fontSize={"10px"}>
                        <Thead>
                          <Tr>
                            {/* <Th>Home Odds</Th> */}
                            {/* <Th>Draw Odds</Th>
                          <Th>Away Odds</Th>
                          <Th>Score</Th> */}
                            {/* <Th>Time</Th> */}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {latestOdds.oddsWithoutLatest.map((odd) => (
                            <Tr key={odd.id}>
                              <Td>{odd.home_od}</Td>
                              {/* <Td>{odd.draw_od}</Td>
                            <Td>{odd.away_od}</Td>
                            <Td>{odd.ss}</Td> */}
                              <Td>
                                {Date(latestOdds.latestOdd.add_time * 1000)}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    }
                  >
                    {latestOdds.latestOdd.away_od}
                  </Tooltip>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default Event;
