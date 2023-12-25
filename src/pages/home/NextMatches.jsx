import React, { useEffect, useState } from "react";
import { Img } from "@chakra-ui/react";

function NextMatches({ sportsList }) {
  const [sports, setSports] = useState([]);
  useEffect(() => {
    setSports(sportsList.results);
  }, [sportsList]);

  return (
    <>
      <div>Next matches</div>
    </>
  );
}

export default NextMatches;
