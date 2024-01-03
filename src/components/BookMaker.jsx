import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const BookMaker = ({ id }) => {
  const [highestOdds, setHighestOdds] = useState({
    home: 0,
    draw: 0,
    away: 0,
    source: "none",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.b365api.com/v2/event/odds/summary?token=179024-3d6U7zylacO78f&event_id=${id}`
        );
        const data = await response.json();

        // Extract odds data from the response
        const bookmakers = Object.keys(data.results);

        // Initialize variables to store highest odds and their source
        let highestHomeOdds = 0;
        let highestDrawOdds = 0;
        let highestAwayOdds = 0;
        let highestHomeSource = "none";
        let highestDrawSource = "none";
        let highestAwaySource = "none";

        // Loop through bookmakers
        bookmakers.forEach((bookmaker) => {
          const oddsData = data.results[bookmaker].odds;

          // Check if odds are available for kickoff, half, and end
          const checkOdds = (oddsType) => {
            if (oddsData[oddsType] && oddsData[oddsType]["1_1"]) {
              const homeOdds = parseFloat(oddsData[oddsType]["1_1"].home_od);
              const drawOdds = parseFloat(oddsData[oddsType]["1_1"].draw_od);
              const awayOdds = parseFloat(oddsData[oddsType]["1_1"].away_od);

              // Update highest odds
              if (homeOdds > highestHomeOdds) {
                highestHomeOdds = homeOdds;
                highestHomeSource = bookmaker;
              }

              if (drawOdds > highestDrawOdds) {
                highestDrawOdds = drawOdds;
                highestDrawSource = bookmaker;
              }

              if (awayOdds > highestAwayOdds) {
                highestAwayOdds = awayOdds;
                highestAwaySource = bookmaker;
              }
            }
          };

          checkOdds("kickoff");
          checkOdds("half");
          checkOdds("end");
        });

        // Update the state with the highest odds and source
        setHighestOdds({
          home: highestHomeOdds,
          draw: highestDrawOdds,
          away: highestAwayOdds,
          source: {
            home: highestHomeSource,
            draw: highestDrawSource,
            away: highestAwaySource,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // E
  return (
    <HStack gap={"5px"}>
      <Box
        h={"85px"}
        w={"85px"}
        borderRadius={"8px"}
        bg={"#F8F8FF"}
        textAlign={"center"}
      >
        <Text fontWeight={"600"} fontSize={"16px"} color={"#656EF5"}>
          1
        </Text>
        <Text>{highestOdds.source.home}</Text>
        <Text fontWeight={"600"} fontSize={"16px"}>
          {highestOdds.home}
        </Text>
      </Box>
      <Box
        h={"85px"}
        w={"85px"}
        borderRadius={"8px"}
        bg={"#F8F8FF"}
        textAlign={"center"}
      >
        <Text fontWeight={"600"} fontSize={"16px"} color={"#656EF5"}>
          x
        </Text>
        <Text>{highestOdds.source.draw}</Text>
        <Text fontWeight={"600"} fontSize={"16px"}>
          {highestOdds.draw}
        </Text>
      </Box>
      <Box
        h={"85px"}
        w={"85px"}
        borderRadius={"8px"}
        bg={"#F8F8FF"}
        textAlign={"center"}
      >
        <Text fontWeight={"600"} fontSize={"16px"} color={"#656EF5"}>
          2
        </Text>
        <Text>{highestOdds.source.away}</Text>
        <Text fontWeight={"600"} fontSize={"16px"}>
          {highestOdds.away}
        </Text>
      </Box>
    </HStack>
  );
};

export default BookMaker;
