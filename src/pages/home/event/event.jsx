// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   CircularProgress,
//   Tooltip,
//   Text,
// } from "@chakra-ui/react";

// const Event = () => {
//   const [latestOdds, setLatestOdds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const source = "1xbet";

//         const response = await axios.get(
//           `https://api.b365api.com/v2/event/odds?event_id=7638406&token=179024-3d6U7zylacO78f&source=${source}`
//         );

//         const oddsData = response.data.results?.odds?.["1_1"] || [];
//         const latestOdd = oddsData[oddsData.length - 1]; // Get the latest odd
//         const oddsWithoutLatest = oddsData.slice(0, -1); // Exclude the latest odd
//         setLatestOdds({ latestOdd, oddsWithoutLatest, source });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Box p="4">
//       <h1>Odds Table</h1>
//       {loading ? (
//         <CircularProgress isIndeterminate color="teal.500" />
//       ) : (
//         <Table variant="striped" colorScheme="teal" style={{ width: "100%" }}>
//           <Thead>
//             <Tr>
//               <Th>Source</Th>
//               <Th>ID</Th>
//               <Th>Home Odds</Th>
//               <Th>Draw Odds</Th>
//               <Th>Away Odds</Th>
//               <Th>Score</Th>
//               <Th>Time</Th>
//               <Th>Time</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             <Tr key={latestOdds.latestOdd.id}>
//               <Td>
//                 <Tooltip
//                   label={
//                     <Table variant="simple">
//                       <Thead>
//                         <Tr>
//                           <Th>ID</Th>
//                           <Th>Home Odds</Th>
//                           <Th>Draw Odds</Th>
//                           <Th>Away Odds</Th>
//                           <Th>Score</Th>
//                           <Th>Time</Th>
//                         </Tr>
//                       </Thead>
//                       <Tbody>
//                         {latestOdds.oddsWithoutLatest.map((odd) => (
//                           <Tr key={odd.id}>
//                             <Td>{odd.id}</Td>
//                             <Td>{odd.home_od}</Td>
//                             <Td>{odd.draw_od}</Td>
//                             <Td>{odd.away_od}</Td>
//                             <Td>{odd.ss}</Td>
//                             <Td>{odd.time_str}</Td>
//                           </Tr>
//                         ))}
//                       </Tbody>
//                     </Table>
//                   }
//                 >
//                   <Box as="span" cursor="pointer">
//                     {latestOdds.source}
//                   </Box>
//                 </Tooltip>
//               </Td>
//               <Td>{latestOdds.latestOdd.id}</Td>
//               <Td>{latestOdds.latestOdd.home_od}</Td>
//               <Td>{latestOdds.latestOdd.draw_od}</Td>
//               <Td>{latestOdds.latestOdd.away_od}</Td>
//               <Td>{latestOdds.latestOdd.ss}</Td>
//               <Td>{latestOdds.latestOdd.time_str}</Td>

//               <Td>{Date(latestOdds.latestOdd.add_time * 1000)}</Td>
//             </Tr>
//           </Tbody>
//         </Table>
//       )}
//     </Box>
//   );
// };

// export default Event;

// above code is correrct  and working fine

//
//
//
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
} from "@chakra-ui/react";

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
        setLatestOdds({
          latestOdd,
          oddsWithoutLatest,
          source,
          expanded: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p="4">
      <h1>Odds Table</h1>
      {loading ? (
        <CircularProgress isIndeterminate color="teal.500" />
      ) : (
        <Table variant="striped" colorScheme="teal" style={{ width: "100%" }}>
          <Thead>
            <Tr>
              <Th>Source</Th>
              <Th>ID</Th>
              <Th>Home Odds</Th>
              <Th>Draw Odds</Th>
              <Th>Away Odds</Th>
              <Th>Score</Th>
              <Th>Time</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              key={latestOdds.latestOdd.id}
              onClick={() =>
                setLatestOdds((prev) => ({ ...prev, expanded: !prev.expanded }))
              }
            >
              <Td>{latestOdds.source}</Td>
              <Td>{latestOdds.latestOdd.id}</Td>
              <Td>{latestOdds.latestOdd.home_od}</Td>
              <Td>{latestOdds.latestOdd.draw_od}</Td>
              <Td>{latestOdds.latestOdd.away_od}</Td>
              <Td>{latestOdds.latestOdd.ss}</Td>
              <Td>{latestOdds.latestOdd.time_str}</Td>
              <Td>{Date(latestOdds.latestOdd.add_time * 1000)}</Td>
            </Tr>
            {latestOdds.expanded && (
              <Tr>
                <Td colSpan={7}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Home Odds</Th>
                        <Th>Draw Odds</Th>
                        <Th>Away Odds</Th>
                        <Th>Score</Th>
                        <Th>Time</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {latestOdds.oddsWithoutLatest.map((odd) => (
                        <Tr key={odd.id}>
                          <Td>{odd.id}</Td>
                          <Td>{odd.home_od}</Td>
                          <Td>{odd.draw_od}</Td>
                          <Td>{odd.away_od}</Td>
                          <Td>{odd.ss}</Td>
                          <Td>{odd.time_str}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Event;
