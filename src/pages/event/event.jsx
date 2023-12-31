import React, { useRef, useState, useEffect } from "react";
import NavBar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Box, HStack } from "@chakra-ui/react";
import sports from "../../json/sports";
import RightSidebar from "../../components/RightSidebar";
import { useParams } from "react-router-dom";
import EventComponent from "./EventComponent1";
function Event() {
  const [mobileView, setMobileView] = useState(window.innerWidth < 700);
  const params = useParams();
  const handleResize = () => {
    setMobileView(window.innerWidth < 700);
  };

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
        <HStack alignItems={"end"}>
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
            <EventComponent params={params} />
            {/* <EventComponent params={params} /> */}
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

export default Event;
