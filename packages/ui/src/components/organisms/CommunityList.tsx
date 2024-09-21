"use client";
import { CSSProperties } from "react";
import { Community } from "../../utils/types";
import { Space, Typography } from "antd";

const { Title } = Typography;

interface CommunityListProps {
  Card: React.ElementType; // Component for rendering each community item
  data: Community[]; // Array of community data
  title?: string; // Optional title for the list
  style?: CSSProperties; // Optional inline styles
}

function CommunityList({ Card, data, title, style }: CommunityListProps) {
  return (
    <div style={style}>
      {/* Title and Optional Button */}
        <Title level={4}>{title}</Title> {/* Render title if provided */}

      {/* Render the list of communities */}
      <Space direction="vertical" size="large" style={{ width: '100%', marginTop: '16px' }}>
        {data.map((item) => (
          <Card
            key={item.id}
            {...item} 
            onClick={() => console.log(`Selected ${item.name}`)} 
          />
        ))}
      </Space>
    </div>
  );
}

export default CommunityList;
