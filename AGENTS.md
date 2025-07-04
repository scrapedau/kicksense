# KickSense React Native App

A production-ready React Native application for football kicking analysis, featuring real-time sensor data, video recording, and performance analytics. Built for Expo and designed for easy Bluetooth sensor integration.

## Tech Stack

- **Frontend**: React Native + Expo
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Styling**: StyleSheet (native React Native styling)
- **Icons**: Expo Vector Icons
- **Data**: Service layer architecture for easy API integration
- **Platforms**: iOS, Android, Web (via Expo)

## Project Structure

```
App.js                    # Main navigation entry point
screens/                  # Screen components
├── HomeScreen.js         # Home page with personal bests
├── HistoryScreen.js      # Set history and statistics
├── LiveDataScreen.js     # Real-time recording interface
├── SetDetailsScreen.js   # Detailed set analysis
└── SettingsScreen.js     # App and device settings

data/                     # Data layer
├── dataService.js        # API service layer
└── mockData.js           # Mock data for development

package.json              # React Native/Expo dependencies
```

## Key Features

### Navigation System

The app uses React Navigation with a hybrid stack/tab structure:

- **Bottom Tabs**: Home, History, Settings (main navigation)
- **Stack Navigation**: Drill-down screens (LiveData, SetDetails)
- **Tab Icons**: Expo Vector Icons with focused/unfocused states

Example navigation usage:

```javascript
// Navigate to another screen
navigation.navigate("SetDetails", { setId: 1 });

// Go back
navigation.goBack();
```

### Screen Architecture

#### HomeScreen.js

- Personal bests display by kick type
- "Start Set" button with kick type selection modal
- Recent sets preview
- Bluetooth connection indicator

#### HistoryScreen.js

- Complete sets history with filtering
- Statistics cards (total sets, video/data counts)
- Set cards with kick type badges and performance data
- Navigation to detailed set view

#### LiveDataScreen.js

- Real-time sensor data simulation
- Camera viewfinder interface
- Recording controls with visual feedback
- Live acceleration and speed display

#### SetDetailsScreen.js

- Tabbed interface: Overview, Video, Data, 3D Visualizer
- Peak performance data analysis
- Raw sensor data tables
- Video playback (when available)

#### SettingsScreen.js

- Device connection management
- Recording preferences
- Data export options
- App information and help

### Data Architecture

The app uses a service layer pattern for clean data management:

```javascript
// DataService provides async methods for all data operations
import { DataService } from "../data/dataService";

// Get all sets
const sets = await DataService.getAllSets();

// Get personal bests
const bests = await DataService.getPersonalBests();

// Get set details
const set = await DataService.getSetById(setId);
```

#### Data Types

- **SetData**: Complete training set information
- **PersonalBests**: Best performances by kick type
- **PeakPerformanceData**: Individual kick analysis
- **RawSensorData**: Raw accelerometer/gyroscope readings

### Styling System

React Native StyleSheet with consistent design tokens:

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EFE9", // Cream background
  },
  primaryButton: {
    backgroundColor: "#25A18E", // Primary green
    borderRadius: 12,
    paddingVertical: 16,
  },
  text: {
    color: "#1E2D24", // Dark green text
  },
});
```

**Color Palette:**

- Background: `#F2EFE9` (cream)
- Primary: `#25A18E` (teal green)
- Secondary: `#05F140` (bright green)
- Text: `#1E2D24` (dark green)
- Muted: `#BEB8A7` (light brown)

## Development Commands

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
```

## Adding Features

### New Screen

1. Create component in `screens/NewScreen.js`:

```javascript
import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const NewScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>New Screen Content</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EFE9",
  },
});

export default NewScreen;
```

2. Add to navigation in `App.js`:

```javascript
<Stack.Screen name="NewScreen" component={NewScreen} />
```

### New Data Service Method

Add methods to `data/dataService.js`:

```javascript
export class DataService {
  static async getNewData() {
    await delay(100);
    return mockData.newDataArray;
  }
}
```

### Bluetooth Integration (Future)

The architecture is ready for Bluetooth sensor integration:

1. **Install Bluetooth package**: `expo install expo-bluetooth`
2. **Create BluetoothService**: Similar to DataService pattern
3. **Update LiveDataScreen**: Replace mock data with real sensor streams
4. **Modify DataService**: Save real training sets

Example Bluetooth integration:

```javascript
// BluetoothService.js
export class BluetoothService {
  static async connect() {
    // Connect to MetaMotionRL device
  }

  static onDataReceived(callback) {
    // Stream real sensor data to callback
  }
}

// In LiveDataScreen.js
BluetoothService.onDataReceived((sensorData) => {
  setCurrentSpeed(sensorData.footSpeed);
  setAccelerationPeaks(sensorData.acceleration);
});
```

## Expo Snack Deployment

This app is optimized for Expo Snack:

1. **Copy all files** to a new Snack project
2. **Dependencies auto-install** from package.json
3. **Run immediately** on iOS/Android/Web
4. **QR code sharing** for device testing

## Production Deployment

- **Expo Build**: `expo build:android` / `expo build:ios`
- **App Stores**: Ready for Google Play / Apple App Store
- **OTA Updates**: Expo's over-the-air update system
- **Standalone Apps**: Self-contained native apps

## Architecture Notes

- **Mobile-first design** with native platform optimizations
- **Service layer pattern** for easy real-world API integration
- **Async data loading** with proper loading states
- **TypeScript ready** - can be converted by changing file extensions
- **Bluetooth ready** - architecture supports real sensor integration
- **Cross-platform** - works on iOS, Android, and Web via Expo

## Folder Structure Benefits

- **Screens**: Each screen is self-contained and reusable
- **Data layer**: Clean separation between UI and data logic
- **Mock data**: Easy development and testing
- **Navigation**: Centralized routing with parameter passing
- **Styling**: Consistent design system with native performance
