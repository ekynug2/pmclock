import React, { useState, useEffect } from 'react';  
import './index.css';
import { WeatherData, BackgroundImage } from './types';  
import { fetchRandomBackground } from './services/unsplash';  
import { fetchWeather } from './services/weather';  
import { capitalizeWords } from './utils/stringUtils';
  
function App() {  
    const [backgroundImage, setBackgroundImage] = useState<BackgroundImage | null>(null);  
    const [weather, setWeather] = useState<WeatherData | null>(null);  
    const [currentTime, setCurrentTime] = useState<string>('');  
  
    useEffect(() => {  
        const initializeWidget = async () => {  
            const background = await fetchRandomBackground();  
            setBackgroundImage(background);  
  
            const weatherData = await fetchWeather();  
            setWeather(weatherData);  
        };  
  
        initializeWidget();  
    }, []);  
  
    useEffect(() => {  
        const updateTime = () => {  
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));  
        };  
  
        updateTime();  
        const intervalId = setInterval(updateTime, 1000);  
        return () => clearInterval(intervalId);  
    }, []);  
  
    return (  
        <div className="min-h-screen relative bg-gray-900 text-white">  
            {backgroundImage && (  
                <div  
                    className="absolute inset-0 bg-cover bg-center opacity-50"  
                    style={{ backgroundImage: `url(${backgroundImage.url})` }} />  
            )}  
            <div className="relative z-10 flex flex-col justify-center items-center h-screen">  
                <div className="text-6xl font-bold tracking-wider">  
                    {currentTime}
                </div>  
                {weather && (  
                    <div className="text-2xl mt-4 bg-black/30 p-4 rounded-lg flex flex-col items-center">  
                        <span>{weather.temperature}°C | {capitalizeWords(weather.condition)}</span> {/* Capitalize weather condition */}  
                        <span className="mt-2 text-lg">{weather.location}</span> {/* Display location name below */}  
                    </div>  
                )}  
            </div>  
        </div>  
    );  
}  
  
export default App;  
