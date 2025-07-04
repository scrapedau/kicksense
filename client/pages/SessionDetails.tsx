import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Video,
  Play,
  Pause,
  BarChart3,
  TrendingUp,
  Target,
  ArrowUp,
  Zap,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatSpeed, formatDistance } from "@/lib/units";

interface SessionData {
  id: number;
  date: string;
  time: string;
  duration: string;
  kicks: number;
  peakSpeed: number;
  footSpeed: number;
  curvedLinearROM: number;
  angularROM: number;
  kickType: "field-goal" | "punt" | "kickoff";
  hasVideo: boolean;
  videoSize?: string;
}

export default function SessionDetails() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // App operates in Imperial units only

  // Mock session data - in real app, this would be fetched based on sessionId
  const session: SessionData = {
    id: Number(sessionId) || 1,
    date: "Dec 15, 2024",
    time: "2:30 PM",
    duration: "32 min",
    kicks: 45,
    peakSpeed: 72,
    footSpeed: 68,
    curvedLinearROM: 18.5,
    angularROM: 145,
    kickType: "field-goal",
    hasVideo: true,
    videoSize: "1.2 GB",
  };

  // Mock data for demonstration
  const peakFootSpeedData = [
    { timestamp: "00:02", value: 68, rom: 18.2, angle: 142 },
    { timestamp: "00:15", value: 71, rom: 19.1, angle: 145 },
    {
      timestamp: "00:28",
      value: session.peakSpeed,
      rom: session.curvedLinearROM,
      angle: session.angularROM,
    },
    { timestamp: "00:45", value: 67, rom: 17.8, angle: 139 },
    { timestamp: "01:02", value: 69, rom: 18.7, angle: 143 },
  ];

  const rawDataSample = [
    { time: "00:00.000", ax: 0.2, ay: -0.1, az: 9.8, gx: 12, gy: -5, gz: 8 },
    { time: "00:00.100", ax: 0.3, ay: -0.2, az: 9.9, gx: 15, gy: -8, gz: 12 },
    { time: "00:00.200", ax: 1.2, ay: 2.1, az: 11.2, gx: 45, gy: 32, gz: -18 },
    { time: "00:00.300", ax: 4.5, ay: 8.2, az: 15.6, gx: 156, gy: 89, gz: -65 },
    {
      time: "00:00.400",
      ax: 12.8,
      ay: 15.4,
      az: 22.1,
      gx: 287,
      gy: 145,
      gz: -123,
    },
  ];

  const getKickTypeIcon = () => {
    switch (session.kickType) {
      case "field-goal":
        return <Target className="w-4 h-4" />;
      case "punt":
        return <ArrowUp className="w-4 h-4" />;
      case "kickoff":
        return <Zap className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getKickTypeColor = () => {
    switch (session.kickType) {
      case "field-goal":
        return "bg-primary/10 text-primary border-primary/30";
      case "punt":
        return "bg-secondary/10 text-secondary border-secondary/30";
      case "kickoff":
        return "bg-accent/10 text-accent border-accent/30";
      default:
        return "bg-primary/10 text-primary border-primary/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 pt-8 pb-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/history")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Session Details
              </h1>
              <p className="text-muted-foreground">
                {session.date} • {session.time}
              </p>
            </div>
          </div>
          <Badge variant="outline" className={getKickTypeColor()}>
            {getKickTypeIcon()}
            <span className="ml-1">
              {session.kickType.charAt(0).toUpperCase() +
                session.kickType.slice(1).replace("-", " ")}
            </span>
          </Badge>
        </div>

        {/* Content */}
        <div className="pb-20">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {session.hasVideo && (
                <TabsTrigger value="video">Video</TabsTrigger>
              )}
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="visualizer">3D Visualizer</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {session.kicks}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Kicks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {session.duration}
                  </p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {session.peakSpeed.toFixed(1)} mph
                  </p>
                  <p className="text-sm text-muted-foreground">Peak Speed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {session.curvedLinearROM.toFixed(1)} in
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Max Linear ROM
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Average Foot Speed:
                    </span>
                    <span className="font-medium">
                      {session.footSpeed.toFixed(1)} mph
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Peak Foot Speed:
                    </span>
                    <span className="font-medium">
                      {session.peakSpeed.toFixed(1)} mph
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max Linear ROM:
                    </span>
                    <span className="font-medium">
                      {session.curvedLinearROM.toFixed(1)} in
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max Angular ROM:
                    </span>
                    <span className="font-medium">{session.angularROM}°</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {session.hasVideo && (
              <TabsContent value="video" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      Session Video
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                      <div className="text-center">
                        <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Video Preview</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {session.videoSize}
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="absolute"
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="peaks" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Peak Performance Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {peakFootSpeedData.map((peak, index) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-sm font-mono text-muted-foreground">
                              {peak.timestamp}
                            </div>
                            <div className="text-sm font-medium">
                              Kick #{index + 1}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-muted-foreground mb-1">
                              Speed
                            </div>
                            <div className="font-medium text-base">
                              {peak.value.toFixed(1)} mph
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground mb-1">
                              ROM
                            </div>
                            <div className="font-medium text-base">
                              {peak.rom.toFixed(1)} in
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground mb-1">
                              Angle
                            </div>
                            <div className="font-medium text-base">
                              {peak.angle}°
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="raw" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Raw Sensor Data
                  </CardTitle>
                  <CardDescription>
                    Acceleration (m/s²) and Gyroscope (°/s) readings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Time</th>
                          <th className="text-left p-2">Acc X</th>
                          <th className="text-left p-2">Acc Y</th>
                          <th className="text-left p-2">Acc Z</th>
                          <th className="text-left p-2">Gyro X</th>
                          <th className="text-left p-2">Gyro Y</th>
                          <th className="text-left p-2">Gyro Z</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rawDataSample.map((row, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-mono">{row.time}</td>
                            <td className="p-2">{row.ax.toFixed(1)}</td>
                            <td className="p-2">{row.ay.toFixed(1)}</td>
                            <td className="p-2">{row.az.toFixed(1)}</td>
                            <td className="p-2">{row.gx}</td>
                            <td className="p-2">{row.gy}</td>
                            <td className="p-2">{row.gz}</td>
                          </tr>
                        ))}
                        <tr>
                          <td
                            colSpan={7}
                            className="p-4 text-center text-muted-foreground"
                          >
                            ... {session.kicks * 50} more data points
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
