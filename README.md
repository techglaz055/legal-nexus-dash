# ContractDash - Smart Contract Management Dashboard

A modern SaaS contracts management dashboard built with React, TypeScript, and Tailwind CSS. This application simulates a real-world contract management system with authentication, file uploads, contract insights, and responsive design.

## 🚀 Live Demo

**URL**: https://lovable.dev/projects/d79d52ff-d108-4f7a-bfc7-b284efce4960

## 📋 Features

### Authentication
- **Mock Login System**: Username + password authentication
- **Credentials**: Any username, password must be `test123`
- **JWT Simulation**: Mock token stored in localStorage
- **Protected Routes**: Automatic redirect to login for unauthenticated users
- **Session Persistence**: Remembers login state across browser sessions

### Dashboard Overview
- **Contract Statistics**: Real-time stats with animated counters
- **Status Distribution**: Visual breakdown of contract statuses
- **Risk Assessment**: Color-coded risk indicators
- **Responsive Layout**: Sidebar navigation with mobile-friendly design

### Contract Management
- **Contract List**: Paginated table with sorting capabilities
- **Advanced Filters**: Filter by status (Active, Expired, Renewal Due) and risk level (Low, Medium, High)
- **Search Functionality**: Search contracts by name or parties
- **Real-time Updates**: Instant filtering and search results

### Contract Details
- **Comprehensive View**: Complete contract metadata and timeline
- **Clause Analysis**: Extracted clauses with confidence scores
- **Risk Insights**: Intelligent risk assessment with severity indicators
- **Evidence Panel**: Supporting documentation with relevance scores
- **Interactive UI**: Expandable sections and smooth transitions

### File Upload System
- **Drag & Drop Interface**: Modern file upload experience
- **Multiple File Support**: Handle multiple files simultaneously
- **Upload Progress**: Real-time upload status with progress indicators
- **Error Handling**: Graceful error states and retry mechanisms
- **File Validation**: Type and size validation

### Design System
- **Dark/Light Mode**: Automatic theme switching based on system preference
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Smooth Animations**: Custom animations for enhanced UX
- **Consistent Styling**: Semantic design tokens and reusable components
- **Professional UI**: Clean, modern interface following SaaS best practices

## 🛠 Tech Stack

### Frontend
- **React 18**: Modern functional components with hooks
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing with protected routes
- **Context API**: State management for authentication and app state

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful, customizable icons
- **Custom Animations**: Tailwind-based animation system

