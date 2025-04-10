
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data structure similar to what would come from Eventbrite/Ticketmaster APIs
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  imageUrl: string;
  price: string;
  category: string;
  ticketUrl: string;
  source: "eventbrite" | "ticketmaster";
}

const mockEvents: Event[] = [
  {
    id: "ev1",
    title: "Local Food Festival",
    date: "2025-05-15",
    time: "12:00 PM - 8:00 PM",
    venue: "Central Park",
    description: "Experience the best local cuisine with over 50 food vendors, live music, and activities for the whole family.",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZCUyMGZlc3RpdmFsfGVufDB8fDB8fHww",
    price: "$10-25",
    category: "Food & Drink",
    ticketUrl: "https://example.com/tickets/1",
    source: "eventbrite"
  },
  {
    id: "ev2",
    title: "Summer Concert Series",
    date: "2025-06-20",
    time: "7:00 PM - 11:00 PM",
    venue: "Riverside Amphitheater",
    description: "An evening of live music featuring local bands and headlining artists. Bring your blankets and enjoy the summer night.",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
    price: "$30-75",
    category: "Music",
    ticketUrl: "https://example.com/tickets/2",
    source: "ticketmaster"
  },
  {
    id: "ev3",
    title: "Tech Innovation Conference",
    date: "2025-07-10",
    time: "9:00 AM - 6:00 PM",
    venue: "Downtown Convention Center",
    description: "Join industry leaders and innovators for a day of panels, workshops, and networking opportunities in the tech space.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    price: "$150-200",
    category: "Business",
    ticketUrl: "https://example.com/tickets/3",
    source: "eventbrite"
  },
  {
    id: "ev4",
    title: "Art Exhibition Opening",
    date: "2025-05-22",
    time: "6:00 PM - 9:00 PM",
    venue: "Modern Art Gallery",
    description: "Celebrate the opening of a new exhibition featuring works from emerging local artists. Wine and hors d'oeuvres will be served.",
    imageUrl: "https://images.unsplash.com/photo-1594876079928-9ef59416ffcf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFydCUyMGV4aGliaXRpb258ZW58MHx8MHx8fDA%3D",
    price: "Free entry",
    category: "Arts",
    ticketUrl: "https://example.com/tickets/4",
    source: "ticketmaster"
  }
];

interface LocalEventsProps {
  destinationName: string;
}

const LocalEvents: React.FC<LocalEventsProps> = ({ destinationName }) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredEvents = activeTab === "all" 
    ? mockEvents 
    : mockEvents.filter(event => event.source === activeTab);

  const handleBookTicket = (event: Event) => {
    window.open(event.ticketUrl, "_blank");
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="w-full mt-8">
      <CardHeader className="bg-travel-coral text-white">
        <CardTitle className="text-2xl">
          Local Events in {destinationName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="eventbrite">Eventbrite</TabsTrigger>
            <TabsTrigger value="ticketmaster">Ticketmaster</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-6 md:w-2/3">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-bold text-lg">{event.title}</h3>
                            <Badge className="ml-2 bg-gray-200 text-gray-800">
                              {event.category}
                            </Badge>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin size={14} className="mr-1" />
                            <p>{event.venue}</p>
                          </div>
                        </div>
                        <Badge 
                          className={`mt-2 md:mt-0 ${
                            event.source === "eventbrite" 
                            ? "bg-travel-teal" 
                            : "bg-travel-coral"
                          } text-white`}
                        >
                          {event.source === "eventbrite" ? "Eventbrite" : "Ticketmaster"}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mt-3">{event.description}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={14} className="mr-1" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-1" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm font-medium text-travel-navy">
                          <Ticket size={14} className="mr-1" />
                          <span>{event.price}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          onClick={() => handleBookTicket(event)}
                          className="bg-travel-navy hover:bg-travel-blue text-white"
                        >
                          <Ticket size={14} className="mr-1" />
                          Book Tickets
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No events found in this category.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocalEvents;
