import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LiveDataScreen from "./screens/LiveDataScreen";
import SetDetailsScreen from "./screens/SetDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#05F140",
        tabBarInactiveTintColor: "#BEB8A7",
        tabBarStyle: {
          backgroundColor: "#F2EFE9",
          borderTopColor: "#334139",
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#F2EFE9" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#F2EFE9" },
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="LiveData" component={LiveDataScreen} />
        <Stack.Screen name="SetDetails" component={SetDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
