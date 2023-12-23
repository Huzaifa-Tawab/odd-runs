// Import the useState and useEffect hooks
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Img,
  Text,
} from "@chakra-ui/react";

const MenuItems = ({ data, Title, Image }) => {
  const [organizedData, setOrganizedData] = useState({});

  useEffect(() => {
    const organized = data.results.reduce((acc, result) => {
      const country = result.league.cc || "Unknown";
      const leagueName = result.league.name;
      const key = country;

      if (!acc[key]) {
        acc[key] = { count: 1, leagues: { [leagueName]: [result] } };
      } else {
        acc[key].count += 1;
        if (!acc[key].leagues[leagueName]) {
          acc[key].leagues[leagueName] = [result];
        } else {
          acc[key].leagues[leagueName].push(result);
        }
      }

      return acc;
    }, {});

    setOrganizedData(organized);
  }, [data.results]);

  const getFlagUrl = (countryCode) =>
    `https://flagsapi.com/${countryCode.toUpperCase()}/flat/64.png`;

  return (
    <AccordionItem border={"none"}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <Flex gap={5}>
              {/* Use the dynamic flag URL */}
              <Img src={Image} />
              <Text>{Title}</Text>
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel
        bg={"white"}
        color={"black"}
        borderRadius={"20px"}
        margin={"10px"}
        pb={4}
      >
        {Object.entries(organizedData).map(([country, info]) => (
          <div key={country}>
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      <Flex gap={5}>
                        {/* Use the dynamic flag URL */}
                        <Img src={getFlagUrl(country)} />
                        <Text>{`${country} ${
                          info.count > 1 ? `(${info.count})` : ""
                        }`}</Text>
                      </Flex>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  bg={"white"}
                  color={"black"}
                  borderRadius={"20px"}
                  margin={"10px"}
                  pb={4}
                >
                  {Object.entries(info.leagues).map(([leagueName, details]) => (
                    <div key={leagueName}>
                      <Text
                        padding={"5px"}
                        margin={"5px"}
                        borderRadius={"20px"}
                        bg={"teal"}
                      >
                        {`${leagueName} ${
                          details.length > 1 ? `(${details.length})` : ""
                        }`}
                      </Text>
                    </div>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default MenuItems;
