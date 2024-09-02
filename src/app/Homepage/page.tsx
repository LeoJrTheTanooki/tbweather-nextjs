"use client";

import { Container, Input, Text, setDarkModeActivation } from "nes-ui-react";
import { useCallback, useEffect, useState } from "react";
import { IForecast, Iweather } from "../../Interfaces/Interfaces";
import { getForecast, getWeather } from "@/utils/Dataservices";
import NavbarComponent from "../components/NavbarComponent";
// import { useLocalStorage } from "next-localstorage"

// Call a local storage item called dark-mode
// If dark-mode is nonexistent, create the item and set its key to false
// Make darkMode useState equal to whatever dark-mode item is
// If dark-mode item cannot be used, declare variable before it and make that equal to a boolean

const HomePageComponent = () => {
  // Variable data generated using LLM
  const weatherDefault: Iweather = {
    // Manually changed weather
    weather: [
      {
        id: 0,
        main: "???",
        description: "???",
        icon: "???",
      },
    ],
    base: "???",
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
    },
    clouds: {
      all: 0,
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      country: "???",
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: "???",
    cod: 0,
    coord: {
      lat: 0,
      lon: 0,
    },
  };

  const [isClient, setIsClient] = useState<boolean>(false);
  const [weather, setWeather] = useState<Iweather>(weatherDefault);
  const [currentTime, setCurrentTime] = useState<string>("04:00 PM");
  const [savedLocales, setSavedLocales] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [iconDay2, setIconDay2] = useState<string>("");
  const [iconDay3, setIconDay3] = useState<string>("");
  const [iconDay4, setIconDay4] = useState<string>("");
  const [iconDay5, setIconDay5] = useState<string>("");

  const [tempDay2, setTempDay2] = useState<number>(0);
  const [tempDay3, setTempDay3] = useState<number>(0);
  const [tempDay4, setTempDay4] = useState<number>(0);
  const [tempDay5, setTempDay5] = useState<number>(0);

  const [humDay2, setHumDay2] = useState<number>(0);
  const [humDay3, setHumDay3] = useState<number>(0);
  const [humDay4, setHumDay4] = useState<number>(0);
  const [humDay5, setHumDay5] = useState<number>(0);

  const [dtDay2, setDtDay2] = useState<number>(0);
  const [dtDay3, setDtDay3] = useState<number>(0);
  const [dtDay4, setDtDay4] = useState<number>(0);
  const [dtDay5, setDtDay5] = useState<number>(0);

  const [searchInput, setSearchInput] = useState<string>("");
  const [storageDependancy, setStorageDependancy] = useState<boolean>(false);

  const currentIcon = (iconCodeLocation: string) => {
    // Figure out how to import functions from other components at some point

    switch (iconCodeLocation) {
      case "01d":
        return "/assets/clear.png";
      case "01n":
        return "/assets/clearNight.png";
      case "02d":
        return "/assets/fewClouds.png";
      case "02n":
        return "/assets/fewCloudsNight.png";
      case "03d":
        return "/assets/partCloudy.png";
      case "03n":
        return "/assets/partCloudyNight.png";
      case "04d":
        return "/assets/cloudy.png";
      case "04n":
        return "/assets/cloudyNight.png";
      case "09d":
        return "/assets/rain.png";
      case "09n":
        return "/assets/rainNight.png";
      case "10d":
        return "/assets/lightRain.png";
      case "10n":
        return "/assets/lightRainNight.png";
      case "11d":
        return "/assets/storm.png";
      case "11n":
        return "/assets/stormNight.png";
      case "13d":
        return "/assets/snow.png";
      case "13n":
        return "/assets/snowNight.png";
      case "50d":
        return "/assets/fog.png";
      case "50n":
        return "/assets/fogNight.png";
      default:
        return "/assets/unknown.png";
    }
  };

  const currentDay = (dtNum: number) => {
    switch (dtNum) {
      case 0:
        return "Sun.";
      case 1:
        return "Mon.";
      case 2:
        return "Tue.";
      case 3:
        return "Wed.";
      case 4:
        return "Thu.";
      case 5:
        return "Fri.";
      case 6:
        return "Sat.";
      default:
        return "???";
    }
  };

  const timeConvert = (hour: number, minute: number) => {
    let amPm = " AM";
    if (hour > 12) {
      amPm = " PM";
    }
    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour = hour - 12;
    }

    let stringHour = hour.toString();
    let stringMinute = minute.toString();

    if (hour < 10) {
      stringHour = "0" + stringHour;
    }
    if (minute < 10) {
      stringMinute = "0" + stringMinute;
    }

    return stringHour + ":" + stringMinute + amPm;
  };

  const getData = async (search: string = "Stockton") => {
    const weatherData = await getWeather(search);
    const forecastData = await getForecast(search);
    if (weatherData.cod != 404) {
      setWeather(weatherData);

      console.log(weatherData);
      //   console.log(forecastData);

      // Assigning to variables for readability
      let forecastList = forecastData.list.filter((obj) => {
        let dateVar = new Date(
          (obj.dt + forecastData.city.timezone) * 1000
        ).toString();
        if (
          dateVar.includes("12:00:00") ||
          dateVar.includes("11:00:00") ||
          dateVar.includes("10:00:00")
        ) {
          return true;
        } else {
          return false;
        }
      });

      let todaysDay = new Date(
        (weatherData.dt + weatherData.timezone) * 1000
      ).getDay();

      let forecastDay = new Date(
        (forecastList[0].dt + forecastData.city.timezone) * 1000
      ).getDay();

      let todaysHour = new Date(
        (weatherData.dt + weatherData.timezone) * 1000
      ).getUTCHours();

      let todaysMinute = new Date(
        (weatherData.dt + weatherData.timezone) * 1000
      ).getUTCMinutes();

      setCurrentTime(timeConvert(todaysHour, todaysMinute));

      // console.log(new Date((weather.dt + weather.timezone) * 1000));

      if (forecastDay !== todaysDay + 1) {
        forecastList.shift();
      }

      let day2Data = forecastList[0];

      let day3Data = forecastList[1];

      let day4Data = forecastList[2];

      let day5Data = forecastList[3];

      setIconDay2(day2Data.weather[0].icon);
      setIconDay3(day3Data.weather[0].icon);
      setIconDay4(day4Data.weather[0].icon);
      setIconDay5(day5Data.weather[0].icon);

      setTempDay2(day2Data.main.temp);
      setTempDay3(day3Data.main.temp);
      setTempDay4(day4Data.main.temp);
      setTempDay5(day5Data.main.temp);

      setHumDay2(day2Data.main.humidity);
      setHumDay3(day3Data.main.humidity);
      setHumDay4(day4Data.main.humidity);
      setHumDay5(day5Data.main.humidity);

      setDtDay2((day2Data.dt + forecastData.city.timezone) * 1000);
      setDtDay3((day3Data.dt + forecastData.city.timezone) * 1000);
      setDtDay4((day4Data.dt + forecastData.city.timezone) * 1000);
      setDtDay5((day5Data.dt + forecastData.city.timezone) * 1000);
    } else {
      setWeather(weatherDefault);

      setIconDay2("?");
      setIconDay3("?");
      setIconDay4("?");
      setIconDay5("?");

      setTempDay2(0);
      setTempDay3(0);
      setTempDay4(0);
      setTempDay5(0);

      setHumDay2(0);
      setHumDay3(0);
      setHumDay4(0);
      setHumDay5(0);

      setDtDay2(0);
      setDtDay3(0);
      setDtDay4(0);
      setDtDay5(0);
      setCurrentTime(timeConvert(16, 0));
    }
  };

  useEffect(() => {
    setIsClient(true);
    getData();
  }, []);

  useEffect(() => {
    const localStorageData = localStorage.getItem("saved-locations");
    if (localStorageData) {
      setSavedLocales(JSON.parse(localStorageData));
    }
  }, [storageDependancy]);

  useEffect(() => {
    console.log(savedLocales);
  }, [savedLocales]);

  return (
    <div className="grid justify-center">
      <div className="flex items-center justify-end">
        <Input
          type="search"
          name="searchInput"
          id="searchInput"
          onChange={(e) => setSearchInput(e)}
        />
        <a onClick={() => getData(searchInput)}>
          <img className="h-16 w-16" src="/assets/Search.png" alt="" />
        </a>
      </div>
      <Container className="w-max">
        <div className="grid grid-cols-2 min-[460px]:grid-cols-4 justify-items-center gap-y-8">
          <div className=" col-span-2 min-[460px]:col-span-4 grid md:grid-cols-3 justify-items-start gap-y-8 w-full">
            <div className="order-2 md:order-1 justify-self-center">
              <img
                className="h-64 w-64"
                src={isClient ? currentIcon(weather.weather[0].icon) : "???"}
                alt="???"
              />
            </div>
            <div className="order-3 md:order-2 md:col-span-1 justify-self-center">
              <Text size="xlarge" className="underline pressStart2P">
                {isClient ? weather && weather.name : "???"},{" "}
                {isClient ? weather && weather.sys.country : "???"}{" "}
              </Text>
              <Text size="xlarge">
                {isClient ? weather && weather.weather[0].main : "???"}
              </Text>
              <Text size="xlarge">
                {isClient ? weather && Math.round(weather.main.temp) : "0"}
                °F
              </Text>
              <Text size="xlarge">
                MAX:
                {isClient ? weather && Math.round(weather.main.temp_max) : "0"}°
                MIN:
                {isClient ? weather && Math.round(weather.main.temp_min) : "0"}°
              </Text>
              <Text size="xlarge">
                HUM:
                {isClient ? weather && weather.main.humidity : "0"}%
              </Text>
              <Text size="xlarge">
                {isClient
                  ? weather &&
                    new Date(
                      (weather.dt + weather.timezone) * 1000
                    ).toDateString()
                  : "Wed Dec 31 1969"}
              </Text>
              <Text size="xlarge">
                {isClient ? weather && currentTime : "04:00 PM"}
              </Text>
            </div>
            <div
              className="order-1 md:order-3 justify-self-end"
              onClick={() => {
                let localCheck;
                for (let index = 0; index < savedLocales.length; index++) {
                  const element = savedLocales[index];
                  const currentWeather = {
                    name: `${weather.name}, ${weather.sys.country}`,
                    coord: {
                      lat: weather.coord.lat,
                      lon: weather.coord.lon,
                    },
                  };
                  if (
                    JSON.stringify(element) == JSON.stringify(currentWeather)
                  ) {
                    localCheck = true;
                    break;
                  }
                }
                if (!localCheck) {
                  savedLocales.push({
                    name: `${weather.name}, ${weather.sys.country}`,
                    coord: {
                      lat: weather.coord.lat,
                      lon: weather.coord.lon,
                    },
                  });
                  localStorage.setItem(
                    "saved-locations",
                    JSON.stringify(savedLocales)
                  );
                  setIsSaved(true)
                } else {
                  setIsSaved(false)
                }
                setStorageDependancy(!storageDependancy);
              }}
            >
              <a>
                <img
                  className="h-16 w-16"
                  src="/assets/unfavStar.png"
                  alt="???"
                />
              </a>
            </div>
          </div>
          <Container roundedCorners className="p-3 text-center flex flex-col">
            <div className="flex justify-center">
              <img
                className="h-16 w-16"
                src={isClient ? currentIcon(iconDay2) : "/assets/unknown.png"}
                alt="???"
              />
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">
                {isClient ? currentDay(new Date(dtDay2).getDay()) : "Wed."}
              </Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">
                {isClient ? Math.round(tempDay2) : "0"}°
              </Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{isClient ? humDay2 : "0"}%</Text>
            </div>
          </Container>
          <Container roundedCorners className="p-3 text-center flex flex-col">
            <div className="flex justify-center">
              <img
                className="h-16 w-16"
                src={isClient ? currentIcon(iconDay3) : "/assets/unknown.png"}
                alt="???"
              />
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">
                {isClient ? currentDay(new Date(dtDay3).getDay()) : "Wed."}
              </Text>{" "}
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">
                {isClient ? Math.round(tempDay3) : "0"}°
              </Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{isClient ? humDay3 : "0"}%</Text>
            </div>
          </Container>
          <Container roundedCorners className="p-3 text-center flex flex-col">
            <div className="flex justify-center">
              <img
                className="h-16 w-16"
                src={isClient ? currentIcon(iconDay4) : "/assets/unknown.png"}
                alt="???"
              />
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">
                {isClient ? currentDay(new Date(dtDay4).getDay()) : "Wed."}
              </Text>{" "}
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">
                {isClient ? Math.round(tempDay4) : "0"}°
              </Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{isClient ? humDay4 : "0"}%</Text>
            </div>
          </Container>
          <Container roundedCorners className="p-3 text-center flex flex-col">
            <div className="flex justify-center">
              <img
                className="h-16 w-16"
                src={isClient ? currentIcon(iconDay5) : "/assets/unknown.png"}
                alt="???"
              />
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">
                {isClient ? currentDay(new Date(dtDay5).getDay()) : "Wed."}
              </Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">
                {isClient ? Math.round(tempDay5) : "0"}°
              </Text>
            </div>
            <div className="flex justify-center">
              <Text size="xlarge">{isClient ? humDay5 : "0"}%</Text>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default HomePageComponent;
