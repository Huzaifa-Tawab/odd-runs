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

const LeagueStandings = ({ spot_id, league_id }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.b365api.com/v3/league/table?token=179024-3d6U7zylacO78f&league_id=${league_id}`
        );
        setTableData(response.data.results[0]?.overall?.tables[0]?.rows || []);
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
      { Header: "Pos", accessor: "pos" },
      { Header: "Team", accessor: "team.name" },
      { Header: "Win", accessor: "win" },
      { Header: "Draw", accessor: "draw" },
      { Header: "Loss", accessor: "loss" },
      { Header: "Goals For", accessor: "goalsfor" },
      { Header: "Goals Against", accessor: "goalsagainst" },
      { Header: "Points", accessor: "points" },
    ],
    []
  );

  return (
    <ChakraProvider>
      <Box p="4">
        <h1>Football League Table</h1>
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
              {tableData.map((row) => (
                <Tr key={row.pos}>
                  {columns.map((column) => (
                    <Td key={column.Header}>
                      {column.accessor.includes(".")
                        ? row[column.accessor.split(".")[0]][
                            column.accessor.split(".")[1]
                          ]
                        : row[column.accessor]}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default LeagueStandings;
