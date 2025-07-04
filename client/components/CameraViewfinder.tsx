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

        {/* Camera Preview */}
        <div className="flex-1 bg-muted rounded-lg overflow-hidden relative">
          {hasPermission ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <VideoOff className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Camera access required
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Please allow camera permissions
                </p>
              </div>
            </div>
          )}

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
