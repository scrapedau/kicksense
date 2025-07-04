import { Card, CardContent } from "@/components/ui/card";
import { Zap, Gauge, Activity } from "lucide-react";

interface CompactDataDisplayProps {
  currentFootSpeed: number;
  peakFootSpeed: number;
  accelerationPeaks: {
    x: number;
    y: number;
    z: number;
  };
  sessionDuration: number;
  isRecording: boolean;
}

export default function CompactDataDisplay({
  currentFootSpeed,
  peakFootSpeed,
  accelerationPeaks,
  sessionDuration,
  isRecording,
}: CompactDataDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="bg-muted/50">
      <CardContent className="p-4">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Raw Data</span>
          </div>
          <div className="text-sm font-mono">{formatTime(sessionDuration)}</div>
        </div>

        {/* Main Metrics Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-xs text-muted-foreground">Current</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {currentFootSpeed.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">mph</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Gauge className="w-3 h-3 text-secondary" />
              <span className="text-xs text-muted-foreground">Peak</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {peakFootSpeed.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">mph</div>
          </div>
        </div>

        {/* Acceleration Peaks */}
        <div className="border-t border-border pt-3">
          <div className="text-xs text-muted-foreground mb-2">
            Acceleration Peaks (m/s²)
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-xs font-medium text-primary">X</div>
              <div className="text-lg font-bold">
                {accelerationPeaks.x.toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-secondary">Y</div>
              <div className="text-lg font-bold">
                {accelerationPeaks.y.toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-accent">Z</div>
              <div className="text-lg font-bold">
                {accelerationPeaks.z.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="border-t border-border pt-3 mt-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isRecording
                    ? "bg-destructive animate-pulse"
                    : "bg-muted-foreground"
                }`}
              />
              <span className="text-muted-foreground">
                {isRecording ? "Recording" : "Standby"}
              </span>
            </div>
            <div className="text-muted-foreground">MetaMotionRL</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
