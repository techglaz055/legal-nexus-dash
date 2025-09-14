// Mock API utilities for contracts management

export interface Contract {
  id: string;
  name: string;
  parties: string;
  expiry: string;
  status: 'Active' | 'Expired' | 'Renewal Due';
  risk: 'Low' | 'Medium' | 'High';
  start?: string;
  clauses?: Clause[];
  insights?: Insight[];
  evidence?: Evidence[];
}

export interface Clause {
  title: string;
  summary: string;
  confidence: number;
}

export interface Insight {
  risk: 'Low' | 'Medium' | 'High';
  message: string;
}

export interface Evidence {
  source: string;
  snippet: string;
  relevance: number;
}

export interface ContractDetail extends Contract {
  start: string;
  clauses: Clause[];
  insights: Insight[];
  evidence: Evidence[];
}

// Mock data
const mockContracts: Contract[] = [
  {
    id: "c1",
    name: "MSA 2025",
    parties: "Microsoft & ABC Corp",
    expiry: "2025-12-31",
    status: "Active",
    risk: "Medium"
  },
  {
    id: "c2", 
    name: "Network Services Agreement",
    parties: "TelNet & ABC Corp",
    expiry: "2025-10-10",
    status: "Renewal Due",
    risk: "High"
  },
  {
    id: "c3",
    name: "Software License Agreement",
    parties: "Adobe & ABC Corp", 
    expiry: "2024-06-15",
    status: "Expired",
    risk: "Low"
  },
  {
    id: "c4",
    name: "Cloud Services Contract",
    parties: "AWS & ABC Corp",
    expiry: "2026-03-20",
    status: "Active", 
    risk: "Low"
  },
  {
    id: "c5",
    name: "Consulting Agreement",
    parties: "Deloitte & ABC Corp",
    expiry: "2025-08-14",
    status: "Active",
    risk: "Medium"
  },
  {
    id: "c6",
    name: "Data Processing Agreement", 
    parties: "Salesforce & ABC Corp",
    expiry: "2024-11-30",
    status: "Renewal Due",
    risk: "High"
  },
  {
    id: "c7",
    name: "Hardware Purchase Agreement",
    parties: "Dell & ABC Corp",
    expiry: "2025-05-18",
    status: "Active",
    risk: "Low"
  },
  {
    id: "c8",
    name: "Marketing Services Contract",
    parties: "HubSpot & ABC Corp", 
    expiry: "2024-09-25",
    status: "Expired",
    risk: "Medium"
  }
];

const mockContractDetails: Record<string, ContractDetail> = {
  c1: {
    id: "c1",
    name: "MSA 2025", 
    parties: "Microsoft & ABC Corp",
    start: "2023-01-01",
    expiry: "2025-12-31",
    status: "Active",
    risk: "Medium",
    clauses: [
      { title: "Termination", summary: "90 days notice period required for contract termination.", confidence: 0.82 },
      { title: "Liability Cap", summary: "Total liability limited to 12 months' fees paid.", confidence: 0.87 },
      { title: "Data Security", summary: "Contractor must maintain SOC 2 Type II compliance.", confidence: 0.91 },
      { title: "Payment Terms", summary: "Net 30 payment terms with 2% early payment discount.", confidence: 0.78 }
    ],
    insights: [
      { risk: "High", message: "Liability cap excludes data breach costs and IP infringement." },
      { risk: "Medium", message: "Contract auto-renews unless cancelled 60 days before expiry." },
      { risk: "Low", message: "Standard force majeure clause provides adequate protection." }
    ],
    evidence: [
      { source: "Section 12.2", snippet: "Total liability limited to 12 months' fees paid under this Agreement.", relevance: 0.91 },
      { source: "Section 8.1", snippet: "Either party may terminate with 90 days written notice.", relevance: 0.85 },
      { source: "Section 15.3", snippet: "This Agreement shall automatically renew for successive 12-month periods.", relevance: 0.79 }
    ]
  },
  c2: {
    id: "c2",
    name: "Network Services Agreement",
    parties: "TelNet & ABC Corp", 
    start: "2022-10-10",
    expiry: "2025-10-10",
    status: "Renewal Due",
    risk: "High",
    clauses: [
      { title: "Service Level Agreement", summary: "99.9% uptime guarantee with service credits.", confidence: 0.94 },
      { title: "Termination for Cause", summary: "30-day cure period for material breaches.", confidence: 0.88 },
      { title: "Price Escalation", summary: "Annual price increases capped at 5% per year.", confidence: 0.76 }
    ],
    insights: [
      { risk: "High", message: "No liability cap for service outages exceeding SLA thresholds." },
      { risk: "High", message: "Automatic renewal with significant price escalation clause." },
      { risk: "Medium", message: "Limited termination rights during initial 24-month period." }
    ],
    evidence: [
      { source: "Schedule A", snippet: "Provider guarantees 99.9% network uptime measured monthly.", relevance: 0.94 },
      { source: "Section 6.3", snippet: "Annual fee adjustments shall not exceed 5% of the prior year's fees.", relevance: 0.82 },
      { source: "Section 11.1", snippet: "Customer may not terminate for convenience during the initial term.", relevance: 0.77 }
    ]
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Get all contracts with optional filters
  async getContracts(params?: {
    search?: string;
    status?: string;
    risk?: string;
    page?: number;
    limit?: number;
  }): Promise<{ contracts: Contract[]; total: number; page: number; totalPages: number }> {
    await delay(800); // Simulate network delay

    let filteredContracts = [...mockContracts];

    // Apply filters
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredContracts = filteredContracts.filter(contract => 
        contract.name.toLowerCase().includes(searchLower) ||
        contract.parties.toLowerCase().includes(searchLower)
      );
    }

    if (params?.status && params.status !== 'all') {
      filteredContracts = filteredContracts.filter(contract => 
        contract.status === params.status
      );
    }

    if (params?.risk && params.risk !== 'all') {
      filteredContracts = filteredContracts.filter(contract => 
        contract.risk === params.risk
      );
    }

    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedContracts = filteredContracts.slice(startIndex, endIndex);

    return {
      contracts: paginatedContracts,
      total: filteredContracts.length,
      page,
      totalPages: Math.ceil(filteredContracts.length / limit)
    };
  },

  // Get contract by ID
  async getContract(id: string): Promise<ContractDetail | null> {
    await delay(600);
    return mockContractDetails[id] || null;
  },

  // Mock file upload
  async uploadFile(file: File): Promise<{ success: boolean; fileName: string; message: string }> {
    await delay(2000 + Math.random() * 2000); // Simulate variable upload time

    // Mock success/failure (90% success rate)
    const success = Math.random() > 0.1;

    return {
      success,
      fileName: file.name,
      message: success ? 'File uploaded successfully' : 'Upload failed - please try again'
    };
  }
};