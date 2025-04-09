
import React from "react";
import { Interest } from "@/data/interests";

interface InterestSelectorProps {
  interests: Interest[];
  selectedInterests: string[];
  onInterestToggle: (interestId: string) => void;
}

const InterestSelector: React.FC<InterestSelectorProps> = ({
  interests,
  selectedInterests,
  onInterestToggle,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Select Your Interests</h3>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <button
            key={interest.id}
            onClick={() => onInterestToggle(interest.id)}
            className={`
              interest-chip px-4 py-2 rounded-full text-sm font-medium flex items-center
              ${
                selectedInterests.includes(interest.id)
                  ? "bg-travel-coral text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            <span className="mr-2">{interest.icon}</span>
            {interest.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;
