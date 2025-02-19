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
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  {
    section: "Workspaces",
    description: "Manage your projects and teams",
    items: [
      { name: "Sales", href: "/sales", icon: Building2 },
      { name: "Help Desk", href: "/help-desk", icon: HelpCircle },
    ]
  },
  {
    section: "Marketing",
    description: "Plan and track your campaigns",
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
    description: "Manage your digital content",
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
    description: "Access your resources",
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSectionHover = (section: string, description: string) => {
    if (!isSidebarOpen) {
      toast({
        title: section,
        description: description,
        duration: 2000,
      });
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Toggle button for mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 z-40 h-full transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-16",
          isMobile && !isSidebarOpen && "-translate-x-full",
          "md:relative md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col bg-sidebar border-r">
          <div className="flex h-16 items-center px-4 border-b">
            <Link href="/" className="flex items-center space-x-2 overflow-hidden">
              {isSidebarOpen ? (
                <span className="text-xl font-bold text-sidebar-foreground">AI-SME Hub</span>
              ) : (
                <span className="text-xl font-bold text-sidebar-foreground">AI</span>
              )}
            </Link>
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <ChevronRight className={cn("h-4 w-4 transition-transform", !isSidebarOpen && "rotate-180")} />
              </Button>
            )}
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-8">
              {navigation.map((section) => (
                <Collapsible.Root
                  key={section.section}
                  open={isSidebarOpen && openSections.includes(section.section)}
                  onOpenChange={() => isSidebarOpen && toggleSection(section.section)}
                  className="space-y-2"
                >
                  <div 
                    className="relative group"
                    onMouseEnter={() => handleSectionHover(section.section, section.description)}
                  >
                    <Collapsible.Trigger 
                      className={cn(
                        "flex items-center w-full px-2 text-lg font-semibold text-sidebar-foreground group",
                        !isSidebarOpen && "justify-center"
                      )}
                    >
                      <ChevronRight 
                        className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          openSections.includes(section.section) && "transform rotate-90",
                          !isSidebarOpen && "hidden"
                        )} 
                      />
                      <span className={cn("ml-2", !isSidebarOpen && "ml-0")}>
                        {isSidebarOpen ? section.section : "•"}
                      </span>
                    </Collapsible.Trigger>
                  </div>

                  <Collapsible.Content className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = location === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                            !isSidebarOpen && "justify-center",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                          )}
                          title={item.name}
                        >
                          <item.icon
                            className={cn(
                              "h-5 w-5",
                              isSidebarOpen && "mr-3",
                              isActive
                                ? "text-sidebar-accent-foreground"
                                : "text-sidebar-foreground"
                            )}
                          />
                          {isSidebarOpen && item.name}
                        </Link>
                      );
                    })}
                  </Collapsible.Content>
                </Collapsible.Root>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}