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
import { SetData, PeakPerformanceData, RawSensorData } from "@/types";
import { DataService } from "@/services/dataService";

export default function SessionDetails() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [set, setSet] = useState<SetData | null>(null);
  const [peakData, setPeakData] = useState<PeakPerformanceData[]>([]);
  const [rawData, setRawData] = useState<RawSensorData[]>([]);
  const [loading, setLoading] = useState(true);
  // App operates in Imperial units only

  useEffect(() => {
    const loadSetData = async () => {
      if (!sessionId) return;

      try {
        const setId = Number(sessionId);
        const [setData, peakPerformanceData, rawSensorData] = await Promise.all(
          [
            DataService.getSetById(setId),
            DataService.getPeakPerformanceData(setId),
            DataService.getRawSensorData(setId),
          ],
        );

        setSet(setData);
        setPeakData(peakPerformanceData);
        setRawData(rawSensorData);
      } catch (error) {
        console.error("Failed to load set data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSetData();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading set details...</p>
        </div>
      </div>
    );
  }

  if (!set) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Set Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The requested set could not be found.
          </p>
          <Button onClick={() => navigate("/history")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to History
          </Button>
        </div>
      </div>
    );
  }

  const getKickTypeIcon = () => {
    switch (set.kickType) {
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
    switch (set.kickType) {
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
                Set Details
              </h1>
              <p className="text-muted-foreground">
                {set.date} • {set.time}
              </p>
            </div>
          </div>
          <Badge variant="outline" className={getKickTypeColor()}>
            {getKickTypeIcon()}
            <span className="ml-1">
              {set.kickType.charAt(0).toUpperCase() +
                set.kickType.slice(1).replace("-", " ")}
            </span>
          </Badge>
        </div>

        {/* Content */}
        <div className="pb-20">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className={`grid w-full ${set.hasVideo ? "grid-cols-4" : "grid-cols-3"}`}
            >
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {set.hasVideo && <TabsTrigger value="video">Video</TabsTrigger>}
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="visualizer">3D</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {set.kicks}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Kicks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {set.duration}
                  </p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {set.peakSpeed.toFixed(1)} mph
                  </p>
                  <p className="text-sm text-muted-foreground">Peak Speed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {set.curvedLinearROM.toFixed(1)} in
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
                      {set.footSpeed.toFixed(1)} mph
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Peak Foot Speed:
                    </span>
                    <span className="font-medium">
                      {set.peakSpeed.toFixed(1)} mph
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max Linear ROM:
                    </span>
                    <span className="font-medium">
                      {set.curvedLinearROM.toFixed(1)} in
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max Angular ROM:
                    </span>
                    <span className="font-medium">{set.angularROM}°</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {set.hasVideo && (
              <TabsContent value="video" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      Set Video
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                      <div className="text-center">
                        <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Video Preview</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {set.videoSize}
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

            <TabsContent value="data" className="mt-6 space-y-6">
              {/* Peak Performance Data Section */}
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

              {/* Raw Sensor Data Section */}
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
                            ... {set.kicks * 50} more data points
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visualizer" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Box className="w-4 h-4 mr-2" />
                    3D Swing Path Visualizer
                  </CardTitle>
                  <CardDescription>
                    Interactive 3D visualization of kick motion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Box className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="font-medium text-foreground mb-2">
                        3D Visualizer Coming Soon
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Interactive 3D swing path visualization will be
                        available here
                      </p>
                    </div>
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
