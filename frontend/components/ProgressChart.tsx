import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface SemiCircleProgressProps {
  percentage: number;
}

const SemiCircleProgress: React.FC<SemiCircleProgressProps> = ({
  percentage,
}) => {
  const strokeWidth = 20; // Thickness of the progress arc
  const radius = 90; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Total circumference of the circle
  const halfCircle = radius + strokeWidth; // Center point of the SVG

  // Calculate offsets for the green and red arcs
  const progressOffset = ((100 - percentage) / 100) * (circumference / 2); // Green progress
  const remainingOffset = circumference / 2 - progressOffset; // Red progress

  return (
    <View style={styles.container}>
      <Svg
        width={radius * 2 + strokeWidth * 2}
        height={radius + strokeWidth * 2}
        viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius}`}
      >
        {/* Red Background Path (from 50% to 100%) */}
        <Circle
          cx={halfCircle}
          cy={halfCircle}
          r={radius}
          stroke="#FF0000" // Red for the second half
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0} // Start from the beginning
          fill="transparent"
          strokeLinecap="butt" // No rounded edges
        />
        {/* Green Progress Path */}
        {percentage > 0 && (
          <Circle
            cx={halfCircle}
            cy={halfCircle}
            r={radius}
            stroke="#22C55E" // Green for progress
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset} // Dynamic progress
            fill="transparent"
            strokeLinecap="butt" // No rounded edges
          />
        )}
      </Svg>
      <Text style={styles.ChartText}>Completion Ratio</Text>
      {/* Percentage Text */}
      <Text style={styles.percentageText}>{`${percentage}%`}</Text>
      {/* 0 and 100 Labels */}
      <View style={styles.labelsContainer}>
        <Text style={styles.label}>0</Text>
        <Text style={styles.label}>100</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    top: 15,
  },
  ChartText: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    top: -15, // Adjust downward to avoid overlap
  },
  percentageText: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    top: 100, // Adjust downward to avoid overlap
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginTop: 0, // Adjust to align under the semi-circle
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default SemiCircleProgress;
