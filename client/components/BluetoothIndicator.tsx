import { Bluetooth, BluetoothConnected } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface BluetoothIndicatorProps {
  className?: string;
  onConnectionChange?: (isConnected: boolean) => void;
}

export default function BluetoothIndicator({
  className,
  onConnectionChange,
}: BluetoothIndicatorProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Placeholder for BLE integration - ready for React Native/Expo BLE module
  const connectToDevice = async () => {
    if (isConnected) {
      // Disconnect logic placeholder
      setIsConnected(false);
      onConnectionChange?.(false);
      return;
    }

    setIsScanning(true);

    // Simulate connection process - replace with actual BLE logic
    setTimeout(() => {
      setIsConnected(true);
      setIsScanning(false);
      onConnectionChange?.(true);
    }, 2000);
  };

  const getStatusText = () => {
    if (isScanning) return "Connecting...";
    return isConnected ? "Connected" : "Disconnected";
  };

  const getStatusColor = () => {
    if (isScanning) return "bg-accent/20 text-accent border-accent/30";
    return isConnected
      ? "bg-secondary/20 text-secondary border-secondary/30"
      : "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <button
        onClick={connectToDevice}
        disabled={isScanning}
        className={cn(
          "p-2 rounded-lg transition-colors",
          isConnected
            ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
            : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground",
          isScanning && "animate-pulse cursor-not-allowed",
        )}
        aria-label={isConnected ? "Disconnect Bluetooth" : "Connect Bluetooth"}
      >
        {isConnected ? (
          <BluetoothConnected className="w-5 h-5" />
        ) : (
          <Bluetooth className="w-5 h-5" />
        )}
      </button>

      <div className="flex flex-col">
        <Badge
          variant="outline"
          className={cn("text-xs transition-colors", getStatusColor())}
        >
          {isScanning && (
            <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse" />
          )}
          {getStatusText()}
        </Badge>
        <span className="text-xs text-muted-foreground mt-1">MetaMotionRL</span>
      </div>
    </div>
  );
}
