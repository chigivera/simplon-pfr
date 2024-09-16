import React from "react";
import { Col, List, Row, Space, Typography } from "antd";
import CustomButton from "../atoms/Button"; // Adjust the import path as necessary

const { Title } = Typography;

interface SubscriptionTerm {
  id: number; // Assuming each term has a unique ID
  description: string; // Description of the term
}

interface Subscription {
  name: string; // Name of the subscription plan
  terms: SubscriptionTerm[]; // Array of terms for this subscription
}

interface SectionFiveProps {
  subscriptions: Subscription[]; // Array of subscriptions
}

const SectionFive: React.FC<SectionFiveProps> = ({ subscriptions }) => {
  return (
    <>
      <Space direction="vertical">
        <Title level={2}>
          Subscription Plan
          <div
            style={{
              borderRadius: 10,
              height: 15, // Adjust height for visibility
              width: 230,
              background: "#FFF9D0",
            }}
          />
        </Title>
      </Space>
      <Space direction="vertical">
        <Row gutter={[32, 32]} justify={"space-between"} style={{ margin: 50 }}>
          {subscriptions.map((subscription, index) => (
            <Col
              span={6}
              key={index}
              style={{
                backgroundColor: "#5AB2FF",
                borderRadius: 10,
                minHeight: 250,
                padding: 20,
                cursor: "pointer",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3>{subscription.name}</h3> {/* Display the subscription name */}
              <List
                dataSource={subscription.terms}
                renderItem={(item) => (
                  <List.Item key={item.id}>{item.description}</List.Item>
                )}
              />
              <CustomButton
                style={{ marginTop: "20px", backgroundColor: "#5AB2FF" }}
                label="Subscribe"
                onClick={() =>
                  console.log(`Subscribed to ${subscription.name}`)
                }
              />
            </Col>
          ))}
        </Row>
      </Space>
    </>
  );
};

export default SectionFive;
