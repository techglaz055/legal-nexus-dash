import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi, Contract } from '@/lib/mockApi';
import { ContractsTable } from '@/components/contracts/ContractsTable';
import { ContractsFilters } from '@/components/contracts/ContractsFilters';
import { ContractsStats } from '@/components/contracts/ContractsStats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Plus, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContracts, setTotalContracts] = useState(0);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await mockApi.getContracts({
        search: search.trim() || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        risk: riskFilter !== 'all' ? riskFilter : undefined,
        page: currentPage,
        limit: 10,
      });

      setContracts(response.contracts);
      setTotalPages(response.totalPages);
      setTotalContracts(response.total);
    } catch (err) {
      setError('Failed to load contracts. Please try again.');
      toast({
        title: "Error",
        description: "Failed to load contracts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch contracts on component mount and filter changes
  useEffect(() => {
    fetchContracts();
  }, [search, statusFilter, riskFilter, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, riskFilter]);

  const handleRefresh = () => {
    fetchContracts();
    toast({
      title: "Refreshed",
      description: "Contract data has been refreshed.",
    });
  };

  const handleContractClick = (contractId: string) => {
    navigate(`/contract/${contractId}`);
  };

  const handleUploadClick = () => {
    const event = new CustomEvent('openUploadModal');
    window.dispatchEvent(event);
  };

  if (error && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contracts</h1>
            <p className="text-muted-foreground">Manage and analyze your contracts</p>
          </div>
        </div>

        <Card className="animate-fade-in">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-destructive-light rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Failed to load contracts</h3>
                <p className="text-muted-foreground">{error}</p>
              </div>
              <Button onClick={handleRefresh} className="hover-lift">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contracts</h1>
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${totalContracts} contracts found`}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleRefresh} className="hover-lift">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleUploadClick} className="hover-lift gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Upload Contract
          </Button>
        </div>
      </div>

      {/* Stats */}
      {!loading && <ContractsStats contracts={contracts} totalContracts={totalContracts} />}

      {/* Search and Filters */}
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>
            Find contracts by name, parties, status, or risk level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contracts by name or parties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 animate-fast"
            />
          </div>

          {/* Filters */}
          <ContractsFilters
            statusFilter={statusFilter}
            riskFilter={riskFilter}
            onStatusChange={setStatusFilter}
            onRiskChange={setRiskFilter}
          />
        </CardContent>
      </Card>

      {/* Contracts Table */}
      {loading ? (
        <Card className="animate-slide-up">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : contracts.length === 0 ? (
        <Card className="animate-slide-up">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No contracts found</h3>
                <p className="text-muted-foreground">
                  {search || statusFilter !== 'all' || riskFilter !== 'all'
                    ? 'Try adjusting your search criteria or filters'
                    : 'Get started by uploading your first contract'
                  }
                </p>
              </div>
              <Button onClick={handleUploadClick} className="hover-lift">
                <Plus className="mr-2 h-4 w-4" />
                Upload Contract
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ContractsTable
          contracts={contracts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onContractClick={handleContractClick}
        />
      )}
    </div>
  );
};