import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FileText, 
  TrendingUp, 
  BarChart3, 
  Settings,
  Upload,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Contracts', href: '/dashboard', icon: FileText },
  { name: 'Insights', href: '/insights', icon: TrendingUp },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className={cn(
      "bg-card border-r border-border flex flex-col animate-smooth",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">ContractDash</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hover-glow"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === '/dashboard' && location.pathname === '/');
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium animate-smooth hover-lift",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
        
        {/* Upload Button */}
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start hover-lift border-dashed border-2",
            collapsed ? "px-2" : "px-3"
          )}
          onClick={() => {
            // This will be handled by a modal
            const event = new CustomEvent('openUploadModal');
            window.dispatchEvent(event);
          }}
        >
          <Upload className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
          {!collapsed && <span>Upload Files</span>}
        </Button>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "text-xs text-muted-foreground text-center",
          collapsed && "hidden"
        )}>
          <p>Contract Management</p>
          <p className="font-medium">Dashboard v1.0</p>
        </div>
      </div>
    </div>
  );
};