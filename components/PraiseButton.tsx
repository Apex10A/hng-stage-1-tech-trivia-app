import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { useTokens } from "@/constants/theme";
// import { useTheme } from "../GlueStackThemeProvider";
import { PraiseText } from "./PraiseText";

export interface PraiseButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textStyle?: any;
  children: string | React.ReactNode;
}

export const PraiseButton: React.FC<PraiseButtonProps> = ({
  variant = "primary",
  size = "lg",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  textStyle,
  disabled,
  style,
  children,
  ...props
}) => {
  const $ = useTokens();
//   const { colors } = useTheme();

  // Size configurations
  const sizeConfigs = {
    sm: {
      height: 36,
      paddingHorizontal: 12,
      textSize: "sm" as const,
    },
    md: {
      height: 44,
      paddingHorizontal: 16,
      textSize: "base" as const,
    },
    lg: {
      height: 52,
      paddingHorizontal: 24,
      textSize: "lg" as const,
    },
    xl: {
      height: 60,
      paddingHorizontal: 32,
      textSize: "xl" as const,
    },
  };

  // Variant styles
  const getVariantStyles = () => {
    const isDisabled = disabled || loading;

    switch (variant) {
      case "primary":
        return {
        //   backgroundColor: isDisabled ? colors.accent : colors.primary,
          borderWidth: 0,
        };
      case "secondary":
        return {
        //   backgroundColor: isDisabled ? colors.background : colors.surface,
          borderWidth: 1,
        //   borderColor: colors.border,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: "#060089",
          borderWidth: 1,
        //   borderColor: isDisabled ? colors.textMuted : colors.primary,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        };
      case "danger":
        return {
          backgroundColor: "#f91010ff",
          color: "#000",
          borderWidth: 0,
        };
      default:
        return {
        //   backgroundColor: isDisabled ? colors.textMuted : colors.primary,
          borderWidth: 0,
        };
    }
  };

  // Text color based on variant
  const getTextColor = () => {
    const isDisabled = disabled || loading;

    if (isDisabled) {
      return variant === "secondary" ? "muted" : "white";
    }

    switch (variant) {
      case "primary":
      case "danger":
        return "white" as any; // We need to handle white text color
      case "secondary":
        return "primary";
      case "outline":
        return "primary";
      case "ghost":
        return "primary";
      default:
        return "white" as any;
    }
  };

  const sizeConfig = sizeConfigs[size];
  const variantStyles = getVariantStyles();
  const textColor = getTextColor();

  // Only apply shadow to solid variants
  const shouldHaveShadow = false; // variant === 'primary' || variant === 'secondary' || variant === 'danger';

  return (
    <TouchableOpacity
      style={[
        // $.roundedLg,
        $.rounded,
        $.flexRow,
        $.itemsCenter,
        $.justifyCenter,
        {
          height: sizeConfig.height,
          paddingHorizontal: sizeConfig.paddingHorizontal,
        },
        fullWidth && { width: "100%" },
        // variantStyles,
        shouldHaveShadow && $.shadow,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
        //   color={textColor === "white" ? "#FFFFFF" : colors.primary}
          style={$.mr2}
        />
      )}

      {!loading && leftIcon && <>{leftIcon}</>}

      <PraiseText
        size={sizeConfig.textSize}
        weight="semibold"
        // color={"white"}
        numberOfLines={1}
        style={[
          leftIcon && !loading ? $.ml2 : undefined,
          rightIcon ? $.mr2 : undefined,
          textColor === "white" && { color: "#FFFFFF" },
          textStyle,
        ]}
      >
        {children}
      </PraiseText>

      {!loading && rightIcon && <>{rightIcon}</>}
    </TouchableOpacity>
  );
};
