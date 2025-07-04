import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  TrendingUp,
  Target,
  Zap,
  ArrowUp,
  Video,
  VideoOff,
  Share2,
  Download,
  Eye,
  Clock,
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { formatSpeed, formatDistance } from "@/lib/units";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SetData } from "@/types";
import { DataService } from "@/services/dataService";

export default function History() {
  // App operates in Imperial units only
  const navigate = useNavigate();
  const [sets, setSets] = useState<SetData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSets = async () => {
      try {
        const allSets = await DataService.getAllSets();
        setSets(allSets);
      } catch (error) {
        console.error("Failed to load sets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-6 pt-8 pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Set History</h1>
          <p className="text-muted-foreground">
            View and share your recorded training sets
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-primary/10 border-primary/30">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CalendarDays className="w-4 h-4 text-primary" />
              </div>
              <p className="text-lg font-bold text-foreground">{sets.length}</p>
              <p className="text-xs text-muted-foreground">Total Sets</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10 border-secondary/30">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Video className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-lg font-bold text-foreground">
                {sets.filter((s) => s.hasVideo).length}
              </p>
              <p className="text-xs text-muted-foreground">With Video</p>
            </CardContent>
          </Card>

          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <VideoOff className="w-4 h-4 text-accent" />
              </div>
              <p className="text-lg font-bold text-foreground">
                {sets.filter((s) => !s.hasVideo).length}
              </p>
              <p className="text-xs text-muted-foreground">Data Only</p>
            </CardContent>
          </Card>
        </div>

        {/* Set List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Sets</h2>

          {sets.map((set) => (
            <Card key={set.id} className="border border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-foreground">
                        {set.date}
                      </h3>
                      <Badge
                        variant="outline"
                        className={
                          set.kickType === "field-goal"
                            ? "bg-primary/10 text-primary border-primary/30"
                            : set.kickType === "punt"
                              ? "bg-secondary/10 text-secondary border-secondary/30"
                              : "bg-accent/10 text-accent border-accent/30"
                        }
                      >
                        {set.kickType === "field-goal" && (
                          <Target className="w-3 h-3 mr-1" />
                        )}
                        {set.kickType === "punt" && (
                          <ArrowUp className="w-3 h-3 mr-1" />
                        )}
                        {set.kickType === "kickoff" && (
                          <Zap className="w-3 h-3 mr-1" />
                        )}
                        {set.kickType.charAt(0).toUpperCase() +
                          set.kickType.slice(1).replace("-", " ")}
                      </Badge>
                      <Badge
                        variant={set.hasVideo ? "default" : "secondary"}
                        className={
                          set.hasVideo
                            ? "bg-secondary/20 text-secondary border-secondary/30"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {set.hasVideo ? (
                          <>
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </>
                        ) : (
                          <>
                            <VideoOff className="w-3 h-3 mr-1" />
                            Data Only
                          </>
                        )}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {set.time}
                      </span>
                      <span>{set.duration}</span>
                      <span>{set.kicks} kicks</span>
                    </div>

                    <div className="flex items-center mt-2">
                      <Zap className="w-3 h-3 text-primary mr-1" />
                      <span className="text-sm font-medium text-foreground">
                        {set.peakSpeed.toFixed(1)} mph peak
                      </span>
                      {set.hasVideo && set.videoSize && (
                        <>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {set.videoSize}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">
                          Foot Speed:{" "}
                        </span>
                        <span className="font-medium">
                          {set.footSpeed.toFixed(1)} mph
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Linear ROM:{" "}
                        </span>
                        <span className="font-medium">
                          {set.curvedLinearROM.toFixed(1)} in
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Angular ROM:{" "}
                        </span>
                        <span className="font-medium">{set.angularROM}°</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/session/${set.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    {set.hasVideo && (
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 bg-secondary text-secondary-foreground"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Save Video
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
