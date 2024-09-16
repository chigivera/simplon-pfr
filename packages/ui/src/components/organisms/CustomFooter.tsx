import React from "react";
import {
  Layout,
  Input,
  Menu,
  Row,
  Col,
  List,
  Space,
  Typography,
} from "antd";
import CustomButton from "../atoms/Button"; // Adjust the import path as necessary
import { Brand } from "../atoms/Brand";
import Link from "next/link"; // Import Link from next/link

const { Title,Text } = Typography;

interface SubscriptionTerm {
  id: number;
  description: string;
}

interface Subscription {
  terms: SubscriptionTerm[];
}

interface CustomFooterProps {
  subscription: Subscription; // Pass subscription as a prop
  copyright: { key: string; href: string; label: string }[]; // Define copyright links
  socials: { key: string; href: string; label: string }[]; // Define social links
}

const CustomFooter: React.FC<CustomFooterProps> = ({ subscription, copyright, socials }) => {
  return (
    <Layout.Content style={{ padding: "20px", backgroundColor: "#FFF9D0" }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Title level={4}>Subscription Terms</Title>
          <List
            dataSource={subscription.terms}
            renderItem={(item) => (
              <List.Item key={item.id}>{item.description}</List.Item>
            )}
          />
        </Col>
        <Col span={6}>
          <Title level={4}>Additional Information</Title>
          <List
            dataSource={subscription.terms} // Replace with actual data if different
            renderItem={(item) => (
              <List.Item key={item.id}>{item.description}</List.Item>
            )}
          />
        </Col>
        <Col span={6}>
          <Title level={4}>Help & Support</Title>
          <List
            dataSource={subscription.terms} // Replace with actual data if different
            renderItem={(item) => (
              <List.Item key={item.id}>{item.description}</List.Item>
            )}
          />
        </Col>
        <Col span={6}>
          <Space  direction="vertical" style={{ padding:'30px',paddingTop:0, backgroundColor:'#F1F6FD' }}>
          <Title level={4}>Subscribe</Title>
            <Input placeholder="Subscribe to our newsletter" />
            <CustomButton label="Subscribe" onClick={() => console.log("Subscribed")} style={{
              backgroundColor:'#5AB2FF'
            }}/>
              <Text>
                By subscribin you allow ntla9aw to send you messages
              </Text>
          </Space>
        </Col>
      </Row>

      {/* Footer Links */}
      <Row style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Brand />
        </Col>
        <Col span={8}>
          <Menu mode="horizontal" style={{ backgroundColor: "transparent", justifyContent: "space-around" }}>
            {copyright.map((item) => (
              <Menu.Item key={item.key}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col span={8}>
          <Menu mode="horizontal" style={{ backgroundColor: "transparent", justifyContent: "space-around" }}>
            {socials.map((item) => (
              <Menu.Item key={item.key}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default CustomFooter;