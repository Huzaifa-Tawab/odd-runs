import React from "react";
import { useLocation } from "react-router-dom";
import {
  Flex,
  Input,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

const Link = ({ to, children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <RouterLink
      to={to}
      style={{
        color: isActive(to) ? "white" : "black",
        borderRadius: "20px",
        background: isActive(to) ? "#656EF5" : "none",
        padding: "4px 15px",
        mx: "2",
        cursor: "pointer",
        textDecoration: "none",
        fontSize: "1.5rem",
      }}
    >
      {children}
    </RouterLink>
  );
};

const NavBar = () => {
  return (
    <Flex w="100%" p="4" align="center" justify="space-between" bg={"white"}>
      {/* React Router Links */}
      <Link to="/">Home</Link>
      <Link to="/about">Next Matches</Link>
      <Link to="/services">Dropping odds</Link>
      <Link to="/contact">Sure Bets</Link>
      <Link to="/action">Bookmakers</Link>

      {/* Stadium Border Input */}
      <InputGroup w={"300px"}>
        <Input
          mx="2"
          placeholder="Search..."
          borderRadius="full"
          variant="outline"
          bgColor="gray.200" // Set your desired background color
        />
        <InputRightElement right={"9px"}>
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>

      <BellIcon boxSize={24} />
      {/* Circular Avatar and Dropdown */}
      <Menu>
        <MenuButton>
          <Flex align="center" cursor="pointer">
            <Avatar name="User" size="sm" mr="2" />
            <span
              style={{
                color: "black",
                fontSize: "1.5rem",
              }}
            >
              Skrzypek391 <ChevronDownIcon boxSize={24} />
            </span>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default NavBar;
