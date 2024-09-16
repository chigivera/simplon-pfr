import { Space, Typography } from "antd";
import Lottie from "lottie-react";
import React, { ReactElement } from "react";

const { Title, Paragraph } = Typography;

interface SectionThreeProps {
  animationData: any; // Type for animation data
  vector: ReactElement; // Vector element to be displayed
  title: string; // Title for the section
  subtitle: string; // Subtitle or description for the section
}

const SectionThree: React.FC<SectionThreeProps> = ({
  animationData,
  vector,
  title,
  subtitle,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "20px" }}>
      <Space
        direction="vertical"
        style={{ position: "relative", width: "100%",padding:0 }}
        align="center"
      >
        <Title
          style={{
            color: "#6a82fb",
            position: "absolute",
            left:70,
            top:130
          }}
          level={2}
        >
          {title}
        </Title>

        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: "600px", height: "600px" }}
        />
          <Title
          style={{
            color: "#6a82fb",
            position: "absolute",
            right:50,
            bottom:130,
            alignItems: "center"
          }}
          level={2}
        >
          {subtitle}
        </Title>
        <div style={{
             position: "absolute",
             right:70,
             bottom:50,
             rotate:'45deg'
        }}>
        {vector}

        </div>

      </Space>
    </div>
  );
};

export default SectionThree;
