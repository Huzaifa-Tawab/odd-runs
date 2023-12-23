import React, { useEffect, useState } from "react";
import { Img } from "@chakra-ui/react";

function TopEvents({ sportsList }) {
  const [sports, setSports] = useState([]);
  useEffect(() => {
    setSports(sportsList.results);
  }, [sportsList]);

  return (
    <>
      Top events
      {sports &&
        sports.map((sport) => {
          
        return <></>  {
            sport.Name;
          }
          <Img src={sport.Image} />;
        })}
    </>
  );
}

export default TopEvents;
