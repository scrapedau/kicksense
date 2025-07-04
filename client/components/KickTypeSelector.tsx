import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Target, Zap, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type KickType = "punt" | "kickoff" | "field-goal";

interface KickTypeSelectorProps {
  onSelect: (kickType: KickType, withVideo: boolean) => void;
  onCancel: () => void;
}

export default function KickTypeSelector({
  onSelect,
  onCancel,
}: KickTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<KickType | null>(null);

  const kickTypes: Array<{
    type: KickType;
    label: string;
    description: string;
    icon: typeof Target;
    color: string;
  }> = [
    {
      type: "field-goal",
      label: "Field Goal",
      description: "Accurate placement kicks through the uprights",
      icon: Target,
      color: "bg-primary/10 border-primary/30 text-primary",
    },
    {
      type: "punt",
      label: "Punt",
      description: "High, controlled kicks for field position",
      icon: ArrowUp,
      color: "bg-secondary/10 border-secondary/30 text-secondary",
    },
    {
      type: "kickoff",
      label: "Kickoff",
      description: "Power kicks to start play",
      icon: Zap,
      color: "bg-accent/10 border-accent/30 text-accent",
    },
  ];

  const handleContinue = (withVideo: boolean) => {
    if (selectedType) {
      onSelect(selectedType, withVideo);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Select Kick Type</CardTitle>
          <CardDescription>
            Choose the type of kick you'll be practicing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Kick Type Selection */}
          <div className="space-y-3">
            {kickTypes.map(
              ({ type, label, description, icon: Icon, color }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 transition-all text-left",
                    selectedType === type
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        color,
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">
                        {label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {description}
                      </div>
                    </div>
                    {selectedType === type && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </button>
              ),
            )}
          </div>

          {/* Action Buttons */}
          {selectedType && (
            <div className="space-y-3 pt-4">
              <Button
                onClick={() => handleContinue(true)}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Record with Video
              </Button>
              <Button
                onClick={() => handleContinue(false)}
                size="lg"
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary/10 font-semibold"
              >
                Record without Video
              </Button>
            </div>
          )}

          <Button onClick={onCancel} variant="ghost" className="w-full mt-4">
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
