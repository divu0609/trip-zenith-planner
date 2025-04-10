
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Destination } from "@/data/destinations";
import InterestSelector from "./InterestSelector";
import TripDurationSelector from "./TripDurationSelector";
import { Interest } from "@/data/interests";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Search } from "lucide-react";

interface SearchFormProps {
  destinations: Destination[];
  interests: Interest[];
  selectedDestination: Destination | null;
  onSearch: (destinationId: string, interestIds: string[], duration: number) => void;
  onInterestChange?: (interestIds: string[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  destinations,
  interests,
  selectedDestination,
  onSearch,
  onInterestChange,
}) => {
  const [destinationQuery, setDestinationQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [duration, setDuration] = useState(3);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [showDestinations, setShowDestinations] = useState(false);
  const [localSelectedDestination, setLocalSelectedDestination] = useState<Destination | null>(selectedDestination);
  const [isSearching, setIsSearching] = useState(false);

  const form = useForm();

  // Update local state when prop changes
  useEffect(() => {
    if (selectedDestination) {
      setLocalSelectedDestination(selectedDestination);
      setDestinationQuery(`${selectedDestination.name}, ${selectedDestination.country}`);
    }
  }, [selectedDestination]);

  // Notify parent component about interest changes
  useEffect(() => {
    if (onInterestChange) {
      onInterestChange(selectedInterests);
    }
  }, [selectedInterests, onInterestChange]);

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
    setLocalSelectedDestination(destination);
    setShowDestinations(false);
  };

  const handleInterestToggle = (interestId: string) => {
    const updatedInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter((id) => id !== interestId)
      : [...selectedInterests, interestId];
    
    setSelectedInterests(updatedInterests);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localSelectedDestination) {
      toast.error("Please select a destination", {
        description: "Enter a city, state or country to continue",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with a slight delay
    setTimeout(() => {
      onSearch(localSelectedDestination.id, selectedInterests, duration);
      setIsSearching(false);
    }, 1500);
  };

  const clearDestination = () => {
    setLocalSelectedDestination(null);
    setDestinationQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <div className="relative">
          <div className="relative">
            <Input
              id="destination"
              placeholder="Search for a city, state or country"
              value={destinationQuery}
              onChange={handleDestinationChange}
              className="w-full pl-10"
              disabled={selectedDestination !== null && !localSelectedDestination}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          
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
        disabled={!localSelectedDestination || isSearching}
      >
        {isSearching ? "Creating Your Itinerary..." : "Create My Itinerary"}
      </Button>

      {localSelectedDestination && (
        <div className="text-center">
          <Button
            type="button"
            variant="link"
            className="text-travel-coral"
            onClick={clearDestination}
          >
            Change Destination
          </Button>
        </div>
      )}
    </form>
  );
};

export default SearchForm;
