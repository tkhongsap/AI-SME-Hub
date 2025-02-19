import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import StatsCard from "@/components/dashboard/stats-card";
import AIRecommendationCard from "@/components/dashboard/ai-recommendation-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Users,
  Clock,
  MousePointerClick,
  ArrowUpRight,
  Mail,
  Share2,
  BarChart2,
} from "lucide-react";

// Mock data for demonstration
const trafficData = [
  { date: "Mon", visitors: 120, pageviews: 240 },
  { date: "Tue", visitors: 150, pageviews: 320 },
  { date: "Wed", visitors: 180, pageviews: 380 },
  { date: "Thu", visitors: 190, pageviews: 400 },
  { date: "Fri", visitors: 160, pageviews: 350 },
  { date: "Sat", visitors: 140, pageviews: 280 },
  { date: "Sun", visitors: 130, pageviews: 260 },
];

const marketingData = [
  { channel: "Email", conversions: 45 },
  { channel: "Social", conversions: 32 },
  { channel: "Organic", conversions: 28 },
  { channel: "Paid", conversions: 20 },
];

const quickStats = [
  {
    title: "Total Visitors",
    value: "2,847",
    description: "Unique visitors this month",
    icon: Users,
    trend: { value: 12, label: "vs last month" },
  },
  {
    title: "Avg. Session",
    value: "4:23",
    description: "Time spent on site",
    icon: Clock,
    trend: { value: 8, label: "vs last month" },
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    description: "From visitors to leads",
    icon: MousePointerClick,
    trend: { value: -0.5, label: "vs last month" },
  },
  {
    title: "Bounce Rate",
    value: "42%",
    description: "Single page sessions",
    icon: ArrowUpRight,
    trend: { value: -2, label: "vs last month" },
  },
];

const channelStats = [
  {
    title: "Email Marketing",
    value: "32%",
    description: "Open rate this month",
    icon: Mail,
    trend: { value: 5, label: "vs last month" },
  },
  {
    title: "Social Media",
    value: "2.1K",
    description: "Total engagements",
    icon: Share2,
    trend: { value: 15, label: "vs last month" },
  },
];

export default function Analytics() {
  const [timeframe, setTimeframe] = useState("7d");
  const { toast } = useToast();

  const { data: analyticsData } = useQuery({
    queryKey: ["/api/analytics", timeframe],
    // This would normally fetch real data
    queryFn: () => Promise.resolve({}),
  });

  const handleRecommendationAction = () => {
    toast({
      title: "Optimization Started",
      description: "We'll help you implement these improvements.",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
              <p className="text-muted-foreground">
                Track your performance and get AI-powered recommendations.
              </p>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid gap-6 mb-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  Website Traffic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="visitors"
                        stroke="#FF7A59"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="pageviews"
                        stroke="#33475B"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Marketing Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="channel" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="conversions" fill="#FF7A59" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 mb-8 lg:grid-cols-2">
            {channelStats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AIRecommendationCard
              title="Optimize Blog Content"
              description="Your blog posts could rank higher with these SEO improvements."
              impact="High"
              type="analytics"
              onAction={handleRecommendationAction}
            />
            <AIRecommendationCard
              title="Email Campaign Timing"
              description="Send your newsletters at 10 AM for better open rates."
              impact="Medium"
              type="marketing"
              onAction={handleRecommendationAction}
            />
            <AIRecommendationCard
              title="Mobile Optimization"
              description="Improve mobile page load times by 40%."
              impact="High"
              type="website"
              onAction={handleRecommendationAction}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
