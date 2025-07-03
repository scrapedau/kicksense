import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useRef } from "react";

interface DataPoint {
  timestamp: number;
  x: number;
  y: number;
  z: number;
}

interface ChartProps extends ComponentProps<"div"> {
  data: DataPoint[];
  title: string;
  type: "acceleration" | "gyroscope";
}

export function Chart({ data, title, type, className, ...props }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (data.length < 2) return;

    const padding = 40;
    const width = rect.width - padding * 2;
    const height = rect.height - padding * 2;

    // Find data range
    const allValues = data.flatMap((d) => [d.x, d.y, d.z]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const range = maxValue - minValue || 1;

    // Draw grid
    ctx.strokeStyle = "hsl(240 6% 20%)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + width, y);
      ctx.stroke();
    }

    // Colors for X, Y, Z axes
    const colors = {
      x: "hsl(210 100% 50%)", // Blue
      y: "hsl(152 76% 41%)", // Green
      z: "hsl(15 100% 55%)", // Orange
    };

    // Draw lines for each axis
    ["x", "y", "z"].forEach((axis) => {
      ctx.strokeStyle = colors[axis as keyof typeof colors];
      ctx.lineWidth = 2;
      ctx.beginPath();

      data.forEach((point, index) => {
        const x = padding + (width / (data.length - 1)) * index;
        const value = point[axis as keyof DataPoint] as number;
        const y = padding + height - ((value - minValue) / range) * height;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    });

    // Draw legend
    const legendItems = [
      { label: "X", color: colors.x },
      { label: "Y", color: colors.y },
      { label: "Z", color: colors.z },
    ];

    ctx.font = "12px system-ui";
    ctx.fillStyle = "hsl(0 0% 98%)";
    legendItems.forEach((item, index) => {
      const x = padding + index * 40;
      const y = padding - 10;

      ctx.fillStyle = item.color;
      ctx.fillRect(x, y - 8, 10, 2);

      ctx.fillStyle = "hsl(0 0% 98%)";
      ctx.fillText(item.label, x + 15, y - 2);
    });
  }, [data]);

  return (
    <div className={cn("relative", className)} {...props}>
      <h3 className="text-sm font-medium text-foreground mb-2">{title}</h3>
      <canvas
        ref={canvasRef}
        className="w-full h-32 bg-muted rounded-lg"
        style={{ width: "100%", height: "128px" }}
      />
    </div>
  );
}
