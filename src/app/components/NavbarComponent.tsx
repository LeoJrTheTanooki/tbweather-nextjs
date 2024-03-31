"use client";

import { useCallback, useEffect, useState } from "react";
import images from "../../../public/assets/images";
import {
  Button,
  Colors,
  IconButton,
  Menu,
  PixelIcon,
  Spacer,
  Text,
  Toolbar,
  setDarkModeActivation,
} from "nes-ui-react";

const NavbarComponent = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  const darkCheck = () => {
    // Checks if dark-mode exists in local storage, returns are to be used for the useState

    if (localStorage.getItem("dark-mode")) {
      // If it does, run this check to see its current state
      if (localStorage.getItem("dark-mode") === "true") {
        // Applies Flowbite's dark mode alongside NES-UI's
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }
    // If it doesn't, make it exist and initialize it as false to start at light mode
    else {
      localStorage.setItem("dark-mode", "false");
      setDarkMode(false);
    }
  };

  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
    if (localStorage.getItem("dark-mode") === "true") {
      localStorage.setItem("dark-mode", "false");
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      // console.log(document.body.style.backgroundImage);
    } else {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    }
  }, [darkMode]);

  useEffect(() => {
    // setIsClient(true);
    setDarkModeActivation(darkMode);
    darkCheck();
  }, [darkMode]);

  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <>
      <Toolbar
        // Experimented using hexes to adjust colors
        style={
          darkMode
            ? { backgroundColor: Colors.color0A, borderBottom: `solid 4px ${Colors.color0F}` }
            : { backgroundColor: Colors.color3B, borderBottom: `solid 4px ${Colors.color0F}` }
        }
        borderless
        roundedCorners={false}
        className=" border"
      >
        <div>
          <img
            id="testId"
            className="h-16 w-16"
            src="/assets/mainLogo.png"
            alt=""
          />
          <Text className="self-center" size="xlarge">
            TBWeather
          </Text>
        </div>
        <Spacer />
        {/* <Input type="search" name="" id="searchValue" />
        <a
        //  onClick={() => getData(searchValue.value)}
         >
          <img className="h-16 w-16" src={images.searchIcon} alt="" />
        </a> */}
        <IconButton onClick={toggleDarkMode} color="warning">
          <PixelIcon
            name={darkMode ? "pixelicon-sun" : "pixelicon-moon"}
            size="medium"
          />
        </IconButton>
        <a
          title="Favorites Dropdown Coming Soon"
          className=" opacity-50"
          // onClick={() => setShowMoreMenu(true)}
        >
          <img className="h-16 w-16" src="/assets/Save.png" alt="" />
        </a>
      </Toolbar>
      <div className=" flex justify-end">
        <Menu open={showMoreMenu} modal onClose={() => setShowMoreMenu(false)}>
          <Button color="primary">
            <Text size="small">No Locations Saved</Text>
          </Button>

          {/* <IconButton color="primary" size="small">
            <PixelIcon name="pixelicon-checkmark" size="small" />
            <Text size="small">Accept</Text>
          </IconButton>

          <IconButton color="error" size="small">
            <PixelIcon name="pixelicon-close" size="small" />
            <Text size="small">Decline</Text>
          </IconButton> */}
        </Menu>
      </div>
    </>
  );
};

export default NavbarComponent;
