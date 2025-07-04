import { useState, useEffect, useRef } from "react";
import { Zap, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccelerationEvent {
  id: string;
  timestamp: number;
  x: number;
  y: number;
  z: number;
  magnitude: number;
}

interface RawDataDisplayProps {
  currentFootSpeed: number;
  peakFootSpeed: number;
  accelerationPeaks: {
    x: number;
    y: number;
    z: number;
  };
  sessionDuration: number;
  isRecording: boolean;
  onStartStop: () => void;
}

export default function RawDataDisplay({
  currentFootSpeed,
  peakFootSpeed,
  accelerationPeaks,
  sessionDuration,
  isRecording,
  onStartStop,
}: RawDataDisplayProps) {
  const [accelerationEvents, setAccelerationEvents] = useState<AccelerationEvent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate new acceleration events when recording
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      // Simulate acceleration spike detection
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40; 
      const z = 9.8 + (Math.random() - 0.5) * 20;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      // Only add significant acceleration events (threshold)
      if (magnitude > 15) {
        const newEvent: AccelerationEvent = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          x: x,
          y: y,
          z: z,
          magnitude: magnitude,
        };

        setAccelerationEvents(prev => {
          const updated = [newEvent, ...prev];
          // Keep only last 50 events for performance
          return updated.slice(0, 50);
        });
      }
    }, 500 + Math.random() * 1000); // Random intervals

    return () => clearInterval(interval);
  }, [isRecording]);

  // Auto-scroll to top when new events are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [accelerationEvents]);

  // Clear events when stopping
  useEffect(() => {
    if (!isRecording) {
      setAccelerationEvents([]);
    }
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour12: false, 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 1 
    });
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Speed Metrics */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-center flex-1">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Current</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {currentFootSpeed.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">mph</div>
        </div>

        <div className="text-center flex-1">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Gauge className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">Peak</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {peakFootSpeed.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">mph</div>
        </div>

        <div className="text-center flex-1">
          <div className="text-sm text-muted-foreground mb-1">Duration</div>
          <div className="text-lg font-mono font-bold text-foreground">
            {formatTime(sessionDuration)}
          </div>
        </div>
      </div>

      {/* Acceleration Events Header */}
      <div className="border-t border-border pt-3 mb-3">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Live Acceleration Events
        </h3>
        <div className="text-xs text-muted-foreground mb-2">
          Peak events (magnitude > 15 m/s²)
        </div>
      </div>

      {/* Scrolling Events List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 relative"
        style={{
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
        }}
      >
        {accelerationEvents.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            {isRecording ? "Waiting for acceleration events..." : "Start recording to see acceleration data"}
          </div>
        ) : (
          accelerationEvents.map((event, index) => (
            <div
              key={event.id}
              className={cn(
                "p-3 bg-muted/30 rounded-lg border border-border/50 transition-all duration-500",
                index === 0 && "bg-primary/5 border-primary/20"
              )}
              style={{
                opacity: Math.max(0.3, 1 - (index * 0.1))
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs text-muted-foreground">
                  {formatTimestamp(event.timestamp)}
                </div>
                <div className="text-sm font-bold text-foreground">
                  {event.magnitude.toFixed(1)} m/s²
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-primary font-medium">X</div>
                  <div className="font-mono">{event.x.toFixed(1)}</div>
                </div>
                <div className="text-center">
                  <div className="text-secondary font-medium">Y</div>
                  <div className="font-mono">{event.y.toFixed(1)}</div>
                </div>
                <div className="text-center">
                  <div className="text-accent font-medium">Z</div>
                  <div className="font-mono">{event.z.toFixed(1)}</div>
                </div>
              </div>
            </div>
          ))
        )}
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
    </div>
  );
}