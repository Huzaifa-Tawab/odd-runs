import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChakraProvider,
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
  const [oddsData, setOddsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.b365api.com/v2/event/odds?event_id=7638406&token=179024-3d6U7zylacO78f&source=1xbet"
        );
        setOddsData(response.data.results?.odds?.["1_1"] || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Home Odds", accessor: "home_od" },
      { Header: "Draw Odds", accessor: "draw_od" },
      { Header: "Away Odds", accessor: "away_od" },
      { Header: "Score", accessor: "ss" },
      { Header: "Time", accessor: "time_str" },
    ],
    []
  );

  return (
    <Box p="4">
      <h1>Odds Table</h1>
      {loading ? (
        <CircularProgress isIndeterminate color="teal.500" />
      ) : (
        <Table variant="striped" colorScheme="teal" style={{ width: "100%" }}>
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.Header}>{column.Header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {oddsData.map((row) => (
              <Tr key={row.id}>
                {columns.map((column) => (
                  <Td key={column.Header}>{row[column.accessor]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Event;
