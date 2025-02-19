import { useQuery } from "@tanstack/react-query";
import { Website, Campaign } from "@shared/schema";
import Sidebar from "@/components/layout/sidebar";
import StatsCard from "@/components/dashboard/stats-card";
import AIRecommendationCard from "@/components/dashboard/ai-recommendation-card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import {
  Users,
  Globe,
  BarChart2,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mockStats = [
  {
    title: "Total Visitors",
    value: "1,234",
    description: "Website visitors this month",
    icon: Users,
    trend: { value: 12, label: "vs last month" },
  },
  {
    title: "Website Performance",
    value: "92",
    description: "Overall optimization score",
    icon: Globe,
    trend: { value: 4, label: "vs last week" },
  },
  {
    title: "Marketing Campaigns",
    value: "8",
    description: "Active campaigns",
    icon: Mail,
    trend: { value: 2, label: "new this week" },
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    description: "Average conversion rate",
    icon: BarChart2,
    trend: { value: -0.5, label: "vs last month" },
  },
];

const quickStartCards = [
  {
    title: "Create a form",
    description: "Well-crafted forms collect and manage lead information efficiently to improve scoring quality and conversion rates.",
    duration: "About 5 mins",
    route: "/forms",
    actionText: "Create form",
    skipText: "Skip for now"
  },
  {
    title: "Start building your website",
    description: "Use AI to generate a single-page website customized to your business, or start from scratch.",
    duration: "About 5 mins",
    route: "/website-builder",
    actionText: "Build website",
    skipText: "Skip for now"
  },
  {
    title: "Connect & create ads",
    description: "Target specific audiences to generate interest and drive higher-intent traffic to your specialised landing page.",
    duration: "About 5 mins",
    route: "/marketing",
    actionText: "Create ads",
    skipText: "Skip for now"
  }
];

const mockRecommendations = [
  {
    title: "Optimize Your Homepage",
    description: "Our AI analysis suggests adding more compelling calls-to-action to increase conversions by up to 25%.",
    impact: "Medium",
    type: "website" as const,
  },
  {
    title: "Launch Email Campaign",
    description: "AI-powered analysis shows your customers haven't heard from you in 30 days. Engaging now could boost retention.",
    impact: "High",
    type: "marketing" as const,
  },
  {
    title: "Review Analytics",
    description: "AI detected a 15% increase in bounce rate. Let's investigate and optimize user experience.",
    impact: "High",
    type: "analytics" as const,
  },
];

export default function Dashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: websites = [] } = useQuery<Website[]>({
    queryKey: ["/api/websites"],
  });

  const { data: campaigns = [] } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  const handleRecommendationAction = () => {
    toast({
      title: "AI Action Initiated",
      description: "Our AI is analyzing your data to implement this recommendation.",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your business today.
            </p>
          </div>

          {/* Quick Start Section */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
            {quickStartCards.map((card, index) => (
              <Card key={index} className={index === 0 ? "border-primary border-2" : ""}>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                    <p className="text-sm text-muted-foreground">{card.duration}</p>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => setLocation(card.route)}
                    >
                      {card.actionText}
                    </Button>
                    <Button 
                      variant="link" 
                      className="w-full text-muted-foreground"
                    >
                      {card.skipText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {mockStats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* AI Recommendations Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockRecommendations.map((recommendation) => (
                <AIRecommendationCard
                  key={recommendation.title}
                  {...recommendation}
                  onAction={handleRecommendationAction}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Websites</h2>
              <div className="space-y-4">
                {websites.map((website) => (
                  <div
                    key={website.id}
                    className="p-4 border rounded-lg bg-card"
                  >
                    <h3 className="font-medium">{website.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Template: {website.template}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Active Campaigns</h2>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="p-4 border rounded-lg bg-card"
                  >
                    <h3 className="font-medium">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Type: {campaign.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}