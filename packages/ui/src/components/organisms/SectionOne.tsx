import { Space, Typography } from "antd";
import Lottie from "lottie-react";
import React, { ReactElement } from "react";

const { Title, Paragraph } = Typography;

interface SectionOneProps {
  animationData: object; // Type for animation data
  vector: ReactElement; // Vector element to be displayed
  title: string; // Title for the section
  subtitle: string; // Subtitle or description for the section
}

const SectionOne: React.FC<SectionOneProps> = ({
  animationData,
  vector,
  title,
  subtitle,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "20px" }}>
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: "600px", height: "600px" }}
      />

      <Space
        direction="vertical"
        align="end"
        style={{
          marginLeft: "20px",
          position: "relative",
          padding: "20px",
          height: "400px", // Add some padding to the Space component
          width:"400px",
          background: "linear-gradient(0deg, #FFF9D0 85% , #CAF4FF )", // Gradient colors
          borderRadius: "10px", // Optional: add border radius for a rounded effect
          color: "#000", // Change text color to black
        }}
      >
        <div
          style={{
            color: "#6a82fb",
            position: "absolute",
            left: -50,
            top: -70,
          }}
        >
          {vector}
        </div>{" "}
        {/* Change vector color */}
        <Space align="center" direction="vertical" style={{width:300,          textAlign: "right", // Align text to the right
}}>
          <Title level={2}>{title}</Title>
          <Paragraph>{subtitle}</Paragraph>
        </Space>
      </Space>
    </div>
  );
};

export default SectionOne;
