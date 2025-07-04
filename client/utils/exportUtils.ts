import { SetData } from "../types";

export const downloadCSV = (csvContent: string, filename: string) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generateSetCSV = (set: SetData): string => {
  const headers = [
    "Set ID",
    "Date",
    "Time",
    "Duration",
    "Kicks",
    "Peak Speed (mph)",
    "Foot Speed (mph)",
    "Linear ROM (in)",
    "Angular ROM (°)",
    "Kick Type",
    "Has Video",
    "Video Size",
  ];

  const row = [
    set.id,
    set.date,
    set.time,
    set.duration,
    set.kicks,
    set.peakSpeed,
    set.footSpeed,
    set.curvedLinearROM,
    set.angularROM,
    set.kickType,
    set.hasVideo,
    set.videoSize || "",
  ];

  return [headers.join(","), row.join(",")].join("\n");
};

export const generateAllSetsCSV = (sets: SetData[]): string => {
  const headers = [
    "Set ID",
    "Date",
    "Time",
    "Duration",
    "Kicks",
    "Peak Speed (mph)",
    "Foot Speed (mph)",
    "Linear ROM (in)",
    "Angular ROM (°)",
    "Kick Type",
    "Has Video",
    "Video Size",
  ];

  const rows = sets.map((set) => [
    set.id,
    set.date,
    set.time,
    set.duration,
    set.kicks,
    set.peakSpeed,
    set.footSpeed,
    set.curvedLinearROM,
    set.angularROM,
    set.kickType,
    set.hasVideo,
    set.videoSize || "",
  ]);

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const generateFilename = (
  prefix: string,
  extension: string = "csv",
): string => {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-MM-SS

  return `${prefix}_${dateStr}_${timeStr}.${extension}`;
};
