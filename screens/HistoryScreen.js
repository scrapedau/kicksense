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

const HistoryScreen = ({ navigation }) => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSets = async () => {
      try {
        const allSets = await DataService.getAllSets();
        setSets(allSets);
      } catch (error) {
        console.error("Failed to load sets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSets();
  }, []);

  const getKickTypeIcon = (kickType) => {
    switch (kickType) {
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

  const getKickTypeColor = (kickType) => {
    switch (kickType) {
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

  const formatKickType = (kickType) => {
    return (
      kickType.charAt(0).toUpperCase() + kickType.slice(1).replace("-", " ")
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading sets...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Set History</Text>
          <Text style={styles.subtitle}>
            View and share your recorded training sets
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="calendar-outline" size={20} color="#25A18E" />
            </View>
            <Text style={styles.statNumber}>{sets.length}</Text>
            <Text style={styles.statLabel}>Total Sets</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="videocam-outline" size={20} color="#25A18E" />
            </View>
            <Text style={styles.statNumber}>
              {sets.filter((s) => s.hasVideo).length}
            </Text>
            <Text style={styles.statLabel}>With Video</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="videocam-off-outline" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.statNumber}>
              {sets.filter((s) => !s.hasVideo).length}
            </Text>
            <Text style={styles.statLabel}>Data Only</Text>
          </View>
        </View>

        {/* Sets List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Sets</Text>

          {sets.map((set) => (
            <View key={set.id} style={styles.setCard}>
              <View style={styles.setHeader}>
                <View style={styles.setInfo}>
                  <Text style={styles.setDate}>{set.date}</Text>
                  <View style={styles.badgeContainer}>
                    <View
                      style={[
                        styles.kickTypeBadge,
                        { borderColor: getKickTypeColor(set.kickType) },
                      ]}
                    >
                      <Ionicons
                        name={getKickTypeIcon(set.kickType)}
                        size={12}
                        color={getKickTypeColor(set.kickType)}
                      />
                      <Text
                        style={[
                          styles.kickTypeText,
                          { color: getKickTypeColor(set.kickType) },
                        ]}
                      >
                        {formatKickType(set.kickType)}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.videoBadge,
                        {
                          backgroundColor: set.hasVideo ? "#E8F5E8" : "#F5F5F5",
                        },
                      ]}
                    >
                      <Ionicons
                        name={set.hasVideo ? "videocam" : "videocam-off"}
                        size={12}
                        color={set.hasVideo ? "#10B981" : "#BEB8A7"}
                      />
                      <Text
                        style={[
                          styles.videoText,
                          {
                            color: set.hasVideo ? "#10B981" : "#BEB8A7",
                          },
                        ]}
                      >
                        {set.hasVideo ? "Video" : "Data Only"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.setDetails}>
                <Ionicons name="time-outline" size={12} color="#BEB8A7" />
                <Text style={styles.detailText}>{set.time}</Text>
                <Text style={styles.detailText}>•</Text>
                <Text style={styles.detailText}>{set.duration}</Text>
                <Text style={styles.detailText}>•</Text>
                <Text style={styles.detailText}>{set.kicks} kicks</Text>
              </View>

              <View style={styles.setStats}>
                <View style={styles.peakSpeed}>
                  <Ionicons name="flash" size={12} color="#25A18E" />
                  <Text style={styles.peakSpeedText}>
                    {set.peakSpeed.toFixed(1)} mph peak
                  </Text>
                  {set.hasVideo && set.videoSize && (
                    <>
                      <Text style={styles.separator}>•</Text>
                      <Text style={styles.videoSize}>{set.videoSize}</Text>
                    </>
                  )}
                </View>

                <View style={styles.statsGrid}>
                  <View style={styles.statGridItem}>
                    <Text style={styles.statGridLabel}>Foot Speed:</Text>
                    <Text style={styles.statGridValue}>
                      {set.footSpeed.toFixed(1)} mph
                    </Text>
                  </View>
                  <View style={styles.statGridItem}>
                    <Text style={styles.statGridLabel}>Linear ROM:</Text>
                    <Text style={styles.statGridValue}>
                      {set.curvedLinearROM.toFixed(1)} in
                    </Text>
                  </View>
                  <View style={styles.statGridItem}>
                    <Text style={styles.statGridLabel}>Angular ROM:</Text>
                    <Text style={styles.statGridValue}>{set.angularROM}°</Text>
                  </View>
                </View>
              </View>

              <View style={styles.setActions}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() =>
                    navigation.navigate("SetDetails", { setId: set.id })
                  }
                >
                  <Ionicons name="eye-outline" size={16} color="#25A18E" />
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.exportButton}>
                    <Ionicons
                      name="download-outline"
                      size={16}
                      color="#BEB8A7"
                    />
                    <Text style={styles.exportButtonText}>Export Data</Text>
                  </TouchableOpacity>

                  {set.hasVideo && (
                    <TouchableOpacity style={styles.saveVideoButton}>
                      <Ionicons name="save-outline" size={16} color="#25A18E" />
                      <Text style={styles.saveVideoButtonText}>Save Video</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
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
  },
  loadingText: {
    fontSize: 16,
    color: "#BEB8A7",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E2D24",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#BEB8A7",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: "#E8F5E8",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E2D24",
  },
  statLabel: {
    fontSize: 12,
    color: "#BEB8A7",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E2D24",
    marginBottom: 16,
  },
  setCard: {
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
  setHeader: {
    marginBottom: 12,
  },
  setInfo: {
    marginBottom: 8,
  },
  setDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2D24",
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  kickTypeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
  },
  kickTypeText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  videoBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  videoText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  setDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 12,
    color: "#BEB8A7",
  },
  setStats: {
    marginBottom: 16,
  },
  peakSpeed: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  peakSpeedText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2D24",
    marginLeft: 4,
  },
  separator: {
    fontSize: 12,
    color: "#BEB8A7",
    marginHorizontal: 8,
  },
  videoSize: {
    fontSize: 12,
    color: "#BEB8A7",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statGridItem: {
    flex: 1,
  },
  statGridLabel: {
    fontSize: 12,
    color: "#BEB8A7",
  },
  statGridValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E2D24",
  },
  setActions: {
    gap: 8,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E8",
    paddingVertical: 12,
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#25A18E",
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  exportButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 8,
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#BEB8A7",
    marginLeft: 4,
  },
  saveVideoButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E8",
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveVideoButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#25A18E",
    marginLeft: 4,
  },
});

export default HistoryScreen;
