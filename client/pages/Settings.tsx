import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Bluetooth,
  Gauge,
  Eye,
  Wifi,
  Settings as SettingsIcon,
} from "lucide-react";
import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { cn } from "@/lib/utils";

export default function Settings() {
  const [sensorConnected, setSensorConnected] = useState(true);
  const [unitsMetric, setUnitsMetric] = useState(false);
  const [videoOverlays, setVideoOverlays] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-6 pt-8 pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure your sensor and preferences
          </p>
        </div>

        {/* Sensor Connection */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Bluetooth className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Sensor Connection</CardTitle>
                  <CardDescription>KickSense Pro v2.1</CardDescription>
                </div>
              </div>
              <Badge
                variant={sensorConnected ? "default" : "secondary"}
                className={
                  sensorConnected
                    ? "bg-secondary text-secondary-foreground"
                    : ""
                }
              >
                {sensorConnected ? "Connected" : "Disconnected"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <Button
                variant={sensorConnected ? "destructive" : "default"}
                size="sm"
                onClick={() => setSensorConnected(!sensorConnected)}
              >
                {sensorConnected ? "Disconnect" : "Connect"}
              </Button>
              <Button variant="outline" size="sm">
                <Wifi className="w-4 h-4 mr-2" />
                Pair New Device
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Units & Display */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Gauge className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-base">Units & Display</CardTitle>
                <CardDescription>Customize measurement units</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                Speed Units
              </p>
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setUnitsMetric(false)}
                  className={cn(
                    "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all",
                    !unitsMetric
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  mph
                </button>
                <button
                  onClick={() => setUnitsMetric(true)}
                  className={cn(
                    "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all",
                    unitsMetric
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  km/h
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video & Overlays */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-base">Video & Overlays</CardTitle>
                <CardDescription>Data visualization options</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Data Overlays on Video
                </p>
                <p className="text-xs text-muted-foreground">
                  Show real-time data on video recordings
                </p>
              </div>
              <Switch
                checked={videoOverlays}
                onCheckedChange={setVideoOverlays}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">App Settings</CardTitle>
                <CardDescription>
                  General application preferences
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Export Session Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Calibrate Sensor
            </Button>
            <Button variant="outline" className="w-full justify-start">
              About KickSense
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
