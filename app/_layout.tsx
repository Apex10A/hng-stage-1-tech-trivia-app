import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "ClashGrotesk-Regular": require("./(tabs)/fonts/ClashGrotesk-Variable.ttf"),
    "ClashGrotesk-Medium": require("./(tabs)/fonts/ClashGrotesk-Variable.ttf"),
    "ClashGrotesk-SemiBold": require("./(tabs)/fonts/ClashGrotesk-Variable.ttf"),
    "ClashGrotesk-Bold": require("./(tabs)/fonts/ClashGrotesk-Variable.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName="splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
