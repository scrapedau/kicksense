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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function History() {
  // App operates in Imperial units only
  const navigate = useNavigate();

  const sets = [
    {
      id: 1,
      date: "Dec 15, 2024",
      time: "2:30 PM",
      duration: "32 min",
      kicks: 45,
      peakSpeed: 72,
      footSpeed: 68,
      curvedLinearROM: 18.5,
      angularROM: 145,
      kickType: "field-goal" as const,
      hasVideo: true,
      videoSize: "1.2 GB",
    },
    {
      id: 2,
      date: "Dec 12, 2024",
      time: "11:15 AM",
      duration: "28 min",
      kicks: 38,
      peakSpeed: 69,
      footSpeed: 65,
      curvedLinearROM: 22.3,
      angularROM: 162,
      kickType: "punt" as const,
      hasVideo: false,
    },
    {
      id: 3,
      date: "Dec 10, 2024",
      time: "4:45 PM",
      duration: "35 min",
      kicks: 52,
      peakSpeed: 74,
      footSpeed: 71,
      curvedLinearROM: 16.8,
      angularROM: 138,
      kickType: "kickoff" as const,
      hasVideo: true,
      videoSize: "1.8 GB",
    },
    {
      id: 4,
      date: "Dec 8, 2024",
      time: "1:20 PM",
      duration: "22 min",
      kicks: 29,
      peakSpeed: 66,
      footSpeed: 62,
      curvedLinearROM: 20.1,
      angularROM: 152,
      kickType: "field-goal" as const,
      hasVideo: false,
    },
    {
      id: 5,
      date: "Dec 5, 2024",
      time: "3:15 PM",
      duration: "30 min",
      kicks: 41,
      peakSpeed: 70,
      footSpeed: 67,
      curvedLinearROM: 19.7,
      angularROM: 148,
      kickType: "punt" as const,
      hasVideo: true,
      videoSize: "1.5 GB",
    },
  ];

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
              <p className="text-lg font-bold text-foreground">
                {sessions.length}
              </p>
              <p className="text-xs text-muted-foreground">Total Sessions</p>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10 border-secondary/30">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Video className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-lg font-bold text-foreground">
                {sessions.filter((s) => s.hasVideo).length}
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
                {sessions.filter((s) => !s.hasVideo).length}
              </p>
              <p className="text-xs text-muted-foreground">Data Only</p>
            </CardContent>
          </Card>
        </div>

        {/* Session List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Sessions
          </h2>

          {sessions.map((session) => (
            <Card key={session.id} className="border border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-foreground">
                        {session.date}
                      </h3>
                      <Badge
                        variant="outline"
                        className={
                          session.kickType === "field-goal"
                            ? "bg-primary/10 text-primary border-primary/30"
                            : session.kickType === "punt"
                              ? "bg-secondary/10 text-secondary border-secondary/30"
                              : "bg-accent/10 text-accent border-accent/30"
                        }
                      >
                        {session.kickType === "field-goal" && (
                          <Target className="w-3 h-3 mr-1" />
                        )}
                        {session.kickType === "punt" && (
                          <ArrowUp className="w-3 h-3 mr-1" />
                        )}
                        {session.kickType === "kickoff" && (
                          <Zap className="w-3 h-3 mr-1" />
                        )}
                        {session.kickType.charAt(0).toUpperCase() +
                          session.kickType.slice(1).replace("-", " ")}
                      </Badge>
                      <Badge
                        variant={session.hasVideo ? "default" : "secondary"}
                        className={
                          session.hasVideo
                            ? "bg-secondary/20 text-secondary border-secondary/30"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {session.hasVideo ? (
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
                        {session.time}
                      </span>
                      <span>{session.duration}</span>
                      <span>{session.kicks} kicks</span>
                    </div>

                    <div className="flex items-center mt-2">
                      <Zap className="w-3 h-3 text-primary mr-1" />
                      <span className="text-sm font-medium text-foreground">
                        {session.peakSpeed.toFixed(1)} mph peak
                      </span>
                      {session.hasVideo && session.videoSize && (
                        <>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {session.videoSize}
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
                          {session.footSpeed.toFixed(1)} mph
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Linear ROM:{" "}
                        </span>
                        <span className="font-medium">
                          {session.curvedLinearROM.toFixed(1)} in
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Angular ROM:{" "}
                        </span>
                        <span className="font-medium">
                          {session.angularROM}°
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/session/${session.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    {session.hasVideo && (
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
