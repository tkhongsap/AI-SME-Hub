import { useQuery } from "@tanstack/react-query";
import { Website, Campaign } from "@shared/schema";
import Sidebar from "@/components/layout/sidebar";
import StatsCard from "@/components/dashboard/stats-card";
import AIRecommendationCard from "@/components/dashboard/ai-recommendation-card";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Globe,
  BarChart2,
  Mail,
} from "lucide-react";

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

const mockRecommendations = [
  {
    title: "Optimize Your Homepage",
    description: "Add more compelling calls-to-action to increase conversions.",
    impact: "Medium",
    type: "website" as const,
  },
  {
    title: "Launch Email Campaign",
    description: "Your customers haven't heard from you in a while.",
    impact: "High",
    type: "marketing" as const,
  },
  {
    title: "Review Analytics",
    description: "Your bounce rate has increased. Let's investigate why.",
    impact: "High",
    type: "analytics" as const,
  },
];

export default function Dashboard() {
  const { toast } = useToast();

  const { data: websites = [] } = useQuery<Website[]>({
    queryKey: ["/api/websites"],
  });

  const { data: campaigns = [] } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  const handleRecommendationAction = () => {
    toast({
      title: "Action Taken",
      description: "We'll help you implement this recommendation.",
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

          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {mockStats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {mockRecommendations.map((recommendation) => (
              <AIRecommendationCard
                key={recommendation.title}
                {...recommendation}
                onAction={handleRecommendationAction}
              />
            ))}
          </div>

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