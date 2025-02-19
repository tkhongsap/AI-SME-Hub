import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Welcome() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // If no user, redirect to auth
  if (!user) {
    return <Redirect to="/auth" />;
  }

  const steps = [
    {
      title: "Complete Your Profile",
      description: "Add your company details and preferences",
      link: "/profile",
    },
    {
      title: "Create Your First Website",
      description: "Use our AI-powered website builder",
      link: "/website-builder",
    },
    {
      title: "Set Up Marketing",
      description: "Configure your marketing campaigns",
      link: "/marketing",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to AI-SME Hub!</h1>
          <p className="text-xl text-muted-foreground">
            Let's get started with setting up your business for success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setLocation(step.link)}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => setLocation("/dashboard")}
          >
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
