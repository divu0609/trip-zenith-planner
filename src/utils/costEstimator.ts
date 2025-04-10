
// Interfaces for our cost structures
export interface TravelCosts {
  accommodation: CostRange;
  food: CostRange;
  activities: CostRange;
  transportation: CostRange;
  total: CostRange;
}

export interface CostRange {
  min: number;
  max: number;
}

// Base costs per destination tier (USD per day)
const baseCosts = {
  budget: {
    accommodation: { min: 20, max: 50 },
    food: { min: 15, max: 30 },
    activities: { min: 10, max: 30 },
    transportation: { min: 5, max: 15 }
  },
  mid: {
    accommodation: { min: 80, max: 150 },
    food: { min: 30, max: 60 },
    activities: { min: 20, max: 50 },
    transportation: { min: 15, max: 40 }
  },
  luxury: {
    accommodation: { min: 200, max: 500 },
    food: { min: 80, max: 150 },
    activities: { min: 50, max: 150 },
    transportation: { min: 40, max: 100 }
  }
};

// Destination cost multipliers (based on cost of living)
const destinationMultipliers: Record<string, number> = {
  "1": 1.2,  // Bali
  "2": 1.5,  // Paris
  "3": 1.8,  // Tokyo
  "4": 1.6,  // New York
  "5": 1.3,  // Rome
  "6": 1.1,  // Bangkok
  "7": 1.0,  // Mexico City
  "8": 1.4,  // London
  "9": 1.7,  // Dubai
  "10": 1.4, // Sydney
  // Default multiplier for destinations not in the list
  "default": 1.2
};

// Interest activity cost adjustments
const interestCostAdjustments: Record<string, number> = {
  "1": 1.1,  // Beaches
  "2": 1.2,  // Mountains
  "3": 1.1,  // History
  "4": 1.3,  // Food
  "5": 1.2,  // Art
  "6": 1.4,  // Nightlife
  "7": 1.5,  // Adventure
  "8": 1.3,  // Shopping
  "9": 1.4,  // Wildlife
  "10": 1.2, // Relaxation
  "11": 1.1, // Photography
  "12": 1.1  // Local Culture
};

/**
 * Calculate estimated costs for a trip
 * @param destinationId ID of the destination
 * @param interestIds Array of interest IDs
 * @param duration Trip duration in days
 * @param tier Budget tier (budget, mid, luxury)
 * @returns Cost estimates
 */
export const calculateTripCosts = (
  destinationId: string,
  interestIds: string[] = [],
  duration: number = 3,
  tier: 'budget' | 'mid' | 'luxury' = 'mid'
): TravelCosts => {
  // Get base costs for the selected tier
  const baseTierCosts = baseCosts[tier];
  
  // Get destination multiplier
  const destinationMultiplier = destinationMultipliers[destinationId] || destinationMultipliers.default;
  
  // Calculate interest adjustment factor
  let interestAdjustment = 1.0;
  if (interestIds.length > 0) {
    const sum = interestIds.reduce((acc, id) => acc + (interestCostAdjustments[id] || 1.0), 0);
    interestAdjustment = sum / interestIds.length;
  }
  
  // Calculate costs for each category
  const accommodation = adjustCost(baseTierCosts.accommodation, destinationMultiplier, 1.0);
  const food = adjustCost(baseTierCosts.food, destinationMultiplier, 1.0);
  const activities = adjustCost(baseTierCosts.activities, destinationMultiplier, interestAdjustment);
  const transportation = adjustCost(baseTierCosts.transportation, destinationMultiplier, 1.0);
  
  // Calculate total costs
  const total = {
    min: (accommodation.min + food.min + activities.min + transportation.min) * duration,
    max: (accommodation.max + food.max + activities.max + transportation.max) * duration
  };
  
  return {
    accommodation: {
      min: accommodation.min * duration,
      max: accommodation.max * duration
    },
    food: {
      min: food.min * duration,
      max: food.max * duration
    },
    activities: {
      min: activities.min * duration,
      max: activities.max * duration
    },
    transportation: {
      min: transportation.min * duration,
      max: transportation.max * duration
    },
    total
  };
};

// Helper function to adjust costs based on multipliers
function adjustCost(baseCost: CostRange, destinationMultiplier: number, interestMultiplier: number): CostRange {
  return {
    min: Math.round(baseCost.min * destinationMultiplier * interestMultiplier),
    max: Math.round(baseCost.max * destinationMultiplier * interestMultiplier)
  };
}

// Format cost as currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

// Format a cost range
export const formatCostRange = (range: CostRange): string => {
  return `${formatCurrency(range.min)} - ${formatCurrency(range.max)}`;
};
