import { Tabs } from "expo-router";
import React from "react";
import {
  TrendingUp,
  UsersRound,
  Sparkles,
  UserRound,
} from "lucide-react-native";
import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Keuangan",
          tabBarIcon: ({ color }) => <TrendingUp size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="branch"
        options={{
          title: "Pengelola Cabang",
          tabBarIcon: ({ color }) => <UsersRound size={20} color={color} />,
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Tanya AI",
          tabBarIcon: ({ color }) => (
            // Anda juga bisa mengganti ini dengan icon <Bot /> jika ingin lebih spesifik AI
            <Sparkles size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <UserRound size={20} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
