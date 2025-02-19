import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Campaign } from "@shared/schema";
import { Mail, Facebook, Instagram, AlertCircle } from "lucide-react";

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (id: number) => void;
}

export default function CampaignCard({ campaign, onEdit }: CampaignCardProps) {
  const typeIcons = {
    email: Mail,
    social: Facebook,
    ad: AlertCircle,
  };

  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    scheduled: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
    completed: "bg-purple-100 text-purple-800",
  };

  const Icon = typeIcons[campaign.type as keyof typeof typeIcons] || AlertCircle;
  const content = campaign.content || { body: "" };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Icon className="h-5 w-5 text-muted-foreground" />
            {campaign.name}
          </CardTitle>
          <Badge className={statusColors[campaign.status as keyof typeof statusColors]}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {content.subject && (
            <div>
              <p className="text-sm font-medium">Subject</p>
              <p className="text-sm text-muted-foreground">{content.subject}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">Content Preview</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {content.body}
            </p>
          </div>
          {content.schedule && (
            <div>
              <p className="text-sm font-medium">Schedule</p>
              <p className="text-sm text-muted-foreground">{content.schedule}</p>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => onEdit(campaign.id)}>
              Edit Campaign
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}