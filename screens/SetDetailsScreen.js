import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DataService } from "../data/dataService";

const SetDetailsScreen = ({ navigation, route }) => {
  const { setId = 1 } = route.params || {};
  const [activeTab, setActiveTab] = useState("overview");
  const [set, setSet] = useState(null);
  const [peakData, setPeakData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSetData = async () => {
      try {
        const [setData, peakPerformanceData, rawSensorData] = await Promise.all(
          [
            DataService.getSetById(setId),
            DataService.getPeakPerformanceData(setId),
            DataService.getRawSensorData(setId),
          ],
        );

        setSet(setData);
        setPeakData(peakPerformanceData);
        setRawData(rawSensorData);
      } catch (error) {
        console.error("Failed to load set data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSetData();
  }, [setId]);

  const getKickTypeIcon = () => {
    switch (set?.kickType) {
      case "field-goal":
        return "golf-outline";
      case "punt":
        return "arrow-up-outline";
      case "kickoff":
        return "flash-outline";
      default:
        return "golf-outline";
    }
  };

  const getKickTypeColor = () => {
    switch (set?.kickType) {
      case "field-goal":
        return "#3B82F6";
      case "punt":
        return "#10B981";
      case "kickoff":
        return "#F59E0B";
      default:
        return "#3B82F6";
    }
  };

  const formatKickType = () => {
    if (!set) return "";
    return (
      set.kickType.charAt(0).toUpperCase() +
      set.kickType.slice(1).replace("-", " ")
    );
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    ...(set?.hasVideo ? [{ key: "video", label: "Video" }] : []),
    { key: "data", label: "Data" },
    { key: "visualizer", label: "3D" },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading set details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!set) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorTitle}>Set Not Found</Text>
          <Text style={styles.errorText}>
            The requested set could not be found.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={16} color="#25A18E" />
            <Text style={styles.backButtonText}>Back to History</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1E2D24" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Set Details</Text>
          <Text style={styles.headerSubtitle}>
            {set.date} • {set.time}
          </Text>
        </View>
        <View style={styles.kickTypeBadge}>
          <Ionicons
            name={getKickTypeIcon()}
            size={16}
            color={getKickTypeColor()}
          />
          <Text style={[styles.kickTypeText, { color: getKickTypeColor() }]}>
            {formatKickType()}
          </Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabList}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.key && styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content}>
        {activeTab === "overview" && (
          <View style={styles.tabContent}>
            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{set.kicks}</Text>
                <Text style={styles.statLabel}>Total Kicks</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{set.duration}</Text>
                <Text style={styles.statLabel}>Duration</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {set.peakSpeed.toFixed(1)} mph
                </Text>
                <Text style={styles.statLabel}>Peak Speed</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {set.curvedLinearROM.toFixed(1)} in
                </Text>
                <Text style={styles.statLabel}>Max Linear ROM</Text>
              </View>
            </View>

            {/* Performance Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Performance Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Average Foot Speed:</Text>
                <Text style={styles.summaryValue}>
                  {set.footSpeed.toFixed(1)} mph
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Peak Foot Speed:</Text>
                <Text style={styles.summaryValue}>
                  {set.peakSpeed.toFixed(1)} mph
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Max Linear ROM:</Text>
                <Text style={styles.summaryValue}>
                  {set.curvedLinearROM.toFixed(1)} in
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Max Angular ROM:</Text>
                <Text style={styles.summaryValue}>{set.angularROM}°</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === "video" && set.hasVideo && (
          <View style={styles.tabContent}>
            <View style={styles.videoCard}>
              <View style={styles.videoHeader}>
                <Ionicons name="videocam" size={20} color="#25A18E" />
                <Text style={styles.videoTitle}>Set Video</Text>
              </View>
              <View style={styles.videoPlayer}>
                <Ionicons name="videocam" size={48} color="#BEB8A7" />
                <Text style={styles.videoText}>Video Preview</Text>
                <Text style={styles.videoSize}>{set.videoSize}</Text>
                <TouchableOpacity style={styles.playButton}>
                  <Ionicons name="play" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {activeTab === "data" && (
          <View style={styles.tabContent}>
            {/* Peak Performance Data */}
            <View style={styles.dataCard}>
              <View style={styles.dataHeader}>
                <Ionicons name="trending-up" size={20} color="#25A18E" />
                <Text style={styles.dataTitle}>Peak Performance Data</Text>
              </View>
              <View style={styles.peakDataList}>
                {peakData.map((peak, index) => (
                  <View key={index} style={styles.peakDataItem}>
                    <View style={styles.peakHeader}>
                      <Text style={styles.peakTimestamp}>{peak.timestamp}</Text>
                      <Text style={styles.peakKick}>Kick #{index + 1}</Text>
                    </View>
                    <View style={styles.peakStats}>
                      <View style={styles.peakStat}>
                        <Text style={styles.peakStatLabel}>Speed</Text>
                        <Text style={styles.peakStatValue}>
                          {peak.value.toFixed(1)} mph
                        </Text>
                      </View>
                      <View style={styles.peakStat}>
                        <Text style={styles.peakStatLabel}>ROM</Text>
                        <Text style={styles.peakStatValue}>
                          {peak.rom.toFixed(1)} in
                        </Text>
                      </View>
                      <View style={styles.peakStat}>
                        <Text style={styles.peakStatLabel}>Angle</Text>
                        <Text style={styles.peakStatValue}>{peak.angle}°</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Raw Sensor Data */}
            <View style={styles.dataCard}>
              <View style={styles.dataHeader}>
                <Ionicons name="bar-chart" size={20} color="#25A18E" />
                <Text style={styles.dataTitle}>Raw Sensor Data</Text>
              </View>
              <Text style={styles.dataSubtitle}>
                Acceleration (m/s²) and Gyroscope (°/s) readings
              </Text>
              <View style={styles.rawDataTable}>
                {rawData.slice(0, 5).map((row, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCellTime}>{row.time}</Text>
                    <Text style={styles.tableCell}>X: {row.ax.toFixed(1)}</Text>
                    <Text style={styles.tableCell}>Y: {row.ay.toFixed(1)}</Text>
                    <Text style={styles.tableCell}>Z: {row.az.toFixed(1)}</Text>
                  </View>
                ))}
                <View style={styles.tableFooter}>
                  <Text style={styles.tableFooterText}>
                    ... {set.kicks * 50} more data points
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === "visualizer" && (
          <View style={styles.tabContent}>
            <View style={styles.visualizerCard}>
              <View style={styles.visualizerHeader}>
                <Ionicons name="cube" size={20} color="#25A18E" />
                <Text style={styles.visualizerTitle}>
                  3D Swing Path Visualizer
                </Text>
              </View>
              <Text style={styles.visualizerSubtitle}>
                Interactive 3D visualization of kick motion
              </Text>
              <View style={styles.visualizerPlaceholder}>
                <Ionicons name="cube-outline" size={48} color="#BEB8A7" />
                <Text style={styles.visualizerText}>
                  3D Visualizer Coming Soon
                </Text>
                <Text style={styles.visualizerSubtext}>
                  Interactive 3D swing path visualization will be available here
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EFE9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#BEB8A7",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E2D24",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#BEB8A7",
    marginBottom: 16,
    textAlign: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: "#25A18E",
    fontWeight: "600",
    marginLeft: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerBackButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E2D24",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#BEB8A7",
  },
  kickTypeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  kickTypeText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  tabList: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  activeTab: {
    backgroundColor: "#25A18E",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#BEB8A7",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E2D24",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#BEB8A7",
    textAlign: "center",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#BEB8A7",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2D24",
  },
  videoCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginLeft: 8,
  },
  videoPlayer: {
    aspectRatio: 16 / 9,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  videoText: {
    fontSize: 16,
    color: "#BEB8A7",
    marginTop: 8,
  },
  videoSize: {
    fontSize: 12,
    color: "#BEB8A7",
    marginTop: 4,
  },
  playButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#25A18E",
    justifyContent: "center",
    alignItems: "center",
  },
  dataCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginLeft: 8,
  },
  dataSubtitle: {
    fontSize: 14,
    color: "#BEB8A7",
    marginBottom: 16,
  },
  peakDataList: {
    gap: 16,
  },
  peakDataItem: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 8,
  },
  peakHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  peakTimestamp: {
    fontSize: 12,
    color: "#BEB8A7",
    fontFamily: "monospace",
  },
  peakKick: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E2D24",
  },
  peakStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  peakStat: {
    flex: 1,
    alignItems: "center",
  },
  peakStatLabel: {
    fontSize: 12,
    color: "#BEB8A7",
    marginBottom: 4,
  },
  peakStatValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
  },
  rawDataTable: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  tableCellTime: {
    flex: 1,
    fontSize: 12,
    color: "#1E2D24",
    fontFamily: "monospace",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: "#1E2D24",
  },
  tableFooter: {
    paddingVertical: 16,
    alignItems: "center",
  },
  tableFooterText: {
    fontSize: 12,
    color: "#BEB8A7",
  },
  visualizerCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  visualizerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  visualizerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginLeft: 8,
  },
  visualizerSubtitle: {
    fontSize: 14,
    color: "#BEB8A7",
    marginBottom: 16,
  },
  visualizerPlaceholder: {
    aspectRatio: 16 / 9,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  visualizerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginTop: 12,
    marginBottom: 8,
  },
  visualizerSubtext: {
    fontSize: 14,
    color: "#BEB8A7",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default SetDetailsScreen;
