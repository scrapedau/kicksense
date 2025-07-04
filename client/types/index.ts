export interface SetData {
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

export interface PeakPerformanceData {
  timestamp: string;
  value: number;
  rom: number;
  angle: number;
}

export interface RawSensorData {
  time: string;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
}

export interface PersonalBest {
  footSpeed: number;
  linearROM: number;
  angularROM: number;
}

export interface PersonalBests {
  "field-goal": PersonalBest;
  punt: PersonalBest;
  kickoff: PersonalBest;
}

export interface AccelerationEvent {
  id: number;
  timestamp: number;
  acceleration: number;
}

export interface AccelerationPeaks {
  x: number;
  y: number;
  z: number;
}

export type KickType = "field-goal" | "punt" | "kickoff";
