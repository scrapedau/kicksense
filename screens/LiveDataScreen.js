import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const LiveDataScreen = ({ navigation, route }) => {
  const { kickType = "field-goal" } = route.params || {};
  const [isRecording, setIsRecording] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [peakSpeed, setPeakSpeed] = useState(0);
  const [setDuration, setSetDuration] = useState(0);
  const [accelerationPeaks, setAccelerationPeaks] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [accelerationEvents, setAccelerationEvents] = useState([]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      const startTime = Date.now();
      interval = setInterval(() => {
        setSetDuration(Math.floor((Date.now() - startTime) / 1000));

        // Simulate sensor data
        const newSpeed = Math.random() * 30 + 40; // 40-70 mph
        setCurrentSpeed(newSpeed);
        if (newSpeed > peakSpeed) {
          setPeakSpeed(newSpeed);
        }

        // Simulate acceleration peaks
        const newPeaks = {
          x: Math.random() * 20 - 10,
          y: Math.random() * 20 - 10,
          z: Math.random() * 20 - 10,
        };
        setAccelerationPeaks(newPeaks);

        // Add acceleration events occasionally
        if (Math.random() > 0.8) {
          const event = {
            id: Date.now(),
            timestamp: Date.now(),
            acceleration: Math.sqrt(
              newPeaks.x ** 2 + newPeaks.y ** 2 + newPeaks.z ** 2,
            ),
          };
          setAccelerationEvents((prev) => [event, ...prev.slice(0, 9)]);
        }
      }, 100);
    } else {
      // Reset on new set
      setCurrentSpeed(0);
      setPeakSpeed(0);
      setSetDuration(0);
      setAccelerationPeaks({ x: 0, y: 0, z: 0 });
      setAccelerationEvents([]);
    }

    return () => clearInterval(interval);
  }, [isRecording, peakSpeed]);

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleBack = () => {
    setIsRecording(false);
    navigation.goBack();
  };

  const getKickTypeColor = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#1E2D24" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {kickType.charAt(0).toUpperCase() +
            kickType.slice(1).replace("-", " ")}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Camera Viewfinder Area */}
      <View style={styles.cameraContainer}>
        <View style={styles.cameraViewfinder}>
          <View style={styles.cameraOverlay}>
            <Text style={styles.cameraText}>Camera Viewfinder</Text>
            <Text style={styles.cameraSubtext}>
              Position device to capture kick motion
            </Text>
          </View>

          {/* Recording Button */}
          <TouchableOpacity
            style={[
              styles.recordButton,
              { backgroundColor: isRecording ? "#FF4444" : "#FFFFFF" },
            ]}
            onPress={handleRecordToggle}
          >
            <View
              style={[
                styles.recordButtonInner,
                { backgroundColor: isRecording ? "#FFFFFF" : "#FF4444" },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Data Display Area */}
      <View style={styles.dataContainer}>
        <View style={styles.dataHeader}>
          <View style={styles.speedDisplay}>
            <Text style={styles.speedLabel}>Current Speed</Text>
            <Text style={styles.speedValue}>{currentSpeed.toFixed(1)} mph</Text>
          </View>
          <View style={styles.timerDisplay}>
            <Text style={styles.timerValue}>{formatTime(setDuration)}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Peak Speed</Text>
            <Text style={styles.statValue}>{peakSpeed.toFixed(1)} mph</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Status</Text>
            <Text
              style={[
                styles.statValue,
                { color: isRecording ? "#10B981" : "#BEB8A7" },
              ]}
            >
              {isRecording ? "Recording" : "Stopped"}
            </Text>
          </View>
        </View>

        {/* Acceleration Events */}
        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>Recent Acceleration Events</Text>
          <View style={styles.eventsList}>
            {accelerationEvents.length === 0 ? (
              <Text style={styles.noEventsText}>No events detected</Text>
            ) : (
              accelerationEvents.map((event, index) => (
                <View
                  key={event.id}
                  style={[styles.eventItem, { opacity: 1 - index * 0.1 }]}
                >
                  <Text style={styles.eventText}>
                    {event.acceleration.toFixed(1)} m/s²
                  </Text>
                  <Text style={styles.eventTime}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Raw Acceleration Data */}
        <View style={styles.rawDataContainer}>
          <Text style={styles.rawDataTitle}>Live Acceleration (m/s²)</Text>
          <View style={styles.rawDataGrid}>
            <View style={styles.rawDataItem}>
              <Text style={styles.rawDataLabel}>X</Text>
              <Text style={styles.rawDataValue}>
                {accelerationPeaks.x.toFixed(2)}
              </Text>
            </View>
            <View style={styles.rawDataItem}>
              <Text style={styles.rawDataLabel}>Y</Text>
              <Text style={styles.rawDataValue}>
                {accelerationPeaks.y.toFixed(2)}
              </Text>
            </View>
            <View style={styles.rawDataItem}>
              <Text style={styles.rawDataLabel}>Z</Text>
              <Text style={styles.rawDataValue}>
                {accelerationPeaks.z.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EFE9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E2D24",
  },
  headerSpacer: {
    width: 40,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  cameraViewfinder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cameraOverlay: {
    alignItems: "center",
  },
  cameraText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  cameraSubtext: {
    fontSize: 14,
    color: "#BEB8A7",
    textAlign: "center",
  },
  recordButton: {
    position: "absolute",
    bottom: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  recordButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: "#F2EFE9",
    padding: 20,
  },
  dataHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  speedDisplay: {
    flex: 1,
  },
  speedLabel: {
    fontSize: 14,
    color: "#BEB8A7",
    marginBottom: 4,
  },
  speedValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E2D24",
  },
  timerDisplay: {
    alignItems: "flex-end",
  },
  timerValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E2D24",
    fontFamily: "monospace",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#BEB8A7",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
  },
  eventsContainer: {
    marginBottom: 20,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginBottom: 12,
  },
  eventsList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
  },
  noEventsText: {
    fontSize: 14,
    color: "#BEB8A7",
    textAlign: "center",
    marginTop: 32,
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  eventText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2D24",
  },
  eventTime: {
    fontSize: 12,
    color: "#BEB8A7",
  },
  rawDataContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
  },
  rawDataTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginBottom: 12,
  },
  rawDataGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rawDataItem: {
    flex: 1,
    alignItems: "center",
  },
  rawDataLabel: {
    fontSize: 12,
    color: "#BEB8A7",
    marginBottom: 4,
  },
  rawDataValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E2D24",
    fontFamily: "monospace",
  },
});

export default LiveDataScreen;