### Development Tools
- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── layout/             # Layout components
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   ├── contracts/          # Contract-specific components
│   │   ├── ContractsStats.tsx
│   │   ├── ContractsFilters.tsx
│   │   └── ContractsTable.tsx
│   ├── upload/             # File upload components
│   │   └── UploadModal.tsx
│   ├── AppWrapper.tsx      # Main app wrapper
│   └── ProtectedRoute.tsx  # Route protection
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── hooks/
│   └── use-mobile.tsx      # Mobile detection hook
├── lib/
│   ├── mockApi.ts          # Mock API implementation
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Login.tsx           # Login page
│   ├── Dashboard.tsx       # Main dashboard
│   ├── ContractDetail.tsx  # Contract details view
│   └── NotFound.tsx        # 404 page
├── App.tsx                 # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles and design tokens
```

## 🏗 Step-by-Step Build Process

### Phase 1: Project Setup & Configuration

1. **Initialize Project**
   ```bash
   # Created React + TypeScript + Vite project
   npm create vite@latest contractdash -- --template react-ts
   ```

2. **Install Dependencies**
   ```bash
   # Core dependencies
   npm install react-router-dom @tanstack/react-query
   
   # UI Components
   npm install @radix-ui/react* lucide-react
   
   # Styling
   npm install tailwindcss tailwindcss-animate class-variance-authority
   
   # Utilities
   npm install clsx tailwind-merge date-fns
   ```

3. **Configure Tailwind CSS**
   - Set up `tailwind.config.ts` with custom design tokens
   - Created semantic color system with HSL values
   - Added custom animations and keyframes
   - Configured responsive breakpoints

### Phase 2: Design System & UI Components

4. **Design System Setup** (`src/index.css`)
   ```css
   /* Custom CSS variables for consistent theming */
   :root {
     --background: 0 0% 100%;
     --foreground: 240 10% 3.9%;
     --primary: 240 5.9% 10%;
     /* ... additional semantic tokens */
   }
   ```

5. **shadcn/ui Integration**
   - Installed base UI components (Button, Card, Table, Dialog, etc.)
   - Customized component variants for brand consistency
   - Added animation support to all interactive elements

### Phase 3: Authentication System

6. **Auth Context Creation** (`src/contexts/AuthContext.tsx`)
   ```typescript
   // Mock authentication with localStorage persistence
   const login = async (username: string, password: string) => {
     if (password === 'test123') {
       // Generate mock JWT and user data
       // Store in localStorage for persistence
     }
   };
   ```

7. **Protected Routes** (`src/components/ProtectedRoute.tsx`)
   - Route guards for authenticated pages
   - Automatic redirect to login
   - Loading states during auth check

### Phase 4: Layout & Navigation

8. **Dashboard Layout** (`src/components/layout/DashboardLayout.tsx`)
   - Responsive sidebar navigation
   - Collapsible menu for mobile
   - Header with user controls

9. **Sidebar Navigation** (`src/components/layout/Sidebar.tsx`)
   - Active route highlighting
   - Smooth hover animations
   - Mobile-responsive behavior

### Phase 5: Mock API & Data Layer

10. **Mock API Implementation** (`src/lib/mockApi.ts`)
    ```typescript
    // Simulated REST API with realistic delays
    export const mockApi = {
      getContracts: async (params) => {
        await delay(800); // Simulate network latency
        // Apply filters, pagination, search
        return { contracts, total, page, totalPages };
      }
    };
    ```

11. **Data Models**
    - TypeScript interfaces for type safety
    - Contract, Clause, Insight, Evidence types
    - Comprehensive mock data with realistic scenarios

### Phase 6: Core Features Implementation

12. **Contracts Dashboard** (`src/pages/Dashboard.tsx`)
    - Statistics cards with animated counters
    - Real-time filtering and search
    - Pagination with loading states
    - Empty and error state handling

13. **Contract Details Page** (`src/pages/ContractDetail.tsx`)
    - Detailed contract metadata
    - Clause analysis with confidence scores
    - Risk insights with severity indicators
    - Evidence panel with relevance scoring

14. **File Upload System** (`src/components/upload/UploadModal.tsx`)
    - Drag & drop interface
    - Multiple file handling
    - Progress tracking
    - Error handling and validation

### Phase 7: Advanced Features

15. **Advanced Filtering System**
    - Multi-criteria filtering (status, risk, search)
    - URL parameter synchronization
    - Filter state persistence
    - Real-time results updates

16. **Responsive Design Implementation**
    - Mobile-first approach
    - Breakpoint-specific layouts
    - Touch-friendly interactions
    - Adaptive navigation

### Phase 8: Polish & Optimization

17. **Animation System**
    - Custom keyframe animations
    - Smooth transitions
    - Hover effects
    - Loading states

18. **Error Handling**
    - Comprehensive error boundaries
    - User-friendly error messages
    - Retry mechanisms
    - Graceful degradation

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Modern web browser
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd contractdash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📡 API Documentation

### Authentication
- **Login**: Mock authentication accepting any username with password `test123`
- **Session**: JWT stored in localStorage with automatic refresh

### Contracts Endpoints

#### GET /contracts
Query Parameters:
- `search`: Filter by contract name or parties
- `status`: Filter by status (Active, Expired, Renewal Due)
- `risk`: Filter by risk level (Low, Medium, High)
- `page`: Page number for pagination
- `limit`: Results per page

Response:
```json
{
  "contracts": [...],
  "total": 100,
  "page": 1,
  "totalPages": 10
}
```

#### GET /contracts/:id
Response:
```json
{
  "id": "c1",
  "name": "MSA 2025",
  "parties": "Microsoft & ABC Corp",
  "start": "2023-01-01",
  "expiry": "2025-12-31",
  "status": "Active",
  "risk": "Medium",
  "clauses": [...],
  "insights": [...],
  "evidence": [...]
}
```

### File Upload
#### POST /upload
- Simulated file upload with progress tracking
- 90% success rate simulation
- Variable upload time (2-4 seconds)

## 🚀 Deployment

### Automatic Deployment (Lovable)
1. Visit the [Lovable Project](https://lovable.dev/projects/d79d52ff-d108-4f7a-bfc7-b284efce4960)
2. Click Share → Publish
3. Your app is automatically deployed

### Manual Deployment

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🎨 Design Decisions

### Why These Technologies?

1. **React + TypeScript**: Type safety and modern development experience
2. **Tailwind CSS**: Rapid UI development with consistent design tokens
3. **Context API**: Simple state management for authentication
4. **Mock API**: Realistic development experience without backend complexity
5. **Radix UI**: Accessible, unstyled components for customization

### Architecture Choices

1. **Component Composition**: Reusable, focused components
2. **Semantic Design Tokens**: Consistent theming across the application
3. **Progressive Enhancement**: Works without JavaScript for basic functionality
4. **Mobile-First Design**: Optimal experience across all devices

## 🔮 Future Enhancements

- [ ] Real backend integration
- [ ] Advanced contract analytics
- [ ] Collaborative features
- [ ] Audit trail and versioning
- [ ] Integration with document management systems
- [ ] Advanced search with fuzzy matching
- [ ] Real-time notifications
- [ ] Multi-tenant support

## 📄 License

This project is part of a coding assignment and is for demonstration purposes.

## 🤝 Contributing

This is a demonstration project. For improvements or questions, please open an issue.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**