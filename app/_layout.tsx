import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Platform, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import  useTheme  from "@/components/useTheme";


export const TAB_BAR_HEIGHT = Platform.OS === "ios" ? 85 : 70;

export default function TabLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT + insets.bottom,
          borderTopWidth: 0,
          backgroundColor: colors.surface,
          elevation: 0,
          shadowColor: "transparent",
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 6,
          fontFamily: "ClashGrotesk-Medium",
        },
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={[
                "rgba(0,0,0,0.1)",
                "rgba(0,0,0,0.05)",
                "transparent",
              ]}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={{
                position: "absolute",
                top: -20,
                left: 0,
                right: 0,
                height: 20,
                opacity: 0.05,
              }}
            />
            <View style={{ backgroundColor: colors.surface, flex: 1 }} />
          </View>
        ),
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",   
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          title: "Skills",
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
