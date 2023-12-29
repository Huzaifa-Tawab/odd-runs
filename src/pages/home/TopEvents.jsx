import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import football from "../../assets/sports/football.png";
import leagues from "../../json/leagues.json";

function TopEvents({ sportsList }) {
  const [sports, setSports] = useState([]);
  const [event, setEvent] = useState("Top");
  useEffect(() => {
    setSports(sportsList.results);
  }, [sportsList]);

  return (
    <>
      <Box bg={"#fff"} borderRadius={"10px"} padding={"10px"} margin={"10px"}>
        <Tabs>
          <TabList>
            <Tab fontSize={"16px"} textStyle={"medium"}>
              Top Events
            </Tab>
            {sports &&
              sports.map((sport) => {
                return (
                  <>
                    <Tab fontSize={"13.3px"}>
                      <Img onc src={sport.Image} marginRight={"5px"} />
                      {sport.Name}
                    </Tab>
                  </>
                );
              })}
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* Top Event */}
              <TableContainer>
                <Table variant="striped" colorScheme="pink">
                  <Tbody fontSize={"16px"} padding={"5px"} margin={"10px"}>
                    <Tr>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Premier League</Text>
                        </Flex>
                      </Td>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Bundesliga</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Laliga</Text>
                        </Flex>
                      </Td>

                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Series A</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Ligue</Text>
                        </Flex>
                      </Td>

                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>NBA</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>NHL</Text>
                        </Flex>
                      </Td>

                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>NFL</Text>
                        </Flex>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            {/* Sports */}
            {sports &&
              sports.map((sport) => {
                return (
                  <>
                    <TabPanel>
                      <TableContainer>
                        <Table variant="striped" colorScheme="pink">
                          <Tbody>
                            {leagues &&
                              leagues.results
                                .filter((league) => league.has_toplist == 1)
                                .map((league) => {
                                  return (
                                    <>
                                      <Tr>
                                        <Td>
                                          {" "}
                                          <Flex
                                            alignItems={"center"}
                                            gap={"10px"}
                                          >
                                            <Img
                                              h={"20px"}
                                              w={"20px"}
                                              src={sport.Image}
                                            />
                                            <Text>{league.name}</Text>
                                          </Flex>
                                        </Td>
                                        <Td>
                                          {" "}
                                          <Flex
                                            alignItems={"center"}
                                            gap={"10px"}
                                          >
                                            <Img
                                              h={"20px"}
                                              w={"20px"}
                                              src={sport.Image}
                                            />
                                            <Text>{league.name}</Text>
                                          </Flex>
                                        </Td>
                                      </Tr>
                                    </>
                                  );
                                })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                  </>
                );
              })}
          </TabPanels>
          {/* <Table variant="striped" colorScheme="teal">
                  <Tbody>
                    <Tr>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Premier League</Text>
                        </Flex>
                      </Td>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Bundesliga</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Laliga</Text>
                        </Flex>
                      </Td>

                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Series A</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>Ligue</Text>
                        </Flex>
                      </Td>

                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>NBA</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>NHL</Text>
                        </Flex>
                      </Td>

                      <Td>
                        {" "}
                        <Flex alignItems={"center"} gap={"10px"}>
                          <Img h={"20px"} w={"20px"} src={football} />
                          <Text>NFL</Text>
                        </Flex>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table> */}
        </Tabs>
      </Box>
    </>
  );
}

export default TopEvents;
