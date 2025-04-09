
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Itinerary, ItineraryDay } from "@/data/itineraries";
import { toast } from "sonner";

interface ItineraryDisplayProps {
  itinerary: Itinerary | null;
  destinationName: string;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  itinerary,
  destinationName,
}) => {
  const [activeDay, setActiveDay] = useState("1");

  if (!itinerary) {
    return null;
  }

  const handleSaveItinerary = () => {
    toast.success("Itinerary saved successfully!", {
      description: "You can find it in your saved trips.",
    });
  };
  
  const handleShareItinerary = () => {
    toast.success("Share link copied to clipboard!", {
      description: "Now you can share your itinerary with friends.",
    });
  };

  const renderDay = (day: ItineraryDay) => {
    return (
      <div className="space-y-6 py-2">
        {day.activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg overflow-hidden shadow">
            <div className="flex flex-col md:flex-row">
              {activity.imageUrl && (
                <div className="md:w-1/3">
                  <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}
              <div className={`p-4 md:p-6 ${activity.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{activity.title}</h3>
                    <p className="text-gray-500 text-sm">{activity.location}</p>
                  </div>
                  <span className="bg-travel-teal text-white text-xs px-2 py-1 rounded">
                    {activity.time}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{activity.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full mt-8">
      <CardHeader className="bg-travel-navy text-white">
        <CardTitle className="text-2xl">
          Your {itinerary.days.length}-Day Itinerary for {destinationName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-700">
            Created on {new Date().toLocaleDateString()}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              className="text-travel-blue border-travel-blue hover:bg-travel-blue hover:text-white"
              onClick={handleSaveItinerary}
            >
              Save
            </Button>
            <Button
              className="bg-travel-blue hover:bg-travel-teal"
              onClick={handleShareItinerary}
            >
              Share
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <Tabs defaultValue="1" onValueChange={setActiveDay}>
          <TabsList className="mb-4 flex overflow-x-auto pb-2">
            {itinerary.days.map((day) => (
              <TabsTrigger key={day.dayNumber} value={day.dayNumber.toString()}>
                Day {day.dayNumber}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {itinerary.days.map((day) => (
            <TabsContent key={day.dayNumber} value={day.dayNumber.toString()}>
              {renderDay(day)}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ItineraryDisplay;
