import React from "react";
import { List, Typography } from "antd";

const { Title,Text } = Typography;

interface EventInfoProps {
  title: string; // Title of the event
  data: Record<string, string>; // Data should be an object with key-value pairs
}

const EventInfo: React.FC<EventInfoProps> = ({ title, data }) => {
  return (
    <>
      <Title level={1}>{title}</Title>
      <List
        itemLayout="horizontal"
        dataSource={Object.keys(data)} // Use keys of the data object for the list
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Text strong>{item}</Text>} // Use Text instead of Title for item keys
              description={data[item]} // Display the value as the description
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default EventInfo;