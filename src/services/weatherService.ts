
import { toast } from "sonner";

// OpenWeatherMap API configuration
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  date: number;
}

export interface WeatherForecast {
  date: number;
  dayTemp: number;
  nightTemp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

/**
 * Fetch current weather for a location
 * @param city City name
 * @param country Country code (optional)
 * @returns Weather data for the location
 */
export const getCurrentWeather = async (
  city: string,
  country?: string
): Promise<WeatherData | null> => {
  try {
    // For demo purposes, we'll use mockWeather if no API key is provided
    if (API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
      console.log("Using mock weather data (no API key provided)");
      const mockData = { ...mockWeather };
      mockData.location = city;
      if (country) mockData.country = country;
      return mockData;
    }

    let query = city;
    if (country) query += `,${country}`;

    const response = await fetch(
      `${BASE_URL}/weather?q=${query}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      location: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      date: data.dt
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast.error("Failed to load weather information", {
      description: "Please try again later",
    });
    
    // Return mock data on error
    const mockData = { ...mockWeather };
    mockData.location = city;
    if (country) mockData.country = country;
    return mockData;
  }
};

/**
 * Fetch 5-day weather forecast for a location
 * @param city City name
 * @param country Country code (optional)
 * @returns Array of forecast data
 */
export const getWeatherForecast = async (
  city: string,
  country?: string
): Promise<WeatherForecast[]> => {
  try {
    // For demo purposes, we'll use mockForecast if no API key is provided
    if (API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
      console.log("Using mock forecast data (no API key provided)");
      return mockForecast;
    }

    let query = city;
    if (country) query += `,${country}`;

    const response = await fetch(
      `${BASE_URL}/forecast?q=${query}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Process 5-day forecast (OpenWeatherMap returns data in 3-hour intervals)
    const dailyForecasts: WeatherForecast[] = [];
    const dailyData: { [key: string]: any } = {};

    // Group by day
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0];
      
      if (!dailyData[day]) {
        dailyData[day] = {
          dayTemps: [],
          nightTemps: [],
          descriptions: [],
          icons: [],
          humidities: [],
          windSpeeds: [],
          date: item.dt
        };
      }
      
      const hour = date.getHours();
      
      // Consider daytime (6 AM to 6 PM)
      if (hour >= 6 && hour < 18) {
        dailyData[day].dayTemps.push(item.main.temp);
      } else {
        dailyData[day].nightTemps.push(item.main.temp);
      }
      
      dailyData[day].descriptions.push(item.weather[0].description);
      dailyData[day].icons.push(item.weather[0].icon);
      dailyData[day].humidities.push(item.main.humidity);
      dailyData[day].windSpeeds.push(item.wind.speed);
    });
    
    // Calculate average values for each day
    Object.keys(dailyData).forEach(day => {
      const data = dailyData[day];
      
      dailyForecasts.push({
        date: data.date,
        dayTemp: calculateAverage(data.dayTemps),
        nightTemp: calculateAverage(data.nightTemps),
        description: getMostFrequent(data.descriptions),
        icon: getMostFrequent(data.icons),
        humidity: calculateAverage(data.humidities),
        windSpeed: calculateAverage(data.windSpeeds)
      });
    });
    
    return dailyForecasts.slice(0, 5); // Return only the first 5 days
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    toast.error("Failed to load weather forecast", {
      description: "Please try again later",
    });
    return mockForecast; // Return mock data on error
  }
};

// Helper functions
const calculateAverage = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
};

const getMostFrequent = (arr: string[]): string => {
  if (arr.length === 0) return "";
  
  const frequency: { [key: string]: number } = {};
  let maxFreq = 0;
  let mostFrequent = arr[0];
  
  arr.forEach(item => {
    frequency[item] = (frequency[item] || 0) + 1;
    if (frequency[item] > maxFreq) {
      maxFreq = frequency[item];
      mostFrequent = item;
    }
  });
  
  return mostFrequent;
};

// Mock weather data for testing or when API key is not available
const mockWeather: WeatherData = {
  location: "Mumbai",
  country: "IN",
  temperature: 32,
  feelsLike: 34,
  description: "partly cloudy",
  icon: "02d",
  humidity: 65,
  windSpeed: 3.5,
  pressure: 1012,
  sunrise: 1617760523,
  sunset: 1617806567,
  date: 1617783600
};

// Mock forecast data
const mockForecast: WeatherForecast[] = [
  {
    date: 1617783600,
    dayTemp: 32,
    nightTemp: 26,
    description: "partly cloudy",
    icon: "02d",
    humidity: 65,
    windSpeed: 3.5
  },
  {
    date: 1617870000,
    dayTemp: 33,
    nightTemp: 27,
    description: "light rain",
    icon: "10d",
    humidity: 70,
    windSpeed: 4.2
  },
  {
    date: 1617956400,
    dayTemp: 31,
    nightTemp: 25,
    description: "clear sky",
    icon: "01d",
    humidity: 62,
    windSpeed: 2.8
  },
  {
    date: 1618042800,
    dayTemp: 32,
    nightTemp: 26,
    description: "scattered clouds",
    icon: "03d",
    humidity: 64,
    windSpeed: 3.0
  },
  {
    date: 1618129200,
    dayTemp: 33,
    nightTemp: 27,
    description: "moderate rain",
    icon: "10d",
    humidity: 72,
    windSpeed: 4.5
  }
];
