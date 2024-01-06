import React, { useRef, useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";
import axios from "axios";
import { Route, Link, Routes, useParams, useLocation } from "react-router-dom";
import { Flex, Img, Stack, Text, Box, HStack } from "@chakra-ui/react";
import sports from "../../json/sports.json";
import SportsIMG from "../../json/sportsImg";
import BookMakerLight from "../../components/BookMakerLight";
import LeaguesNextMatches from "./components/nextmatches";
import LeagueStandings from "./components/standings";
import LeaguesInplayMatches from "./components/inplay";
function SportCountryLeague() {
  const [mobileView, setMobileView] = useState(window.innerWidth < 700);

  const handleResize = () => {
    setMobileView(window.innerWidth < 700);
  };
  const { state } = useLocation();
  const params = useParams();

  const [mode, setMode] = useState("upcoming");

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  console.log(state);

  return (
    <HStack
      gap={"0px"}
      justifyContent={"start"}
      alignItems={"start"}
      bg={"#F8F8FF"}
    >
      {mobileView ? <></> : <Sidebar sportsList={sports} />}
      <Box w={mobileView ? "100vw" : "80vw"}>
        <NavBar />
        <HStack
          alignItems={"end"}
          bg={"white"}
          borderRadius={"16px"}
          margin={"5px"}
          padding={"10px"}
        >
          <Box
            w={mobileView ? "100%" : "80%"}
            overflowY={"scroll"}
            h={"85vh"}
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#656EF5",
                borderRadius: "24px",
              },
            }}
          >
            <>
              {params && (
                <>
                  <HStack>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"#656EF5"}
                    >
                      {params["sport"]}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"black"}
                    >
                      {">"}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"#656EF5"}
                    >
                      {params["country"]}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"black"}
                    >
                      {">"}
                    </Text>
                    <Text
                      fontSize={"16px"}
                      textStyle={"medium"}
                      color={"black"}
                    >
                      {params["league"]}
                    </Text>
                  </HStack>
                  <Text
                    marginTop={"10px"}
                    fontSize={"22px"}
                    textStyle={"medium"}
                    color={"black"}
                  >
                    {params["league"]}
                  </Text>
                </>
              )}
              <div onClick={() => setMode("upcoming")}>upcoming</div>
              <div onClick={() => setMode("inplay")}>inplay</div>
              <div onClick={() => setMode("results")}>results</div>
              <div onClick={() => setMode("standings")}>standings</div>

              {mode == "upcoming" && (
                <LeaguesNextMatches
                  sport_id={state.sport_id}
                  league_id={state.league_id}
                  sport={params["sport"]}
                  league={params["league"]}
                  country={params["country"]}
                ></LeaguesNextMatches>
              )}

              {mode == "standings" && (
                <>
                  <LeagueStandings
                    sport_id={state.sport_id}
                    league_id={state.league_id}
                  ></LeagueStandings>
                </>
              )}
              {mode == "inplay" && (
                <>
                  <LeaguesInplayMatches
                    sport_id={state.sport_id}
                    league_id={state.league_id}
                    sport={params["sport"]}
                    league={params["league"]}
                    country={params["country"]}
                  ></LeaguesInplayMatches>
                </>
              )}
              {mode == "results" && <>results</>}
            </>
          </Box>
          {/* Right side */}
          {mobileView ? (
            <></>
          ) : (
            <Box w={"20%"} h={"100%"} maxW={"300px"}>
              <RightSidebar />
            </Box>
          )}
        </HStack>
      </Box>
    </HStack>
  );
}

export default SportCountryLeague;
