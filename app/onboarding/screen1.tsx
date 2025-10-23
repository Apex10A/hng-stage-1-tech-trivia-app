import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Fonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const TOTAL_STEPS = 3;

const getProgressOpacity = (isActive: boolean) => (isActive ? 1 : 0.3);

export default function Onboarding1() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const palette = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
      <View style={[styles.container, { backgroundColor: palette.background }]}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={styles.skipButton}
          activeOpacity={0.8}
        >
          <Text style={[styles.skipText, { color: palette.tint }]}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Image
            source={require("../../assets/images/welcome.png")}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={[styles.title, { color: palette.tint }]}>Welcome to Quizzo!</Text>
          <Text style={[styles.subtitle, { color: palette.icon }]}>
            Compete with friends, earn points, and climb the leaderboard in this addictive trivia challenge.
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.progressTrack}>
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressSegment,
                  {
                    backgroundColor: index === 0 ? palette.tint : palette.icon,
                    opacity: getProgressOpacity(index === 0),
                  },
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: palette.tint }]}
            activeOpacity={0.85}
            onPress={() => router.push("/onboarding/screen2")}
          >
            <Text style={[styles.nextIcon, { color: palette.background }]}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  skipButton: {
    alignSelf: "flex-end",
  },
  skipText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  image: {
    width: 260,
    height: 260,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 320,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    alignSelf: "center",
    width: "100%",
  },
  progressTrack: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  progressSegment: {
    height: 6,
    borderRadius: 999,
    flex: 1,
  },
  nextButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
  },
  nextIcon: {
    fontSize: 24,
    fontFamily: Fonts.bold,
  },
});
