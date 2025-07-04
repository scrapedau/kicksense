import {
  SetData,
  PeakPerformanceData,
  RawSensorData,
  PersonalBests,
} from "../types";

export const mockSets: SetData[] = [
  {
    id: 1,
    date: "Dec 15, 2024",
    time: "2:30 PM",
    duration: "32 min",
    kicks: 45,
    peakSpeed: 72.1,
    footSpeed: 68.5,
    curvedLinearROM: 18.5,
    angularROM: 145,
    kickType: "field-goal",
    hasVideo: true,
    videoSize: "1.2 GB",
  },
  {
    id: 2,
    date: "Dec 12, 2024",
    time: "11:15 AM",
    duration: "28 min",
    kicks: 38,
    peakSpeed: 69.8,
    footSpeed: 65.2,
    curvedLinearROM: 22.3,
    angularROM: 162,
    kickType: "punt",
    hasVideo: false,
  },
  {
    id: 3,
    date: "Dec 10, 2024",
    time: "4:45 PM",
    duration: "35 min",
    kicks: 52,
    peakSpeed: 74.3,
    footSpeed: 71.1,
    curvedLinearROM: 16.8,
    angularROM: 138,
    kickType: "kickoff",
    hasVideo: true,
    videoSize: "1.8 GB",
  },
  {
    id: 4,
    date: "Dec 8, 2024",
    time: "1:20 PM",
    duration: "22 min",
    kicks: 29,
    peakSpeed: 66.4,
    footSpeed: 62.8,
    curvedLinearROM: 19.7,
    angularROM: 151,
    kickType: "field-goal",
    hasVideo: true,
    videoSize: "0.9 GB",
  },
  {
    id: 5,
    date: "Dec 6, 2024",
    time: "3:00 PM",
    duration: "41 min",
    kicks: 58,
    peakSpeed: 71.9,
    footSpeed: 67.3,
    curvedLinearROM: 21.1,
    angularROM: 156,
    kickType: "punt",
    hasVideo: false,
  },
];

export const mockPersonalBests: PersonalBests = {
  "field-goal": {
    footSpeed: 78.2,
    linearROM: 22.4,
    angularROM: 156,
  },
  punt: {
    footSpeed: 82.1,
    linearROM: 24.8,
    angularROM: 162,
  },
  kickoff: {
    footSpeed: 85.3,
    linearROM: 26.1,
    angularROM: 168,
  },
};

export const mockPeakPerformanceData: Record<number, PeakPerformanceData[]> = {
  1: [
    { timestamp: "00:02", value: 68.2, rom: 18.2, angle: 142 },
    { timestamp: "00:15", value: 71.1, rom: 19.1, angle: 145 },
    { timestamp: "00:28", value: 72.1, rom: 18.5, angle: 145 },
    { timestamp: "00:45", value: 67.8, rom: 17.8, angle: 139 },
    { timestamp: "01:02", value: 69.4, rom: 18.7, angle: 143 },
  ],
  2: [
    { timestamp: "00:03", value: 65.1, rom: 21.8, angle: 159 },
    { timestamp: "00:18", value: 69.8, rom: 22.3, angle: 162 },
    { timestamp: "00:33", value: 67.2, rom: 20.9, angle: 158 },
  ],
  3: [
    { timestamp: "00:05", value: 70.8, rom: 16.2, angle: 135 },
    { timestamp: "00:22", value: 74.3, rom: 16.8, angle: 138 },
    { timestamp: "00:39", value: 72.1, rom: 15.9, angle: 134 },
    { timestamp: "00:56", value: 71.5, rom: 16.5, angle: 137 },
  ],
  4: [
    { timestamp: "00:01", value: 64.2, rom: 19.2, angle: 148 },
    { timestamp: "00:12", value: 66.4, rom: 19.7, angle: 151 },
    { timestamp: "00:23", value: 65.8, rom: 19.4, angle: 149 },
  ],
  5: [
    { timestamp: "00:04", value: 66.8, rom: 20.5, angle: 153 },
    { timestamp: "00:21", value: 71.9, rom: 21.1, angle: 156 },
    { timestamp: "00:38", value: 69.3, rom: 20.8, angle: 154 },
    { timestamp: "00:55", value: 70.1, rom: 21.0, angle: 155 },
  ],
};

