import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";

const SkillGraph = ({ skills }) => {
  const customTooltipFormatter = (value) => {
    // 1. Convert the score (out of 100) to the desired 10-point scale (X.X)
    const level = (value / 10).toFixed(1); // e.g., 82 becomes 8.2

    // 2. Return the custom text.
    // The main label (skill name) is automatically handled by the Tooltip.
    return [`Proficiency Level: ${level}`];
  };
  const customTooltipLabel = (label) => {
    // Label is the dataKey="skill" value from the data array.
    return <div style={{ fontWeight: "bold" }}>{label}</div>;
  };

  return (
    <div
      style={{ height: 400, width: "100%" }}
    >
      <ResponsiveContainer>
        <RadarChart
          cx="50%" // Center X position
          cy="50%" // Center Y position
          outerRadius="80%"
          responsive={true}
          data={skills}
          margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="category" stroke="#ffffffa8" fontSize={14} />
          <PolarRadiusAxis
            angle={0}
            domain={[0, 100]}
            stroke="#ffffff33"
            tickCount={5}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333333cc",
              border: "none",
              borderRadius: "10px",
              color: "white",
            }}
            formatter={customTooltipFormatter}
            labelFormatter={customTooltipLabel}
          />
          <Radar
            name="Proficiency"
            dataKey="proficiency"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillGraph;
