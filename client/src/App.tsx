import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import HomePage from "@/pages/home-page";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import Welcome from "@/pages/welcome";
import WelcomeBack from "@/pages/welcome-back";
import WebsiteBuilder from "@/pages/website-builder";
import Marketing from "@/pages/marketing";
import Analytics from "@/pages/analytics";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/welcome" component={Welcome} />
      <ProtectedRoute path="/welcome-back" component={WelcomeBack} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/website-builder" component={WebsiteBuilder} />
      <ProtectedRoute path="/marketing" component={Marketing} />
      <ProtectedRoute path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;