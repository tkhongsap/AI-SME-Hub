import { useAuth } from "@/hooks/use-auth";
import { Redirect, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Activity, Timer, Bell } from "lucide-react";

export default function WelcomeBack() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    return <Redirect to="/auth" />;
  }

  const recentActivity = [
    {
      title: "Website Updates",
      description: "Your website had 127 visitors today",
      icon: Activity,
    },
    {
      title: "Pending Tasks",
      description: "3 marketing campaigns need review",
      icon: Timer,
    },
    {
      title: "New Notifications",
      description: "5 new AI recommendations available",
      icon: Bell,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-16 px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {user.companyName || "User"}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Here's what's happened since you've been away.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {recentActivity.map((activity, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="mb-4">
                  <activity.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
                <p className="text-muted-foreground">{activity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => setLocation("/dashboard")}
          >
            Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
