import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";
import { Box, HStack } from "@chakra-ui/react";
import data from "../../components/test.json";
import OrganizeDataByCountry from "../../components/OrganizeDataByCountry";
function HotMatches({ upcomingEvents, sportsList }) {
  const [events, setEvents] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    setEvents(upcomingEvents.results);
    setSports(sportsList.sports);
  }, [upcomingEvents, sportsList]);
  return (
    <>
      Hot matches
      <div>
        {events &&
          sports &&
          events.map((event) => {
            return (
              <>
                <div>
                  {sports.filter((e) => e.sport_id == event.sport_id).Name ??
                    ""}
                  {event.league.name}
                </div>
                <div>
                  {event.home.name} - {event.away.name}
                </div>
                <p></p>
              </>
            );
          })}
      </div>
    </>
  );
}

export default HotMatches;
