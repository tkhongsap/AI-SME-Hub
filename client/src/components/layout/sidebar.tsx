import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Globe,
  Mail,
  BarChart2,
  Settings,
  HelpCircle,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Website Builder", href: "/website-builder", icon: Globe },
  { name: "Marketing", href: "/marketing", icon: Mail },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/support", icon: HelpCircle },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="flex h-full flex-col bg-sidebar border-r">
      <div className="flex h-16 items-center px-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-sidebar-foreground">AI-SME Hub</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5",
                    isActive
                      ? "text-sidebar-accent-foreground"
                      : "text-sidebar-foreground"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex-shrink-0 px-2 py-4 space-y-1 border-t border-sidebar-border">
          {secondaryNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <item.icon className="mr-3 h-5 w-5 text-sidebar-foreground" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
