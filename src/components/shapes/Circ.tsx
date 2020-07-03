import React from "react";
import { View } from "react-native";

export function Circ({ cx, cy, r, color: backgroundColor }: Colored<Circ>) {
  return (
    <View
      style={{
        left: cx - r,
        top: cy - r,
        width: 2 * r,
        height: 2 * r,
        borderRadius: r,
        backgroundColor,
        position: "absolute",
      }}
    />
  );
}
