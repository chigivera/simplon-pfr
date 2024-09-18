// Todo create eventlistitem

import React from "react";
import { Avatar, Badge, Card, Image, Tag, Typography } from "antd";
import { Event } from "../../utils/types"; // Ensure this includes the necessary properties
import CustomButton from "../atoms/Button";

interface EventListItemProps extends Event {
  onClick: () => void;
  date:Date,
  location:string,
  categories: string[],
  badge?: 'hot'|'featured'
}

const { Meta } = Card;

const EventListItem: React.FC<EventListItemProps> = ({
  name,
  date,
  location,
  categories,
  onClick,
  badge
}) => {
  return (
    <Badge count={<Typography style={{backgroundColor:'#5AB2FF',borderRadius:30,padding:'0 4px' }}>{badge}</Typography>}>
      <Card
        style={{ height: '100%' }}  
        cover={
          <Image
            alt="event"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <CustomButton label="Book" onClick={onClick} />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={name}
        />
        <div style={{ marginTop: 10 }}>
          <div>
            {categories.map((category, index) => (
              <Tag key={index} color="blue" >{category}</Tag>
            ))}
          </div>
          <p><strong>Date:</strong> {date.toLocaleDateString()}</p>
          <p><strong>Location:</strong> {location}</p>
        </div>
      </Card>
    </Badge>
  );
};

export default EventListItem;