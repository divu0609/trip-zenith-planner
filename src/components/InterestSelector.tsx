
import React from "react";
import { Interest } from "@/data/interests";
import { motion } from "framer-motion";

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
        {interests.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id);
          return (
            <motion.button
              key={interest.id}
              onClick={() => onInterestToggle(interest.id)}
              className={`
                interest-chip px-4 py-2 rounded-full text-sm font-medium flex items-center
                transition-all duration-300 ease-in-out
                ${
                  isSelected
                    ? "bg-travel-coral text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isSelected ? [1, 1.1, 1] : 1,
                transition: { duration: 0.3 }
              }}
            >
              <span className="mr-2 text-lg">{interest.icon}</span>
              {interest.name}
              {isSelected && (
                <span className="ml-2 bg-white bg-opacity-20 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  ✓
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
      {selectedInterests.length > 0 && (
        <p className="mt-3 text-sm text-gray-600">
          {selectedInterests.length} interest{selectedInterests.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
};

export default InterestSelector;
