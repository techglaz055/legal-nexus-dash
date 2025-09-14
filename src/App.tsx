import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppWrapper } from "@/components/AppWrapper";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";
import { ContractDetail } from "@/pages/ContractDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppWrapper>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="contract/:id" element={<ContractDetail />} />
                <Route path="insights" element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Insights</h2>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                } />
                <Route path="reports" element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Reports</h2>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                } />
                <Route path="settings" element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Settings</h2>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                } />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
