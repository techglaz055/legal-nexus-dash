import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ContractsFiltersProps {
  statusFilter: string;
  riskFilter: string;
  onStatusChange: (value: string) => void;
  onRiskChange: (value: string) => void;
}

export const ContractsFilters: React.FC<ContractsFiltersProps> = ({
  statusFilter,
  riskFilter,
  onStatusChange,
  onRiskChange,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Status Filter */}
      <div className="space-y-2">
        <Label htmlFor="status-filter">Status</Label>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger id="status-filter" className="animate-fast">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="animate-scale-in">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2" />
                Active
              </div>
            </SelectItem>
            <SelectItem value="Renewal Due">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-warning rounded-full mr-2" />
                Renewal Due
              </div>
            </SelectItem>
            <SelectItem value="Expired">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-destructive rounded-full mr-2" />
                Expired
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Risk Filter */}
      <div className="space-y-2">
        <Label htmlFor="risk-filter">Risk Level</Label>
        <Select value={riskFilter} onValueChange={onRiskChange}>
          <SelectTrigger id="risk-filter" className="animate-fast">
            <SelectValue placeholder="Filter by risk" />
          </SelectTrigger>
          <SelectContent className="animate-scale-in">
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="Low">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2" />
                Low Risk
              </div>
            </SelectItem>
            <SelectItem value="Medium">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-warning rounded-full mr-2" />
                Medium Risk
              </div>
            </SelectItem>
            <SelectItem value="High">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-destructive rounded-full mr-2" />
                High Risk
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};