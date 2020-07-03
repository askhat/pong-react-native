import React from "react";
import { View } from "react-native";

export function Rect({
  x: left,
  y: top,
  w: width,
  h: height,
  color: backgroundColor,
}: Colored<Rect>) {
  return (
    <View
      style={{
        left,
        top,
        width,
        height,
        backgroundColor,
        position: "absolute",
      }}
    />
  );
}
