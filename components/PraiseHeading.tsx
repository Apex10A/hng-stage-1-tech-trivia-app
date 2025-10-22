import React from "react";
import { Text, TextProps } from "react-native";
import { useTokens } from "@/constants/theme";
// import { useTheme } from "../GlueStackThemeProvider";

export interface PraiseHeadingProps extends TextProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  weight?: "medium" | "semibold" | "bold" | "extrabold" | "black";
  color?:
    | "primary"
    | "secondary"
    | "muted"
    | "error"
    | "success"
    | "warning"
    | "info";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

export const PraiseHeading: React.FC<PraiseHeadingProps> = ({
  level = 1,
  size,
  weight = "medium",
  color = "primary",
  align = "left",
  style,
  children,
  ...props
}) => {
  const $ = useTokens();
//   const { colors } = useTheme();

  // Size mapping
  const sizeStyles = {
    xs: $.textXs,
    sm: $.textSm,
    base: $.textBase,
    lg: $.textLg,
    xl: $.textXl,
    "2xl": $.text2xl,
    "3xl": $.text3xl,
    "4xl": $.text4xl,
    "5xl": $.text4xl, // Use 4xl as fallback
    "6xl": $.text4xl, // Use 4xl as fallback
  };

  // Weight mapping with ClashGrotesk families
  const weightStyles = {
    medium: [$.fontMedium, $.fontClashGroteskMedium],
    semibold: [$.fontSemibold, $.fontClashGroteskSemibold],
    bold: [$.fontBold, $.fontClashGroteskBold],
    extrabold: [$.fontExtrabold, $.fontClashGroteskBold],
    black: [$.fontBlack, $.fontClashGroteskBold],
  };

  // Color mapping
//   const colorStyles = {
//     primary: $.textPrimary,
//     secondary: $.textSecondary,
//     muted: $.textMuted,
//     error: $.colorError,
//     success: $.colorSuccess,
//     warning: $.colorWarning,
//     info: $.colorInfo,
//   };

  // Alignment mapping
  const alignStyles = {
    left: $.textLeft,
    center: $.textCenter,
    right: $.textRight,
  };

  // Level-based defaults
  const levelDefaults = {
    1: { size: "4xl" as const, weight: "bold" as const },
    2: { size: "3xl" as const, weight: "bold" as const },
    3: { size: "2xl" as const, weight: "semibold" as const },
    4: { size: "xl" as const, weight: "semibold" as const },
    5: { size: "lg" as const, weight: "medium" as const },
    6: { size: "base" as const, weight: "medium" as const },
  };

  const defaultSize = levelDefaults[level].size;
  const defaultWeight = levelDefaults[level].weight;

  const finalSize = size || defaultSize;
  const finalWeight = weight || defaultWeight;

  // Font family mapping based on weight

  return (
    <Text
      style={[
        sizeStyles[finalSize],
        ...weightStyles[finalWeight],
        // colorStyles[color],
        alignStyles[align],
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
