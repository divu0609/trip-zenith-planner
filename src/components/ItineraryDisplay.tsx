
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Itinerary, ItineraryDay } from "@/data/itineraries";
import { toast } from "sonner";
import { Clock, Calendar, MapPin, Link as LinkIcon, Info, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ItineraryDisplayProps {
  itinerary: Itinerary | null;
  destinationName: string;
  onViewLocalEvents?: () => void;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  itinerary,
  destinationName,
  onViewLocalEvents,
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

  const handleBookNow = (activityTitle: string) => {
    toast.success(`Redirecting to booking page for ${activityTitle}`, {
      description: "You'll be redirected to the booking site in a moment.",
    });
  };

  const renderDay = (day: ItineraryDay) => {
    return (
      <div className="space-y-6 py-2">
        {day.activities.map((activity, index, array) => (
          <div key={activity.id} className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden shadow">
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
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin size={14} className="mr-1" />
                        <p>{activity.location}</p>
                      </div>
                    </div>
                    <Badge className="bg-travel-teal text-white">
                      <Clock size={14} className="mr-1" />
                      {activity.time}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mt-2">{activity.description}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-1" />
                      <span>Duration: {activity.duration || '2 hours'}</span>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                      onClick={() => handleBookNow(activity.title)}
                    >
                      <LinkIcon size={14} className="mr-1" />
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {index < array.length - 1 && (
              <div className="flex items-center justify-center py-2 px-4 bg-gray-50 rounded-md">
                <Info size={14} className="text-travel-blue mr-2" />
                <span className="text-sm text-gray-600">
                  Travel time to next activity: {getTravelTime(activity, array[index + 1])}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const getTravelTime = (fromActivity: any, toActivity: any) => {
    const minutes = Math.floor(Math.random() * 30) + 10;
    return `${minutes} minutes`;
  };

  return (
    <Card className="w-full mt-8">
      <CardHeader className="bg-travel-navy text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">
            Your {itinerary.days.length}-Day Itinerary for {destinationName}
          </CardTitle>
          <div className="text-sm flex items-center">
            <Calendar size={14} className="mr-1" />
            Created on {new Date().toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-x-2">
            <Badge className="bg-travel-blue">Daily Schedule</Badge>
            <Badge variant="outline" className="text-travel-teal border-travel-teal">
              {itinerary.days.reduce((acc, day) => acc + day.activities.length, 0)} Activities
            </Badge>
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
        
        {onViewLocalEvents && (
          <div className="mb-6 p-4 bg-travel-coral bg-opacity-10 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <Ticket className="text-travel-coral mr-2" size={20} />
              <p className="text-gray-700">
                Looking for local events during your stay in {destinationName}?
              </p>
            </div>
            <Button 
              onClick={onViewLocalEvents}
              className="bg-travel-coral hover:bg-travel-navy text-white"
              size="sm"
            >
              View Events
            </Button>
          </div>
        )}
        
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
