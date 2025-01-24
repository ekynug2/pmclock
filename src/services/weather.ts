import axios from 'axios';  
import { WeatherData } from '../types';  
  
export const getCurrentLocation = async (): Promise<{lat: number, lon: number}> => {  
  try {  
    const response = await axios.get('https://ipapi.co/json/');  
    return {  
      lat: response.data.latitude,  
      lon: response.data.longitude  
    };  
  } catch (error) {  
    console.error('Failed to get location:', error);  
    // Fallback to default location (New York)  
    return { lat: 40.7128, lon: -74.0060 };  
  }  
};  
  
export const fetchWeather = async (): Promise<WeatherData | null> => {  
  try {  
    const { lat, lon } = await getCurrentLocation();  
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;  
  
    // Add lang=id to request weather in Bahasa Indonesia  
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`);  
  
    return {  
      temperature: Math.round(response.data.main.temp), // Round the temperature  
      condition: response.data.weather[0].description, // Weather condition in Bahasa  
      location: response.data.name // Get the location name from the response  
    };  
  } catch (error) {  
    console.error('Failed to fetch weather:', error);  
    return null;  
  }  
};  