export const mockRawSensorData: Record<number, RawSensorData[]> = {
  1: [
    { time: "00:00.000", ax: 0.2, ay: -0.1, az: 9.8, gx: 12, gy: -5, gz: 8 },
    { time: "00:00.100", ax: 0.3, ay: -0.2, az: 9.9, gx: 15, gy: -8, gz: 12 },
    { time: "00:00.200", ax: 1.2, ay: 2.1, az: 11.2, gx: 45, gy: 32, gz: -18 },
    { time: "00:00.300", ax: 4.5, ay: 8.2, az: 15.6, gx: 156, gy: 89, gz: -65 },
    {
      time: "00:00.400",
      ax: 12.8,
      ay: 15.4,
      az: 22.1,
      gx: 287,
      gy: 145,
      gz: -123,
    },
    {
      time: "00:00.500",
      ax: 8.1,
      ay: 11.2,
      az: 18.7,
      gx: 198,
      gy: 112,
      gz: -89,
    },
    { time: "00:00.600", ax: 3.2, ay: 5.8, az: 13.4, gx: 89, gy: 67, gz: -45 },
    { time: "00:00.700", ax: 0.8, ay: 1.2, az: 10.1, gx: 23, gy: 12, gz: -8 },
  ],
  2: [
    { time: "00:00.000", ax: 0.1, ay: -0.3, az: 9.7, gx: 8, gy: -12, gz: 15 },
    { time: "00:00.100", ax: 0.5, ay: -0.1, az: 9.9, gx: 18, gy: -5, gz: 22 },
    { time: "00:00.200", ax: 2.1, ay: 3.4, az: 12.1, gx: 67, gy: 45, gz: -28 },
    {
      time: "00:00.300",
      ax: 6.8,
      ay: 9.1,
      az: 16.2,
      gx: 189,
      gy: 112,
      gz: -78,
    },
    {
      time: "00:00.400",
      ax: 14.2,
      ay: 18.7,
      az: 24.3,
      gx: 312,
      gy: 189,
      gz: -145,
    },
  ],
  3: [
    { time: "00:00.000", ax: 0.3, ay: 0.1, az: 9.8, gx: 15, gy: 8, gz: -12 },
    { time: "00:00.100", ax: 0.7, ay: 0.4, az: 10.1, gx: 28, gy: 18, gz: -15 },
    { time: "00:00.200", ax: 3.2, ay: 4.1, az: 13.8, gx: 89, gy: 67, gz: -34 },
    {
      time: "00:00.300",
      ax: 8.9,
      ay: 12.4,
      az: 19.7,
      gx: 234,
      gy: 156,
      gz: -89,
    },
    {
      time: "00:00.400",
      ax: 16.8,
      ay: 21.3,
      az: 28.1,
      gx: 398,
      gy: 234,
      gz: -167,
    },
  ],
  4: [
    { time: "00:00.000", ax: 0.1, ay: -0.2, az: 9.7, gx: 5, gy: -8, gz: 12 },
    { time: "00:00.100", ax: 0.4, ay: -0.1, az: 9.8, gx: 12, gy: -3, gz: 18 },
    { time: "00:00.200", ax: 1.8, ay: 2.9, az: 11.8, gx: 56, gy: 38, gz: -23 },
    { time: "00:00.300", ax: 5.2, ay: 7.8, az: 14.9, gx: 145, gy: 89, gz: -67 },
    {
      time: "00:00.400",
      ax: 11.3,
      ay: 14.6,
      az: 20.8,
      gx: 267,
      gy: 134,
      gz: -112,
    },
  ],
  5: [
    { time: "00:00.000", ax: 0.2, ay: 0.0, az: 9.8, gx: 10, gy: 2, gz: -5 },
    { time: "00:00.100", ax: 0.6, ay: 0.3, az: 10.0, gx: 22, gy: 12, gz: -8 },
    { time: "00:00.200", ax: 2.8, ay: 3.7, az: 12.9, gx: 78, gy: 56, gz: -29 },
    {
      time: "00:00.300",
      ax: 7.4,
      ay: 10.2,
      az: 17.8,
      gx: 198,
      gy: 123,
      gz: -78,
    },
    {
      time: "00:00.400",
      ax: 15.1,
      ay: 19.8,
      az: 26.2,
      gx: 356,
      gy: 198,
      gz: -156,
    },
  ],
};

// Recent sets for home screen (last 3)
export const getRecentSets = () => mockSets.slice(0, 3);

// Calculate personal bests from all sets
export const calculatePersonalBests = (): PersonalBests => {
  const bests: PersonalBests = {
    "field-goal": { footSpeed: 0, linearROM: 0, angularROM: 0 },
    punt: { footSpeed: 0, linearROM: 0, angularROM: 0 },
    kickoff: { footSpeed: 0, linearROM: 0, angularROM: 0 },
  };

  mockSets.forEach((set) => {
    const kickType = set.kickType;
    bests[kickType].footSpeed = Math.max(
      bests[kickType].footSpeed,
      set.peakSpeed,
    );
    bests[kickType].linearROM = Math.max(
      bests[kickType].linearROM,
      set.curvedLinearROM,
    );
    bests[kickType].angularROM = Math.max(
      bests[kickType].angularROM,
      set.angularROM,
    );
  });

  return bests;
};
