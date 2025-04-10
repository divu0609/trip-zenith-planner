
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Attraction, AttractionDetail, getAttractionsByRadius, getAttractionDetails } from "@/services/attractionsService";
import { toast } from "sonner";
import { MapPin, Info, ExternalLink, Loader2, Clock, Tag } from "lucide-react";

interface AttractionsDisplayProps {
  destinationName: string;
  lat?: number;
  lon?: number;
}

const AttractionsDisplay: React.FC<AttractionsDisplayProps> = ({ 
  destinationName,
  lat = 27.1751,  // Default to Taj Mahal's coordinates
  lon = 78.0422
}) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<AttractionDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    fetchAttractions();
  }, [destinationName, lat, lon]);

  const fetchAttractions = async () => {
    setLoading(true);
    try {
      const data = await getAttractionsByRadius(lat, lon);
      setAttractions(data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
      toast.error("Failed to load attractions", {
        description: "Please try again later"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAttraction = async (attraction: Attraction) => {
    setDetailLoading(true);
    try {
      const details = await getAttractionDetails(attraction.id);
      setSelectedAttraction(details);
    } catch (error) {
      console.error("Error fetching attraction details:", error);
      toast.error("Failed to load attraction details", {
        description: "Please try again later"
      });
    } finally {
      setDetailLoading(false);
    }
  };

  const getKindsBadges = (kinds: string) => {
    if (!kinds) return null;
    
    return kinds.split(',').slice(0, 3).map((kind, index) => (
      <Badge key={index} variant="outline" className="mr-1 mb-1">
        <Tag size={12} className="mr-1" />
        {kind.replace('_', ' ')}
      </Badge>
    ));
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="bg-travel-teal text-white">
        <CardTitle className="text-xl flex items-center">
          <MapPin className="mr-2" size={20} />
          Top Attractions in {destinationName}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-travel-blue" />
            <span className="ml-2 text-gray-600">Loading attractions...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {attractions.map((attraction) => (
              <div 
                key={attraction.id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSelectAttraction(attraction)}
              >
                <h3 className="font-bold">{attraction.name}</h3>
                {attraction.kinds && (
                  <div className="flex flex-wrap mt-2">
                    {getKindsBadges(attraction.kinds)}
                  </div>
                )}
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <MapPin size={14} className="mr-1" />
                  <span>
                    {attraction.dist 
                      ? `${(attraction.dist / 1000).toFixed(1)} km away` 
                      : "View on map"
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedAttraction && (
          <>
            <Separator className="my-4" />
            
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">{selectedAttraction.name}</h2>
              
              {detailLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-travel-blue" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    {selectedAttraction.image ? (
                      <img 
                        src={selectedAttraction.image} 
                        alt={selectedAttraction.name} 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                        <Info size={32} className="text-gray-400" />
                      </div>
                    )}
                    
                    <div className="mt-3">
                      {selectedAttraction.kinds && (
                        <div className="flex flex-wrap mt-2">
                          {getKindsBadges(selectedAttraction.kinds)}
                        </div>
                      )}
                      
                      {selectedAttraction.address && (
                        <div className="text-sm text-gray-600 mt-2">
                          <div className="font-semibold">Address:</div>
                          <div>
                            {selectedAttraction.address.road && `${selectedAttraction.address.road}, `}
                            {selectedAttraction.address.city && `${selectedAttraction.address.city}, `}
                            {selectedAttraction.address.state && `${selectedAttraction.address.state}, `}
                            {selectedAttraction.address.country}
                            {selectedAttraction.address.postcode && ` ${selectedAttraction.address.postcode}`}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    {selectedAttraction.wikipedia_extracts && (
                      <div className="text-gray-700">
                        {selectedAttraction.wikipedia_extracts.text}
                      </div>
                    )}
                    
                    {selectedAttraction.description && !selectedAttraction.wikipedia_extracts && (
                      <div className="text-gray-700">
                        {selectedAttraction.description}
                      </div>
                    )}
                    
                    <div className="mt-4 flex">
                      {selectedAttraction.url && (
                        <Button 
                          variant="outline"
                          size="sm"
                          className="text-travel-blue border-travel-blue mr-2"
                          onClick={() => window.open(selectedAttraction.url, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Visit Website
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        className="text-travel-blue border-travel-blue"
                        onClick={() => window.open(`https://www.google.com/maps?q=${selectedAttraction.point.lat},${selectedAttraction.point.lon}`, '_blank')}
                      >
                        <MapPin size={14} className="mr-1" />
                        View on Map
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AttractionsDisplay;
