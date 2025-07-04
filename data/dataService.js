import { mockData } from "./mockData";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class DataService {
  // Get all sets
  static async getAllSets() {
    await delay(100); // Simulate API call
    return [...mockData.sets]; // Return copy to prevent mutations
  }

  // Get sets by kick type
  static async getSetsByKickType(kickType) {
    await delay(100);
    return mockData.sets.filter((set) => set.kickType === kickType);
  }

  // Get sets with video
  static async getSetsWithVideo() {
    await delay(100);
    return mockData.sets.filter((set) => set.hasVideo);
  }

  // Get sets without video
  static async getSetsWithoutVideo() {
    await delay(100);
    return mockData.sets.filter((set) => !set.hasVideo);
  }

  // Get single set by ID
  static async getSetById(id) {
    await delay(100);
    return mockData.sets.find((set) => set.id === id) || null;
  }

  // Get recent sets for home screen
  static async getRecentSets() {
    await delay(100);
    return mockData.sets.slice(0, 3);
  }

  // Get personal bests
  static async getPersonalBests() {
    await delay(100);
    return mockData.personalBests;
  }

  // Get peak performance data for a set
  static async getPeakPerformanceData(setId) {
    await delay(100);
    return mockData.peakPerformanceData[setId] || [];
  }

  // Get raw sensor data for a set
  static async getRawSensorData(setId) {
    await delay(100);
    return mockData.rawSensorData[setId] || [];
  }

  // Get statistics
  static async getStatistics() {
    await delay(100);
    const allSets = mockData.sets;
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

  // Add new set (for when recording is finished)
  static async addSet(setData) {
    await delay(200);
    const newSet = {
      ...setData,
      id: Math.max(...mockData.sets.map((s) => s.id)) + 1,
    };
    mockData.sets.unshift(newSet); // Add to beginning
    return newSet;
  }

  // Delete set
  static async deleteSet(id) {
    await delay(100);
    const index = mockData.sets.findIndex((set) => set.id === id);
    if (index > -1) {
      mockData.sets.splice(index, 1);
      return true;
    }
    return false;
  }

  // Export data (simulate)
  static async exportSetData(setId) {
    await delay(500);
    const set = await this.getSetById(setId);
    if (!set) throw new Error("Set not found");

    // Simulate CSV export
    const csvData = `Set ID,Date,Time,Duration,Kicks,Peak Speed,Foot Speed,Linear ROM,Angular ROM,Kick Type,Has Video
${set.id},${set.date},${set.time},${set.duration},${set.kicks},${set.peakSpeed},${set.footSpeed},${set.curvedLinearROM},${set.angularROM},${set.kickType},${set.hasVideo}`;

    return csvData;
  }

  // Export all data
  static async exportAllData() {
    await delay(1000);
    const sets = await this.getAllSets();

    let csvData = `Set ID,Date,Time,Duration,Kicks,Peak Speed,Foot Speed,Linear ROM,Angular ROM,Kick Type,Has Video\n`;
    sets.forEach((set) => {
      csvData += `${set.id},${set.date},${set.time},${set.duration},${set.kicks},${set.peakSpeed},${set.footSpeed},${set.curvedLinearROM},${set.angularROM},${set.kickType},${set.hasVideo}\n`;
    });

    return csvData;
  }
}
