
import React from "react";
import { Interest } from "@/data/interests";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface InterestBadgeProps {
  interest: Interest;
  size?: "sm" | "md" | "lg";
}

const InterestBadge: React.FC<InterestBadgeProps> = ({ 
  interest,
  size = "md"
}) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-1 rounded",
    md: "text-sm px-3 py-1.5 rounded-md",
    lg: "text-base px-4 py-2 rounded-lg"
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "bg-travel-coral bg-opacity-10 text-travel-coral hover:bg-travel-coral hover:text-white transition-colors",
        "inline-flex items-center font-medium cursor-pointer",
        sizeClasses[size]
      )}
    >
      <span className="mr-1">{interest.icon}</span>
      <span>{interest.name}</span>
    </Badge>
  );
};

export default InterestBadge;
