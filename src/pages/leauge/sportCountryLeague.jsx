import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useParams } from "react-router-dom";
import { Box, Button, Flex, HStack, Img, Stack, Text } from "@chakra-ui/react";

import sports from "../../json/sports.json";
import SportsIMG from "../../json/sportsImg";
const SportCountryLeague = () => {
  const [events, setEvents] = useState([]);
  const [sport, setCurrentSport] = useState(null);

  const params = useParams();
  console.log(params);

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
  }, [params, sport]);

  async function getUpcomingEvents() {
    if (sport) {
      let config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: `https://api.b365api.com/v1/events/upcoming?token=179024-3d6U7zylacO78f&sport_id=${sport.sport_id}`,
        headers: {},
      };
      try {
        let response = await axios.request(config);
        if (response && response.data) {
          let data = response.data.results;

          if (
            data.some(
              (res) =>
                res.league.name.toLowerCase() == params["league"].toLowerCase()
            )
          ) {
            let filter = data.filter(
              (res) =>
                res.league.name.toLowerCase() == params["league"].toLowerCase()
            );
            setEvents(filter);
          }
        } else {
          return {};
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

  return (
    <>
      {params && (
        <>
          <div>
            {params["sport"]} {">"} {params["country"]} {">"}
            {params["league"]}
          </div>
          <div>{params["league"]} Betting Odds</div>
        </>
      )}
      {sport && (
        <>
          <div>
            <Img src={SportsIMG[sport.Name]} /> {params["sport"]} /
            <Img src={SportsIMG[sport.Name]} /> {params["country"]}/
            {params["league"]}
          </div>
        </>
      )}
      {events &&
        events.map((event) => {
          console.log(event);
          return (
            <>
              <div key={event.id}>
                {new Date(event.time * 1000).toLocaleTimeString()}
                <Img src={getTeamUrl(event.home.image_id)} />
                {event.home.name}
                <div> -</div>
                <Img src={getTeamUrl(event.away.image_id)} />
                {event.away.name}
                <div>--------</div>
              </div>
            </>
          );
        })}
    </>
    // <ChakraProvider>
    //   <Box p="4">
    //     <h1>Football League Table</h1>
    //     {loading ? (
    //       <CircularProgress isIndeterminate color="teal.500" />
    //     ) : (
    //       <Table variant="striped" colorScheme="teal" style={{ width: "100%" }}>
    //         <Thead>
    //           <Tr>
    //             {columns.map((column) => (
    //               <Th key={column.Header}>{column.Header}</Th>
    //             ))}
    //           </Tr>
    //         </Thead>
    //         <Tbody>
    //           {tableData.map((row) => (
    //             <Tr key={row.pos}>
    //               {columns.map((column) => (
    //                 <Td key={column.Header}>
    //                   {column.accessor.includes(".")
    //                     ? row[column.accessor.split(".")[0]][
    //                         column.accessor.split(".")[1]
    //                       ]
    //                     : row[column.accessor]}
    //                 </Td>
    //               ))}
    //             </Tr>
    //           ))}
    //         </Tbody>
    //       </Table>
    //     )}
    //   </Box>
    // </ChakraProvider>
  );
};

export default SportCountryLeague;
