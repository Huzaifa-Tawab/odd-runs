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
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  BellIcon,
  ChevronDownIcon,
  SearchIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";

const Link = ({ to, children, isActive }) => (
  <RouterLink
    to={to}
    style={{
      color: isActive ? "white" : "black",
      borderRadius: "20px",
      background: isActive ? "#656EF5" : "none",
      padding: "4px 15px",
      mx: "2",
      cursor: "pointer",
      textDecoration: "none",
      fontSize: "16px", // Default font size in pixels
      // Responsive font size using media queries in pixels
      "@media screen and (min-width: 768px)": {
        fontSize: "18px",
      },
      "@media screen and (min-width: 992px)": {
        fontSize: "20px",
      },
    }}
  >
    {children}
  </RouterLink>
);

const NavBar = () => {
  const location = useLocation();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const isActive = (path) => location.pathname === path;

  // State to manage mobile menu
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Flex w="100%" p="4" align="center" justify="space-between" bg={"white"}>
      {isMobile && (
        <IconButton
          icon={<HamburgerIcon />}
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        />
      )}

      {/* React Router Links */}
      {!isMobile && (
        <>
          <Link to="/" isActive={isActive("/")}>
            Home
          </Link>
          <Link to="/about" isActive={isActive("/about")}>
            Next Matches
          </Link>
          <Link to="/services" isActive={isActive("/services")}>
            Dropping odds
          </Link>
          <Link to="/contact" isActive={isActive("/contact")}>
            Sure Bets
          </Link>
          <Link to="/action" isActive={isActive("/action")}>
            Bookmakers
          </Link>
        </>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Flex direction="column">
                <Link to="/" isActive={isActive("/")}>
                  Home
                </Link>
                <Link to="/about" isActive={isActive("/about")}>
                  Next Matches
                </Link>
                <Link to="/services" isActive={isActive("/services")}>
                  Dropping odds
                </Link>
                <Link to="/contact" isActive={isActive("/contact")}>
                  Sure Bets
                </Link>
                <Link to="/action" isActive={isActive("/action")}>
                  Bookmakers
                </Link>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      {/* Stadium Border Input */}
      {!isMobile && (
        <InputGroup w={"300px"}>
          <Input
            mx="2"
            placeholder="Search..."
            borderRadius="full"
            variant="outline"
            bgColor="gray.200"
          />
          <InputRightElement right={"9px"}>
            <SearchIcon color="gray.500" />
          </InputRightElement>
        </InputGroup>
      )}

      <BellIcon boxSize={24} />
      {/* Circular Avatar and Dropdown */}
      <Menu>
        <MenuButton>
          <Flex align="center" cursor="pointer">
            <Avatar name="User" size="sm" mr="2" />
            <span
              style={{
                color: "black",
                fontSize: "1rem", // Default font size in pixels
                // Responsive font size using media queries in pixels
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
