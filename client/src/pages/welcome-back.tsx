import { useAuth } from "@/hooks/use-auth";
import { Redirect, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function WelcomeBack() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    return <Redirect to="/auth" />;
  }

  // For demo purposes, we'll use hardcoded values
  const demoUser = {
    companyName: "XYZ Company",
    username: "xyz@gmail.com"
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-lg text-muted-foreground">
            It looks like you're already using AI-SME Hub.
          </p>
        </div>

        <Card className="p-6">
          <CardContent className="flex flex-col items-center space-y-4 pt-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/avatar-placeholder.png" />
              <AvatarFallback className="text-lg">
                X
              </AvatarFallback>
            </Avatar>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">
                {demoUser.companyName}
              </h2>
              <p className="text-muted-foreground">
                {demoUser.username}
              </p>
            </div>

            <Button 
              className="w-full"
              size="lg"
              onClick={() => setLocation('/dashboard')}
            >
              Continue with this user
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => setLocation('/auth')}
            className="text-primary hover:text-primary/90"
          >
            Create account with a new user
          </Button>
        </div>
      </div>
    </div>
  );
}