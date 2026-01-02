import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons/";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // headerStyle: { backgroundColor: "#f5f8f8" },
        // headerStyle: { backgroundColor: "#000000" },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          // backgroundColor: "#000",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        // tabBarActiveTintColor: "#6200ee",
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#666666",
        // tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Today's Habits",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-line"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add-habit"
        options={{
          title: "Add Habit",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Carts"
        options={{
          title: "Carts",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          title: "Test",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
