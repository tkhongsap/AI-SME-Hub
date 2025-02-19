import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface AIRecommendationCardProps {
  title: string;
  description: string;
  impact: string;
  type: "marketing" | "website" | "analytics";
  onAction: () => void;
}

export default function AIRecommendationCard({
  title,
  description,
  impact,
  type,
  onAction,
}: AIRecommendationCardProps) {
  const typeColors = {
    marketing: "bg-pink-100 text-pink-800",
    website: "bg-blue-100 text-blue-800",
    analytics: "bg-purple-100 text-purple-800",
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Recommendation
          </CardTitle>
          <Badge className={typeColors[type]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Potential Impact: {impact}
          </span>
          <Button size="sm" onClick={onAction}>
            Take Action
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
