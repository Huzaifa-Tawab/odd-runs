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
import countries from "../json/countries";

const MenuItems = ({ data, Title, Image }) => {
  const [organizedData, setOrganizedData] = useState({});

  useEffect(() => {
    const organized = data.results.reduce((acc, result) => {
      const country = result.league.cc != null ? result.league.cc : "World";
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
    `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;

  return (
    <AccordionItem border={"none"}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            <Flex alignItems={"center"} gap={5}>
              {/* Use the dynamic flag URL */}
              <Img w={"15px"} h={"15px"} src={Image} />
              <Text fontSize={"16px"} textStyle={"regular"}>
                {Title}
              </Text>
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
                      <Flex gap={"5px"}>
                        {/* Use the dynamic flag URL */}
                        <Img w={"20px"} h={"20px"} src={getFlagUrl(country)} />
                        <Text fontSize={"12px"} textStyle={"regular"}>
                          {`${countries[country] || "World"} ${
                            info.count > 1 ? `(${info.count})` : ""
                          }`}
                        </Text>
                      </Flex>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  bg={"white"}
                  color={"black"}
                  borderRadius={"20px"}
                  pb={4}
                >
                  {Object.entries(info.leagues).map(([leagueName, details]) => (
                    <div key={leagueName}>
                      <a
                        href={`/${Title}/${
                          countries[country] || "World"
                        }/${leagueName}`}
                      >
                        <Text
                          padding={"5px"}
                          margin={"5px 0px"}
                          borderRadius={"20px"}
                          bg={"#656EF51A"}
                          textAlign={"center"}
                          fontSize={"10px"}
                          textStyle={"regular"}
                        >
                          {`${leagueName} ${
                            details.length > 1 ? `(${details.length})` : ""
                          }`}
                        </Text>
                      </a>
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
