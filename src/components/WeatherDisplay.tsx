
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentWeather, getWeatherForecast, WeatherData, WeatherForecast } from "@/services/weatherService";
import { toast } from "sonner";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Clock, Calendar, Loader2, CloudSun } from "lucide-react";

interface WeatherDisplayProps {
  destinationName: string;
  country?: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ 
  destinationName,
  country
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, [destinationName, country]);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const currentWeather = await getCurrentWeather(destinationName, country);
      const forecastData = await getWeatherForecast(destinationName, country);
      
      setWeather(currentWeather);
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Failed to load weather information", {
        description: "Please try again later"
      });
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (icon: string) => {
    // Map OpenWeatherMap icons to Lucide icons
    if (icon.includes('01')) return <Sun className="h-8 w-8 text-yellow-500" />;
    if (icon.includes('02') || icon.includes('03')) return <CloudSun className="h-8 w-8 text-gray-500" />;
    if (icon.includes('04')) return <Cloud className="h-8 w-8 text-gray-500" />;
    if (icon.includes('09') || icon.includes('10')) return <CloudRain className="h-8 w-8 text-blue-500" />;
    if (icon.includes('11')) return <CloudRain className="h-8 w-8 text-purple-500" />;
    if (icon.includes('13')) return <Cloud className="h-8 w-8 text-blue-200" />;
    if (icon.includes('50')) return <Cloud className="h-8 w-8 text-gray-400" />;
    return <Sun className="h-8 w-8 text-yellow-500" />;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getDayOfWeek = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="bg-sky-500 text-white">
        <CardTitle className="text-xl flex items-center">
          <CloudSun className="mr-2" size={20} />
          Weather in {destinationName}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-travel-blue" />
            <span className="ml-2 text-gray-600">Loading weather data...</span>
          </div>
        ) : (
          <>
            {weather && (
              <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center">
                    {getWeatherIcon(weather.icon)}
                    <div className="ml-4">
                      <h2 className="text-2xl font-bold">{Math.round(weather.temperature)}°C</h2>
                      <p className="text-gray-600 capitalize">{weather.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-sm text-gray-600">
                      <Calendar size={14} className="inline mr-1" />
                      {formatDate(weather.date)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <Clock size={14} className="inline mr-1" />
                      Feels like {Math.round(weather.feelsLike)}°C
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center text-gray-600">
                      <Wind size={16} className="mr-2" />
                      <span>Wind</span>
                    </div>
                    <div className="text-lg font-medium mt-1">
                      {weather.windSpeed} m/s
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center text-gray-600">
                      <Droplets size={16} className="mr-2" />
                      <span>Humidity</span>
                    </div>
                    <div className="text-lg font-medium mt-1">
                      {weather.humidity}%
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center text-gray-600">
                      <Sun size={16} className="mr-2" />
                      <span>Sunrise</span>
                    </div>
                    <div className="text-lg font-medium mt-1">
                      {new Date(weather.sunrise * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center text-gray-600">
                      <CloudSun size={16} className="mr-2" />
                      <span>Sunset</span>
                    </div>
                    <div className="text-lg font-medium mt-1">
                      {new Date(weather.sunset * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {forecast.length > 0 && (
              <>
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">5-Day Forecast</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {forecast.map((day, index) => (
                      <div key={index} className="border rounded-md p-3 text-center">
                        <div className="font-medium">{getDayOfWeek(day.date)}</div>
                        <div className="flex justify-center my-2">
                          {getWeatherIcon(day.icon)}
                        </div>
                        <div className="text-sm capitalize">{day.description}</div>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>{Math.round(day.nightTemp)}°</span>
                          <span className="font-medium">{Math.round(day.dayTemp)}°</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
        
        <p className="text-xs text-gray-500 mt-6">
          * Weather data is based on current forecasts and may change. Please check again closer to your travel date.
        </p>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
