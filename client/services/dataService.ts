import {
  SetData,
  PeakPerformanceData,
  RawSensorData,
  PersonalBests,
  KickType,
} from "../types";
import {
  mockSets,
  mockPersonalBests,
  mockPeakPerformanceData,
  mockRawSensorData,
  getRecentSets,
  calculatePersonalBests,
} from "../data/mockData";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class DataService {
  // Get all sets
  static async getAllSets(): Promise<SetData[]> {
    await delay(100); // Simulate API call
    return [...mockSets]; // Return copy to prevent mutations
  }

  // Get sets by kick type
  static async getSetsByKickType(kickType: KickType): Promise<SetData[]> {
    await delay(100);
    return mockSets.filter((set) => set.kickType === kickType);
  }

  // Get sets with video
  static async getSetsWithVideo(): Promise<SetData[]> {
    await delay(100);
    return mockSets.filter((set) => set.hasVideo);
  }

  // Get sets without video
  static async getSetsWithoutVideo(): Promise<SetData[]> {
    await delay(100);
    return mockSets.filter((set) => !set.hasVideo);
  }

  // Get single set by ID
  static async getSetById(id: number): Promise<SetData | null> {
    await delay(100);
    return mockSets.find((set) => set.id === id) || null;
  }

  // Get recent sets for home screen
  static async getRecentSets(): Promise<SetData[]> {
    await delay(100);
    return getRecentSets();
  }

  // Get personal bests
  static async getPersonalBests(): Promise<PersonalBests> {
    await delay(100);
    // Use calculated bests or fallback to mock data
    return calculatePersonalBests();
  }

  // Get peak performance data for a set
  static async getPeakPerformanceData(
    setId: number,
  ): Promise<PeakPerformanceData[]> {
    await delay(100);
    return mockPeakPerformanceData[setId] || [];
  }

  // Get raw sensor data for a set
  static async getRawSensorData(setId: number): Promise<RawSensorData[]> {
    await delay(100);
    return mockRawSensorData[setId] || [];
  }

  // Get statistics
  static async getStatistics() {
    await delay(100);
    const allSets = mockSets;
    return {
      totalSets: allSets.length,
      totalKicks: allSets.reduce((sum, set) => sum + set.kicks, 0),
      totalDuration: allSets.reduce((sum, set) => {
        const minutes = parseInt(set.duration.split(" ")[0]);
        return sum + minutes;
      }, 0),
      setsWithVideo: allSets.filter((set) => set.hasVideo).length,
      setsWithoutVideo: allSets.filter((set) => !set.hasVideo).length,
      averageKicksPerSet:
        Math.round(
          (allSets.reduce((sum, set) => sum + set.kicks, 0) / allSets.length) *
            10,
        ) / 10,
      highestPeakSpeed: Math.max(...allSets.map((set) => set.peakSpeed)),
    };
  }

  // Search sets
  static async searchSets(query: string): Promise<SetData[]> {
    await delay(100);
    const lowercaseQuery = query.toLowerCase();
    return mockSets.filter(
      (set) =>
        set.date.toLowerCase().includes(lowercaseQuery) ||
        set.kickType.toLowerCase().includes(lowercaseQuery) ||
        set.duration.toLowerCase().includes(lowercaseQuery),
    );
  }

  // Get sets by date range
  static async getSetsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<SetData[]> {
    await delay(100);
    // Simple date comparison - in real app would use proper date parsing
    return mockSets.filter((set) => {
      const setDate = new Date(set.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return setDate >= start && setDate <= end;
    });
  }

  // Add new set (for when recording is finished)
  static async addSet(setData: Omit<SetData, "id">): Promise<SetData> {
    await delay(200);
    const newSet: SetData = {
      ...setData,
      id: Math.max(...mockSets.map((s) => s.id)) + 1,
    };
    mockSets.unshift(newSet); // Add to beginning
    return newSet;
  }

  // Delete set
  static async deleteSet(id: number): Promise<boolean> {
    await delay(100);
    const index = mockSets.findIndex((set) => set.id === id);
    if (index > -1) {
      mockSets.splice(index, 1);
      return true;
    }
    return false;
  }

  // Export data (simulate)
  static async exportSetData(setId: number): Promise<string> {
    await delay(500);
    const set = await this.getSetById(setId);
    if (!set) throw new Error("Set not found");

    // Simulate CSV export
    const csvData = `Set ID,Date,Time,Duration,Kicks,Peak Speed,Foot Speed,Linear ROM,Angular ROM,Kick Type,Has Video
${set.id},${set.date},${set.time},${set.duration},${set.kicks},${set.peakSpeed},${set.footSpeed},${set.curvedLinearROM},${set.angularROM},${set.kickType},${set.hasVideo}`;

    return csvData;
  }

  // Export all data
  static async exportAllData(): Promise<string> {
    await delay(1000);
    const sets = await this.getAllSets();

    let csvData = `Set ID,Date,Time,Duration,Kicks,Peak Speed,Foot Speed,Linear ROM,Angular ROM,Kick Type,Has Video\n`;
    sets.forEach((set) => {
      csvData += `${set.id},${set.date},${set.time},${set.duration},${set.kicks},${set.peakSpeed},${set.footSpeed},${set.curvedLinearROM},${set.angularROM},${set.kickType},${set.hasVideo}\n`;
    });

    return csvData;
  }
}
