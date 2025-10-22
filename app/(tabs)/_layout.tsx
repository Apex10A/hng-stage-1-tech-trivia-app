import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 85 : 70;

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const palette = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: palette.tint,
        tabBarInactiveTintColor: palette.tabIconDefault,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT + insets.bottom,
          borderTopWidth: 0,
          backgroundColor: palette.background,
          elevation: 0,
          shadowColor: 'transparent',
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 6,
          fontFamily: Fonts.medium,
        },
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.05)', 'transparent']}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={{
                position: 'absolute',
                top: -20,
                left: 0,
                right: 0,
                height: 20,
                opacity: 0.05,
              }}
            />
            <View style={{ backgroundColor: palette.background, flex: 1 }} />
          </View>
        ),
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
