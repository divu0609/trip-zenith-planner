
import React from "react";
import { Destination } from "@/data/destinations";
import { Interest } from "@/data/interests";
import DestinationCard from "@/components/DestinationCard";
import { Badge } from "@/components/ui/badge";

interface DestinationRecommenderProps {
  destinations: Destination[];
  interests: string[];
  onSelectDestination: (destination: Destination) => void;
}

const DestinationRecommender: React.FC<DestinationRecommenderProps> = ({
  destinations,
  interests,
  onSelectDestination,
}) => {
  // If no interests are selected, show popular destinations
  if (interests.length === 0) {
    const popularDestinations = destinations.filter((d) => d.popular);
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-center">
          Popular Destinations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularDestinations.slice(0, 6).map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onClick={onSelectDestination}
            />
          ))}
        </div>
      </div>
    );
  }

  // Calculate match score for each destination based on interests
  const recommendedDestinations = destinations
    .map((destination) => {
      // Assign a score based on how many selected interests match the destination
      const matchingInterests = interests.filter(
        (interestId) => destination.interests?.includes(interestId)
      );
      const score = matchingInterests.length;
      
      return {
        ...destination,
        score,
        matchingInterestsCount: matchingInterests.length,
      };
    })
    .filter((destination) => destination.score > 0) // Only include destinations with at least one matching interest
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, 6); // Take top 6 recommendations

  if (recommendedDestinations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          No matching destinations found for your interests. Try selecting different interests.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-center">
        Recommended Destinations Based on Your Interests
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedDestinations.map((destination) => (
          <div key={destination.id} className="relative">
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-travel-coral text-white">
                {destination.matchingInterestsCount} matching {destination.matchingInterestsCount === 1 ? 'interest' : 'interests'}
              </Badge>
            </div>
            <DestinationCard
              destination={destination}
              onClick={onSelectDestination}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationRecommender;
