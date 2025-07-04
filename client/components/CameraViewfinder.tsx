import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, VideoOff, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraViewfinderProps {
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
}

export default function CameraViewfinder({
  isRecording,
  onRecordingChange,
}: CameraViewfinderProps) {
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Request camera permission and start preview
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Use back camera on mobile
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (error) {
        console.error("Camera access denied or not available:", error);
        setHasPermission(false);
      }
    };

    startCamera();

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleVideoRecording = () => {
    setIsVideoRecording(!isVideoRecording);
    // In a real implementation, this would start/stop video recording
    // For now, it just toggles the state
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Camera</h3>
          <div className="flex items-center space-x-2">
            {isVideoRecording && (
              <div className="flex items-center space-x-1">
                <Circle className="w-3 h-3 fill-destructive text-destructive animate-pulse" />
                <span className="text-xs text-destructive font-medium">
                  REC
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Simulated Mobile Phone Viewfinder */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
          {/* Simulated camera viewfinder with crosshairs and overlay */}
          <div className="w-full h-full relative bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            {/* Grid overlay */}
            <div className="absolute inset-0">
              <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
                <defs>
                  <pattern
                    id="grid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-8 h-8 border-2 border-white/50 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white/80 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Corner frame indicators */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/60"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/60"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/60"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/60"></div>

            {/* Simulated subject/person outline */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-24 border-2 border-dashed border-white/30 rounded-t-full"></div>
            </div>
          </div>

          {/* Recording indicator overlay */}
          {isVideoRecording && (
            <div className="absolute top-4 left-4 bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full text-xs font-medium">
              Recording Video
            </div>
          )}
        </div>

        {/* Camera Controls */}
        <div className="mt-4 flex justify-center space-x-3">
          <Button
            onClick={handleVideoRecording}
            disabled={!hasPermission || !isRecording}
            variant={isVideoRecording ? "destructive" : "default"}
            size="sm"
            className={cn(
              "px-6",
              !isRecording && "opacity-50 cursor-not-allowed",
            )}
          >
            {isVideoRecording ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop Video
              </>
            ) : (
              <>
                <Video className="w-4 h-4 mr-2" />
                Start Video
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-2">
          {!isRecording
            ? "Start sensor recording to enable video capture"
            : isVideoRecording
              ? "Recording video and sensor data"
              : "Video preview active"}
        </p>
      </CardContent>
    </Card>
  );
}
