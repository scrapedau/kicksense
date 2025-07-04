import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [showKickTypeModal, setShowKickTypeModal] = useState(false);

  const personalBests = {
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

  const kickTypes = [
    {
      id: "field-goal",
      name: "Field Goal",
      icon: "golf-outline",
      color: "#3B82F6",
    },
    {
      id: "punt",
      name: "Punt",
      icon: "arrow-up-outline",
      color: "#10B981",
    },
    {
      id: "kickoff",
      name: "Kickoff",
      icon: "flash-outline",
      color: "#F59E0B",
    },
  ];

  const handleStartSet = () => {
    setShowKickTypeModal(true);
  };

  const handleKickTypeSelect = (kickType) => {
    setShowKickTypeModal(false);
    navigation.navigate("LiveData", { kickType });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets%2Faf267b38e7f649e5aba7b44dad4417a9%2Fc3a4084173bf4fd5ac0199efccbcbd48",
            }}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Bluetooth Status */}
          <View style={styles.bluetoothContainer}>
            <View style={styles.bluetoothIndicator}>
              <Ionicons name="bluetooth" size={16} color="#05F140" />
              <Text style={styles.bluetoothText}>MetaMotionRL</Text>
            </View>
          </View>
        </View>

        {/* Start Set Button */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartSet}>
          <Ionicons name="play" size={20} color="#F2EFE9" />
          <Text style={styles.startButtonText}>Start Set</Text>
        </TouchableOpacity>

        {/* Personal Bests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Bests</Text>

          {kickTypes.map((kickType) => (
            <View key={kickType.id} style={styles.personalBestCard}>
              <View style={styles.kickTypeHeader}>
                <Ionicons
                  name={kickType.icon}
                  size={20}
                  color={kickType.color}
                />
                <Text style={styles.kickTypeName}>{kickType.name}</Text>
              </View>

              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Foot Speed</Text>
                  <Text style={styles.statValue}>
                    {personalBests[kickType.id].footSpeed.toFixed(1)} mph
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Linear ROM</Text>
                  <Text style={styles.statValue}>
                    {personalBests[kickType.id].linearROM.toFixed(1)} in
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Angular ROM</Text>
                  <Text style={styles.statValue}>
                    {personalBests[kickType.id].angularROM}°
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Set History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Set History</Text>
          <View style={styles.historyCard}>
            <View style={styles.historyItem}>
              <Text style={styles.historyDate}>Dec 15, 2024</Text>
              <Text style={styles.historyDetails}>45 kicks • 32 min</Text>
            </View>
            <View style={styles.historyStats}>
              <Text style={styles.historySpeed}>72.1 mph peak</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate("History")}
          >
            <Text style={styles.viewAllText}>View All Sets</Text>
            <Ionicons name="chevron-forward" size={16} color="#25A18E" />
          </TouchableOpacity>
        </View>

        {/* Kick Type Selection Modal */}
        <Modal
          visible={showKickTypeModal}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Kick Type</Text>

              {kickTypes.map((kickType) => (
                <TouchableOpacity
                  key={kickType.id}
                  style={[
                    styles.kickTypeOption,
                    { borderColor: kickType.color },
                  ]}
                  onPress={() => handleKickTypeSelect(kickType.id)}
                >
                  <Ionicons
                    name={kickType.icon}
                    size={24}
                    color={kickType.color}
                  />
                  <Text style={styles.kickTypeOptionText}>{kickType.name}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowKickTypeModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EFE9",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 16,
  },
  bluetoothContainer: {
    alignItems: "center",
  },
  bluetoothIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bluetoothText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#05F140",
    fontWeight: "600",
  },
  startButton: {
    backgroundColor: "#25A18E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 24,
  },
  startButtonText: {
    color: "#F2EFE9",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
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
  personalBestCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  kickTypeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  kickTypeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2D24",
  },
  historyCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyItem: {
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2D24",
  },
  historyDetails: {
    fontSize: 12,
    color: "#BEB8A7",
  },
  historyStats: {
    alignItems: "flex-start",
  },
  historySpeed: {
    fontSize: 12,
    fontWeight: "600",
    color: "#25A18E",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: "#25A18E",
    fontWeight: "600",
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#F2EFE9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E2D24",
    textAlign: "center",
    marginBottom: 24,
  },
  kickTypeOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  kickTypeOptionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginLeft: 12,
  },
  cancelButton: {
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#BEB8A7",
    fontWeight: "600",
  },
});

export default HomeScreen;
