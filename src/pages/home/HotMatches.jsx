import React, { useEffect, useState } from "react";
import { Img } from "@chakra-ui/react";

function HotMatches({ upcomingEvents, sportsList }) {
  const [events, setEvents] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    setEvents(upcomingEvents.results);
    setSports(sportsList.results);
  }, [upcomingEvents, sportsList]);

  const getTeamUrl = (image_id) =>
    `https://assets.b365api.com/images/team/s/${image_id}.png`;
  const getFlagUrl = (countryCode) =>
    `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;
  return (
    <>
      Hot matches
      <div>
        {events &&
          sports &&
          events.slice(0, 3).map((event) => {
            let sportName = "";
            sports.forEach((e) => {
              if (e.sport_id == event.sport_id) {
                sportName = e.Name;
              }
            });
            return (
              <>
                {sportName}
                <div>
                  {event.league.name.split("")}
                  <Img src={getFlagUrl(event.league.cc || "Unknown")} />
                </div>
                <div>
                  <Img src={getTeamUrl(event.home.image_id)} />
                  {event.home.name} -
                  <Img src={getTeamUrl(event.away.image_id)} />
                  {event.away.name}
                </div>
                {new Date(event.time).toLocaleString()}
                <p>------------</p>
              </>
            );
          })}
      </div>
    </>
  );
}

export default HotMatches;
