import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Contract } from '@/lib/mockApi';
import { cn } from '@/lib/utils';

interface ContractsTableProps {
  contracts: Contract[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onContractClick: (contractId: string) => void;
}

export const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts,
  currentPage,
  totalPages,
  onPageChange,
  onContractClick,
}) => {
  const getStatusBadge = (status: Contract['status']) => {
    const config = {
      'Active': { 
        variant: 'default' as const, 
        className: 'status-active',
        icon: CheckCircle
      },
      'Expired': { 
        variant: 'destructive' as const, 
        className: 'status-expired',
        icon: AlertTriangle
      },
      'Renewal Due': { 
        variant: 'secondary' as const, 
        className: 'status-renewal',
        icon: Clock
      },
    };

    const { className, icon: Icon } = config[status];
    
    return (
      <Badge className={cn('font-medium', className)}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getRiskBadge = (risk: Contract['risk']) => {
    const config = {
      'Low': 'risk-low',
      'Medium': 'risk-medium', 
      'High': 'risk-high',
    };

    return (
      <Badge variant="outline" className={cn('font-medium', config[risk])}>
        {risk}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Contracts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract</TableHead>
                <TableHead>Parties</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract, index) => (
                <TableRow 
                  key={contract.id}
                  className="cursor-pointer hover:bg-muted/50 animate-fast hover-lift"
                  onClick={() => onContractClick(contract.id)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{contract.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Contract ID: {contract.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{contract.parties}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{formatDate(contract.expiry)}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {getStatusBadge(contract.status)}
                  </TableCell>
                  
                  <TableCell>
                    {getRiskBadge(contract.risk)}
                  </TableCell>
                  
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="hover-lift"
                      onClick={(e) => {
                        e.stopPropagation();
                        onContractClick(contract.id);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="hover-lift"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  const isActive = page === currentPage;
                  
                  return (
                    <Button
                      key={page}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(page)}
                      className={cn(
                        "w-8 h-8 p-0 hover-lift",
                        isActive && "gradient-primary"
                      )}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="hover-lift"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};