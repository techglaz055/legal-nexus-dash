import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApi, ContractDetail as ContractDetailType } from '@/lib/mockApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  FileText, 
  Users, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  Shield,
  Search,
  ExternalLink
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const ContractDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contract, setContract] = useState<ContractDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    const fetchContract = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const contractData = await mockApi.getContract(id);
        if (contractData) {
          setContract(contractData);
        } else {
          setError('Contract not found');
        }
      } catch (err) {
        setError('Failed to load contract details');
        toast({
          title: "Error",
          description: "Failed to load contract details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  const getStatusIcon = (status: ContractDetailType['status']) => {
    const icons = {
      'Active': CheckCircle,
      'Expired': AlertTriangle,
      'Renewal Due': Clock,
    };
    return icons[status];
  };

  const getStatusColor = (status: ContractDetailType['status']) => {
    return {
      'Active': 'status-active',
      'Expired': 'status-expired',
      'Renewal Due': 'status-renewal',
    }[status];
  };

  const getRiskColor = (risk: string) => {
    return {
      'Low': 'risk-low',
      'Medium': 'risk-medium',
      'High': 'risk-high',
    }[risk];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-8 w-64" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="hover-lift"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Contracts
        </Button>
        
        <Card className="animate-fade-in">
          <CardContent className="py-12 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Contract Not Found</h3>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(contract.status);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="hover-lift"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold">{contract.name}</h1>
            <p className="text-muted-foreground">Contract Details & Analysis</p>
          </div>
        </div>
        
        <Button 
          variant="outline"
          onClick={() => setShowEvidence(true)}
          className="hover-lift"
        >
          <Search className="mr-2 h-4 w-4" />
          View Evidence
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contract Metadata */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Contract Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Parties</label>
                    <div className="flex items-center mt-1">
                      <Users className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{contract.parties}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{formatDate(contract.start)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge className={cn('font-medium', getStatusColor(contract.status))}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {contract.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{formatDate(contract.expiry)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clauses */}
          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Key Clauses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contract.clauses.map((clause, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{clause.title}</h4>
                    <div className="flex items-center">
                      <div className="text-sm text-muted-foreground mr-2">
                        Confidence
                      </div>
                      <Progress 
                        value={clause.confidence * 100} 
                        className="w-20"
                      />
                      <span className="text-sm font-medium ml-2">
                        {Math.round(clause.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{clause.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                AI Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contract.insights.map((insight, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Badge 
                    variant="outline" 
                    className={cn('font-medium mt-0.5', getRiskColor(insight.risk))}
                  >
                    {insight.risk}
                  </Badge>
                  <p className="text-sm flex-1">{insight.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Risk Score */}
          <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center mx-auto text-2xl font-bold",
                  getRiskColor(contract.risk)
                )}>
                  {contract.risk[0]}
                </div>
                <div>
                  <div className="text-2xl font-bold">{contract.risk} Risk</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Overall contract risk assessment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Panel */}
          <Card className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Evidence Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contract.evidence.slice(0, 3).map((evidence, index) => (
                <div 
                  key={index}
                  className="p-3 border rounded-lg hover-lift cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setShowEvidence(true)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{evidence.source}</span>
                    <div className="flex items-center">
                      <Progress 
                        value={evidence.relevance * 100} 
                        className="w-12"
                      />
                      <span className="text-xs ml-1">
                        {Math.round(evidence.relevance * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {evidence.snippet}
                  </p>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full hover-lift"
                onClick={() => setShowEvidence(true)}
              >
                View All Evidence
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Evidence Modal */}
      {showEvidence && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Evidence Sources</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowEvidence(false)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              <div className="space-y-4">
                {contract.evidence.map((evidence, index) => (
                  <div 
                    key={index}
                    className="p-4 border rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{evidence.source}</span>
                      <Badge variant="outline">
                        {Math.round(evidence.relevance * 100)}% relevant
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {evidence.snippet}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};