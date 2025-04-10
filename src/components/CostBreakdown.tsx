
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TravelCosts, formatCostRange, formatCurrency, Currency } from "@/utils/costEstimator";
import { Building, UtensilsCrossed, MapPin, Car, DollarSign, IndianRupee, Euro, PoundSterling } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CostBreakdownProps {
  costs: TravelCosts;
  duration: number;
  currency?: Currency;
  onCurrencyChange?: (currency: Currency) => void;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ 
  costs, 
  duration, 
  currency = 'USD',
  onCurrencyChange
}) => {
  const getCurrencyIcon = () => {
    switch (currency) {
      case 'INR':
        return <IndianRupee className="mr-2" size={20} />;
      case 'EUR':
        return <Euro className="mr-2" size={20} />;
      case 'GBP':
        return <PoundSterling className="mr-2" size={20} />;
      case 'USD':
      default:
        return <DollarSign className="mr-2" size={20} />;
    }
  };

  const handleCurrencyChange = (value: string) => {
    if (onCurrencyChange) {
      onCurrencyChange(value as Currency);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader className="bg-travel-blue text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            {getCurrencyIcon()}
            Estimated Trip Cost
          </CardTitle>
          
          {onCurrencyChange && (
            <Select value={currency} onValueChange={handleCurrencyChange}>
              <SelectTrigger className="w-28 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="INR">INR (₹)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-700">
              <Building className="mr-2" size={18} />
              <span>Accommodation ({duration} nights)</span>
            </div>
            <span className="font-medium">{formatCostRange(costs.accommodation, currency)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-700">
              <UtensilsCrossed className="mr-2" size={18} />
              <span>Food & Drink</span>
            </div>
            <span className="font-medium">{formatCostRange(costs.food, currency)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-700">
              <MapPin className="mr-2" size={18} />
              <span>Activities & Attractions</span>
            </div>
            <span className="font-medium">{formatCostRange(costs.activities, currency)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-700">
              <Car className="mr-2" size={18} />
              <span>Local Transportation</span>
            </div>
            <span className="font-medium">{formatCostRange(costs.transportation, currency)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Estimated Cost</span>
            <span className="text-travel-blue">{formatCostRange(costs.total, currency)}</span>
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
