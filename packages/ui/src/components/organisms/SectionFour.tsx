import React from "react";
import { Col, Row, Space, Typography } from "antd";

const { Title } = Typography;

interface Testimonial {
  vector: React.ReactNode; // The image or icon for the testimonial
  quotation: string; // The testimonial text
}

interface SectionFourProps {
  testimonials: Testimonial[]; // Array of testimonials
}

const SectionFour: React.FC<SectionFourProps> = ({ testimonials }) => {
  return (
    <>
      <Space direction="vertical">
        <Title level={2}>
          Testimonials
          <div
            style={{
              borderRadius: 10,
              height: 15, // Adjust height for visibility
              width: 170,
              background: "#FFF9D0",
            }}
          />
        </Title>
      </Space>
      <Row gutter={[16, 16]}>
        {testimonials.map((testimony, index) => (
          <Col span={8} key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: index === 1 ? "column-reverse" : "column", // Reverse for second element
                justifyContent: "space-between",
                alignItems: "center",
                height: "250px", // Set fixed height
                padding: "10px",
                border: "1px solid #f0f0f0",
                borderRadius: "5px",
              }}
            >
              {testimony.vector}
              <p>{testimony.quotation}</p>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SectionFour;
