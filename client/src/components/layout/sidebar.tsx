import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import * as Collapsible from '@radix-ui/react-collapsible';
import {
  LayoutDashboard,
  Users,
  Mail,
  Globe,
  FileText,
  BarChart2,
  Settings,
  HelpCircle,
  Library,
  Building2,
  MessageSquare,
  FolderKanban,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    section: "Workspaces",
    items: [
      { name: "Sales", href: "/sales", icon: Building2 },
      { name: "Help Desk", href: "/help-desk", icon: HelpCircle },
    ]
  },
  {
    section: "Marketing",
    items: [
      { name: "Campaigns", href: "/campaigns", icon: Mail },
      { name: "Email", href: "/email", icon: Mail },
      { name: "Social", href: "/social", icon: MessageSquare },
      { name: "Ads", href: "/ads", icon: BarChart2 },
      { name: "Forms", href: "/forms", icon: FileText },
      { name: "Lead Scoring", href: "/lead-scoring", icon: BarChart2 },
    ]
  },
  {
    section: "Content",
    items: [
      { name: "Website Pages", href: "/website-pages", icon: Globe },
      { name: "Landing Pages", href: "/landing-pages", icon: Globe },
      { name: "Blog", href: "/blog", icon: FileText },
      { name: "SEO", href: "/seo", icon: BarChart2 },
      { name: "Design Manager", href: "/design", icon: LayoutDashboard },
    ]
  },
  {
    section: "Library",
    items: [
      { name: "Templates", href: "/templates", icon: FileText },
      { name: "Meetings Scheduler", href: "/meetings", icon: Users },
      { name: "Documents", href: "/documents", icon: FileText },
      { name: "Playbooks", href: "/playbooks", icon: Library },
      { name: "Snippets", href: "/snippets", icon: FolderKanban },
    ]
  }
];

export default function Sidebar() {
  const [location] = useLocation();
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="flex h-full flex-col bg-sidebar border-r">
      <div className="flex h-16 items-center px-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-sidebar-foreground">AI-SME Hub</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-8">
          {navigation.map((section) => (
            <Collapsible.Root
              key={section.section}
              open={openSections.includes(section.section)}
              onOpenChange={() => toggleSection(section.section)}
              className="space-y-2"
            >
              <Collapsible.Trigger className="flex items-center w-full px-2 text-lg font-semibold text-sidebar-foreground group">
                <ChevronRight 
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    openSections.includes(section.section) && "transform rotate-90"
                  )} 
                />
                <span className="ml-2">{section.section}</span>
              </Collapsible.Trigger>
              <Collapsible.Content className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md ml-7",
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
              </Collapsible.Content>
            </Collapsible.Root>
          ))}
        </nav>
      </div>
    </div>
  );
}