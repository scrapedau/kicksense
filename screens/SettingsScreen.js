import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [videoOverlay, setVideoOverlay] = useState(true);
  const [autoStop, setAutoStop] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const settingsGroups = [
    {
      title: "Device Connection",
      items: [
        {
          icon: "bluetooth",
          label: "Bluetooth",
          value: bluetoothEnabled,
          onToggle: setBluetoothEnabled,
          type: "toggle",
        },
        {
          icon: "wifi",
          label: "Connect to MetaMotionRL",
          subtitle: "Pair with your sensor device",
          type: "action",
        },
      ],
    },
    {
      title: "Recording",
      items: [
        {
          icon: "videocam",
          label: "Video Data Overlay",
          value: videoOverlay,
          onToggle: setVideoOverlay,
          type: "toggle",
        },
        {
          icon: "stop-circle",
          label: "Auto-stop Recording",
          subtitle: "Stop after 10 minutes of inactivity",
          value: autoStop,
          onToggle: setAutoStop,
          type: "toggle",
        },
      ],
    },
    {
      title: "Data & Export",
      items: [
        {
          icon: "download",
          label: "Export Set Data",
          subtitle: "Export all recorded sessions as CSV",
          type: "action",
        },
        {
          icon: "cloud-upload",
          label: "Backup to Cloud",
          subtitle: "Automatically backup your data",
          type: "action",
        },
        {
          icon: "trash",
          label: "Clear All Data",
          subtitle: "Delete all recorded sessions",
          type: "action",
          destructive: true,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: "notifications",
          label: "Push Notifications",
          value: notifications,
          onToggle: setNotifications,
          type: "toggle",
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          icon: "information-circle",
          label: "App Version",
          subtitle: "1.0.0",
          type: "info",
        },
        {
          icon: "help-circle",
          label: "Help & Support",
          type: "action",
        },
        {
          icon: "document-text",
          label: "Privacy Policy",
          type: "action",
        },
        {
          icon: "document-text",
          label: "Terms of Service",
          type: "action",
        },
      ],
    },
  ];

  const renderSettingItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.settingItem, item.destructive && styles.destructiveItem]}
        disabled={item.type === "toggle" || item.type === "info"}
      >
        <View style={styles.settingContent}>
          <View style={styles.settingLeft}>
            <View
              style={[
                styles.settingIconContainer,
                item.destructive && styles.destructiveIconContainer,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={item.destructive ? "#EF4444" : "#25A18E"}
              />
            </View>
            <View style={styles.settingTextContainer}>
              <Text
                style={[
                  styles.settingLabel,
                  item.destructive && styles.destructiveLabel,
                ]}
              >
                {item.label}
              </Text>
              {item.subtitle && (
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              )}
            </View>
          </View>

          <View style={styles.settingRight}>
            {item.type === "toggle" && (
              <Switch
                value={item.value}
                onValueChange={item.onToggle}
                trackColor={{ false: "#E5E5E5", true: "#25A18E" }}
                thumbColor={item.value ? "#FFFFFF" : "#F4F3F4"}
              />
            )}
            {(item.type === "action" || item.type === "info") && (
              <Ionicons name="chevron-forward" size={20} color="#BEB8A7" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Configure your KickSense experience
          </Text>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupContainer}>
              {group.items.map((item, itemIndex) =>
                renderSettingItem(item, itemIndex),
              )}
            </View>
          </View>
        ))}

        {/* Device Status */}
        <View style={styles.deviceStatus}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Device Status</Text>
          </View>
          <View style={styles.statusContent}>
            <View style={styles.statusItem}>
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <Text style={styles.statusLabel}>MetaMotionRL</Text>
              </View>
              <Text style={styles.statusValue}>Connected</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Battery Level</Text>
              <Text style={styles.statusValue}>87%</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Signal Strength</Text>
              <Text style={styles.statusValue}>Strong</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>Last Sync</Text>
              <Text style={styles.statusValue}>2 minutes ago</Text>
            </View>
          </View>
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
  settingsGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
    marginBottom: 12,
    marginLeft: 4,
  },
  groupContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  destructiveItem: {
    borderBottomColor: "#FEF2F2",
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#E8F5E8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  destructiveIconContainer: {
    backgroundColor: "#FEF2F2",
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
  },
  destructiveLabel: {
    color: "#EF4444",
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#BEB8A7",
    marginTop: 2,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  deviceStatus: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E2D24",
  },
  statusContent: {
    gap: 12,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: "#BEB8A7",
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E2D24",
  },
});

export default SettingsScreen;
