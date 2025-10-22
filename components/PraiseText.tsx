import React from "react";
import { Text, TextProps } from "react-native";
import { useTokens } from "@/constants/theme";
// import { useTheme } from "../GlueStackThemeProvider";

export interface PraiseTextProps extends TextProps {
  variant?: "body" | "caption" | "overline" | "subtitle1" | "subtitle2";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?:
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
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

export const PraiseText: React.FC<PraiseTextProps> = ({
  variant = "body",
  size = "base",
  weight = "normal",
  color = "secondary",
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
  };

  // Weight mapping with ClashGrotesk families
  const weightStyles = {
    thin: [$.fontThin, $.fontClashGrotesk],
    light: [$.fontLight, $.fontClashGroteskLight],
    normal: [$.fontNormal, $.fontClashGrotesk],
    medium: [$.fontMedium, $.fontClashGroteskMedium],
    semibold: [$.fontSemibold, $.fontClashGroteskSemibold],
    bold: [$.fontBold, $.fontClashGroteskBold],
    extrabold: [$.fontExtrabold, $.fontClashGroteskBold],
    black: [$.fontBlack, $.fontClashGroteskBold],
  };

  // const weightStyles = {
  //   thin: $.fontThin,
  //   light: $.fontLight,
  //   normal: $.fontNormal,
  //   medium: $.fontMedium,
  //   semibold: $.fontSemibold,
  //   bold: $.fontBold,
  //   extrabold: $.fontExtrabold,
  //   black: $.fontBlack
  // }

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

  // Variant-based defaults
  const variantDefaults = {
    body: { size: "base" as const, weight: "normal" as const },
    caption: { size: "xs" as const, weight: "normal" as const },
    overline: { size: "xs" as const, weight: "medium" as const },
    subtitle1: { size: "lg" as const, weight: "medium" as const },
    subtitle2: { size: "base" as const, weight: "medium" as const },
  };

  const variantSize = size || variantDefaults[variant].size;
  const variantWeight = weight || variantDefaults[variant].weight;

  return (
    <Text
      style={[
        sizeStyles[variantSize],
        ...weightStyles[variantWeight],
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
