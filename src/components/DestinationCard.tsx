
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Destination } from "@/data/destinations";

interface DestinationCardProps {
  destination: Destination;
  onClick: (destination: Destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onClick,
}) => {
  return (
    <Card className="overflow-hidden h-full destination-card">
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        {destination.popular && (
          <div className="absolute top-0 right-0 bg-travel-coral text-white text-xs px-3 py-1 rounded-bl-md">
            Popular
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{destination.name}</h3>
            <p className="text-gray-500 text-sm">{destination.country}</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm mb-4">{destination.description}</p>
        <Button
          onClick={() => onClick(destination)}
          className="w-full bg-travel-blue hover:bg-travel-teal"
        >
          Plan Trip
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
