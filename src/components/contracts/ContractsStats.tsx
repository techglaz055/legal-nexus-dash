import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Contract } from '@/lib/mockApi';

interface ContractsStatsProps {
  contracts: Contract[];
  totalContracts: number;
}

export const ContractsStats: React.FC<ContractsStatsProps> = ({ 
  contracts, 
  totalContracts 
}) => {
  // Calculate stats from current page data (in real app, this would come from API)
  const stats = {
    total: totalContracts,
    active: contracts.filter(c => c.status === 'Active').length,
    renewalDue: contracts.filter(c => c.status === 'Renewal Due').length,
    highRisk: contracts.filter(c => c.risk === 'High').length,
  };

  const statCards = [
    {
      title: 'Total Contracts',
      value: stats.total,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary-light',
    },
    {
      title: 'Active',
      value: stats.active,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success-light',
    },
    {
      title: 'Renewal Due',
      value: stats.renewalDue,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning-light',
    },
    {
      title: 'High Risk',
      value: stats.highRisk,
      icon: AlertTriangle,
      color: 'text-destructive',
      bgColor: 'bg-destructive-light',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card 
          key={stat.title} 
          className={`hover-lift animate-slide-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};