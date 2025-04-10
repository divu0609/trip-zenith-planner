
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TravelCosts, formatCostRange, formatCurrency } from "@/utils/costEstimator";
import { Building, UtensilsCrossed, MapPin, Car, DollarSign } from "lucide-react";

interface CostBreakdownProps {
  costs: TravelCosts;
  duration: number;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ costs, duration }) => {
  return (
    <Card className="w-full mb-6">
      <CardHeader className="bg-travel-blue text-white">
        <CardTitle className="text-xl flex items-center">
          <DollarSign className="mr-2" size={20} />
          Estimated Trip Cost
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-700">
              <Building className="mr-2" size={18} />
              <span>Accommodation ({duration} nights)</span>
            </div>
            <span className="font-medium">{formatCostRange(costs.accommodation)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-700">
              <UtensilsCrossed className="mr-2" size={18} />
              <span>Food & Drink</span>
            </div>
            <span className="font-medium">{formatCostRange(costs.food)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-700">
              <MapPin className="mr-2" size={18} />
              <span>Activities & Attractions</span>
            </div>
            <span className="font-medium">{formatCostRange(costs.activities)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-700">
              <Car className="mr-2" size={18} />
              <span>Local Transportation</span>
            </div>
            <span className="font-medium">{formatCostRange(costs.transportation)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Estimated Cost</span>
            <span className="text-travel-blue">{formatCostRange(costs.total)}</span>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            * This is an estimated cost range based on typical travel expenses. Actual costs may vary based on accommodations, 
            activities, and your personal travel style. International flights are not included in this estimate.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;
