import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chart } from "@/components/ui/chart";
import { Play, Pause, Square, Zap, Gauge, Camera, Video } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import CameraViewfinder from "@/components/CameraViewfinder";
import RawDataDisplay from "@/components/RawDataDisplay";
import { cn } from "@/lib/utils";

interface SensorData {
  timestamp: number;
  acceleration: { x: number; y: number; z: number };
  gyroscope: { x: number; y: number; z: number };
  footSpeed: number;
  ballSpeed?: number;
  contactAngle?: number;
}

export default function LiveData() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isVideoMode = searchParams.get("video") === "true";

  const [isRecording, setIsRecording] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [currentFootSpeed, setCurrentFootSpeed] = useState(0);
  const [peakFootSpeed, setPeakFootSpeed] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [accelerationPeaks, setAccelerationPeaks] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  // Simulate real-time sensor data
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      const timestamp = Date.now();
      const newData: SensorData = {
        timestamp,
        acceleration: {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20,
          z: 9.8 + (Math.random() - 0.5) * 5,
        },
        gyroscope: {
          x: (Math.random() - 0.5) * 500,
          y: (Math.random() - 0.5) * 500,
          z: (Math.random() - 0.5) * 500,
        },
        footSpeed: Math.random() * 80,
      };

      setSensorData((prev) => [...prev.slice(-49), newData]);
      setCurrentFootSpeed(newData.footSpeed);
      setPeakFootSpeed((prev) => Math.max(prev, newData.footSpeed));

      // Update acceleration peaks
      setAccelerationPeaks((prev) => ({
        x: Math.max(prev.x, Math.abs(newData.acceleration.x)),
        y: Math.max(prev.y, Math.abs(newData.acceleration.y)),
        z: Math.max(prev.z, Math.abs(newData.acceleration.z)),
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Session timer
  useEffect(() => {
    if (!isRecording) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRecording]);

  const handleStartStop = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Reset on new session
      setSensorData([]);
      setCurrentFootSpeed(0);
      setPeakFootSpeed(0);
      setSessionDuration(0);
      setAccelerationPeaks({ x: 0, y: 0, z: 0 });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const accelerationData = sensorData.map((d) => ({
    timestamp: d.timestamp,
    x: d.acceleration.x,
    y: d.acceleration.y,
    z: d.acceleration.z,
  }));

  const gyroscopeData = sensorData.map((d) => ({
    timestamp: d.timestamp,
    x: d.gyroscope.x,
    y: d.gyroscope.y,
    z: d.gyroscope.z,
  }));

  return (
    <div
      className={cn(
        "min-h-screen",
        isVideoMode ? "bg-black" : "bg-background pb-20",
      )}
    >
      {!isVideoMode && (
        <div className="px-6 pt-8 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Live Data</h1>
              <p className="text-muted-foreground flex items-center">
                {kickType.charAt(0).toUpperCase() +
                  kickType.slice(1).replace("-", " ")}{" "}
                Recording
              </p>
            </div>
            <Badge
              variant={isRecording ? "default" : "secondary"}
              className={
                isRecording
                  ? "bg-destructive text-destructive-foreground animate-pulse"
                  : ""
              }
            >
              {isRecording ? "Recording" : "Stopped"}
            </Badge>
          </div>
        </div>
      )}

      {/* Mobile Camera Layout for Video Mode */}
      {isVideoMode ? (
        <div className="fixed inset-0 flex flex-col bg-black">
          {/* Full-Bleed Camera Half - Top */}
          <div className="h-1/2 relative">
            <CameraViewfinder
              isRecording={isRecording}
              onRecordingChange={setIsRecording}
            />
          </div>

          {/* Data Half - Bottom */}
          <div className="h-1/2 bg-background flex flex-col">
            <RawDataDisplay
              currentFootSpeed={currentFootSpeed}
              peakFootSpeed={peakFootSpeed}
              accelerationPeaks={accelerationPeaks}
              sessionDuration={sessionDuration}
              isRecording={isRecording}
              onStartStop={handleStartStop}
            />
          </div>
        </div>
      ) : (
        /* Full Screen Layout for Sensor-Only Mode */
        <div>
          {/* Recording Controls */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handleStartStop}
                    size="lg"
                    variant={isRecording ? "destructive" : "default"}
                    className="w-24"
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-4 h-4 mr-2" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-2xl font-mono font-bold text-foreground">
                      {formatTime(sessionDuration)}
                    </p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-primary/10 border-primary/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      {currentFootSpeed.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Current Speed (mph)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/10 border-secondary/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Gauge className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      {peakFootSpeed.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Peak Speed (mph)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Acceleration Data</CardTitle>
                <CardDescription>
                  Real-time 3-axis acceleration (m/s²)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Chart
                  data={accelerationData}
                  title=""
                  type="acceleration"
                  className="w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Gyroscope Data</CardTitle>
                <CardDescription>
                  Real-time 3-axis rotation (°/s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Chart
                  data={gyroscopeData}
                  title=""
                  type="gyroscope"
                  className="w-full"
                />
              </CardContent>
            </Card>
          </div>

          {/* Swing Path Preview */}
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Swing Path Preview</CardTitle>
              <CardDescription>Foot movement trajectory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  {isRecording
                    ? "Tracking movement..."
                    : "Start recording to see swing path"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!isVideoMode && <BottomNavigation />}
    </div>
  );
}
