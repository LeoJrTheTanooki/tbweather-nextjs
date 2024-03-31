// require('dotenv').config()
import { Iweather } from "../Interfaces/Interfaces";
import { IForecast } from "../Interfaces/Interfaces";
const apiKey = process.env.NEXT_PUBLIC_API_KEY; 

export const getWeather = async (location: string = 'stockton') => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`);
  const data: Iweather = await response.json();
  return data;
};

export const getForecast = async (location: string = 'stockton') => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`);
  const data: IForecast = await response.json();
  return data;
};