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

function TopEvents({ sportsList }) {
  const [sports, setSports] = useState([]);
  const [event, setEvent] = useState("Top");
  useEffect(() => {
    setSports(sportsList.results);
  }, [sportsList]);

  return (
    <>
      {/* <div onClick={() => setEvent("Top")}>Top events</div>
      {sports &&
        sports.map((sport) => {
          return (
            <>
              <div onClick={() => setEvent(sport.sport_id)}>
                {sport.Name} <Img onc src={sport.Image} />
              </div>
              ------
            </>
          );
        })}
      .................................................
      <div></div>
      {event == "Top" && "Top Events "}
      {event != null && event != "Top" && (
        <div>{sports.find((sport) => sport.sport_id == event).Name} Events</div>
      )} */}
      <Box bg={"#fff"} borderRadius={"10px"} padding={"10px"} margin={"10px"}>
        <Tabs>
          <TabList>
            <Tab fontSize={'22px'}>Top Events</Tab>
            <Tab fontSize={'22px'}>Football</Tab>
            <Tab fontSize={'22px'}>Baseball</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* Football */}
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
                  <Tbody fontSize={"20px"} padding={"5px"} margin={"10px"}>
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
            <TabPanel>
              {/* Top Events */}
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
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
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              {/* Baseball */}
              <TableContainer>
                <Table variant="striped" colorScheme="teal">
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
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default TopEvents;
