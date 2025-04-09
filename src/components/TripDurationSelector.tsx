
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TripDurationSelectorProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

const TripDurationSelector: React.FC<TripDurationSelectorProps> = ({
  duration,
  onDurationChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 14) {
      onDurationChange(value);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Trip Duration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="trip-duration">Number of Days (1-14)</Label>
          <Input
            id="trip-duration"
            type="number"
            min="1"
            max="14"
            value={duration}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center md:justify-start">
          <div className="bg-gray-100 px-6 py-3 rounded-lg">
            <span className="text-travel-blue font-bold text-4xl">
              {duration}
            </span>
            <span className="text-gray-700 ml-2">
              {duration === 1 ? "Day" : "Days"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDurationSelector;
