
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Destination } from "@/data/destinations";
import InterestSelector from "./InterestSelector";
import TripDurationSelector from "./TripDurationSelector";
import { Interest } from "@/data/interests";

interface SearchFormProps {
  destinations: Destination[];
  interests: Interest[];
  selectedDestination: Destination | null;
  onSearch: (destinationId: string, interestIds: string[], duration: number) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  destinations,
  interests,
  selectedDestination,
  onSearch,
}) => {
  const [destinationQuery, setDestinationQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [duration, setDuration] = useState(3);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [showDestinations, setShowDestinations] = useState(false);

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setDestinationQuery(query);
    setShowDestinations(query.length > 0);
    
    if (query.length > 0) {
      const filtered = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(query.toLowerCase()) ||
        destination.country.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations([]);
    }
  };

  const handleDestinationSelect = (destination: Destination) => {
    setDestinationQuery(`${destination.name}, ${destination.country}`);
    setShowDestinations(false);
  };

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDestination) return;
    
    onSearch(selectedDestination.id, selectedInterests, duration);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <div className="relative">
          <Input
            id="destination"
            placeholder="Search for a city or country"
            value={destinationQuery}
            onChange={handleDestinationChange}
            className="w-full"
            disabled={selectedDestination !== null}
          />
          
          {showDestinations && filteredDestinations.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDestinationSelect(destination)}
                >
                  {destination.name}, {destination.country}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <InterestSelector
        interests={interests}
        selectedInterests={selectedInterests}
        onInterestToggle={handleInterestToggle}
      />

      <TripDurationSelector
        duration={duration}
        onDurationChange={handleDurationChange}
      />

      <Button 
        type="submit" 
        className="w-full bg-travel-blue hover:bg-travel-teal"
        disabled={!selectedDestination}
      >
        Create My Itinerary
      </Button>
    </form>
  );
};

export default SearchForm;
