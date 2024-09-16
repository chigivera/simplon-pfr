import React from "react";
import { Layout, Image, Typography } from "antd";
import CustomButton from "../atoms/Button"; // Adjust the import path as necessary

const { Title, Text } = Typography;

interface HeroProps {
  imageUrl: string; // URL for the hero image
  title: string; // Main title
  subtitle: string; // Subtitle or description
  buttonLabel: string; // Label for the button
  onButtonClick: () => void; // Function to handle button click
}

const Hero: React.FC<HeroProps> = ({ imageUrl, title, subtitle, buttonLabel, onButtonClick }) => {
  return (
    <Layout.Content style={{ padding: "10px 0", display: "flex", alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        <Image
          src={imageUrl}
          alt="Hero Image"
          width={500} // Set width
          height={300} // Set height
        />
      </div>
      <div style={{ flex: 1, textAlign: "left", padding: "0 20px" }}>
        <Title level={2}>{title}</Title>
        <Text type="secondary" style={{ display: "block", marginBottom: "20px" }}>
          {subtitle}
        </Text>
        <CustomButton onClick={onButtonClick} label={buttonLabel}/>
      </div>
    </Layout.Content>
  );
};

export default Hero;