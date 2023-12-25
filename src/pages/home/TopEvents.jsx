import React, { useEffect, useState } from "react";
import { Img } from "@chakra-ui/react";

function TopEvents({ sportsList }) {
  const [sports, setSports] = useState([]);
  const [event, setEvent] = useState("Top");
  useEffect(() => {
    setSports(sportsList.results);
  }, [sportsList]);

  return (
    <>
      <div onClick={() => setEvent("Top")}>Top events</div>
      {sports &&
        sports.map((sport) => {
          return (
            <>
              <div onClick={() => setEvent(sport.sport_id)}>
                {sport.Name} <Img onc src={sport.Image} />
              </div>
              ------
            </>
          );
        })}
      .................................................
      <div></div>
      {event == "Top" && "Top Events "}
      {event != null && event != "Top" && (
        <div>{sports.find((sport) => sport.sport_id == event).Name} Events</div>
      )}
    </>
  );
}

export default TopEvents;
