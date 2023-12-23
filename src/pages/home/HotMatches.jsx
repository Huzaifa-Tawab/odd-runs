import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";
import { Box, HStack } from "@chakra-ui/react";
import data from "../../components/test.json";
import OrganizeDataByCountry from "../../components/OrganizeDataByCountry";
function HotMatches({ upcomingEvents, sports }) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    setEvents(upcomingEvents.results);
  }, [upcomingEvents]);
  return (
    <>
      Hot matches
      <div>
        {events &&
          sports &&
          events.map((event) => {
            return;
            <>
              <p>{event.name}</p>;<p>sadasad</p>
            </>;
          })}
      </div>
    </>
  );
}

export default HotMatches;
