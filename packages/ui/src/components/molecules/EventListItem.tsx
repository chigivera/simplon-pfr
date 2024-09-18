import React from "react";
import { Avatar, Badge, Card, Image, Tag, Typography } from "antd";
import { Event } from "../../utils/types"; // Ensure this includes the necessary properties
import CustomButton from "../atoms/Button";

export interface EventListItemProps extends Event {
  onClick: () => void;
  date: Date;
  location: string;
  categories: string[];
  badge?: "hot" | "featured";
  ticketAmount: number;
  ticketPrice: number;
  group: string;
}

const { Meta } = Card;

const EventListItem: React.FC<EventListItemProps> = ({
  name,
  date,
  location,
  categories,
  group,
  onClick,
  badge,
  ticketAmount,
  ticketPrice,
}) => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "auto",
        padding: "16px",
        position: "relative",
      }}
      cover={
        <Badge
          count={
            badge && (
              <Typography
                style={{
                  backgroundColor: "#5AB2FF",
                  borderRadius: 30,
                  padding: "0 4px",
                }}
              >
                {badge}
              </Typography>
            )
          }
        >
          <Image
            alt="event"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            style={{  height: "150px", marginRight: "16px",objectFit:'cover' }}
            
          />
        </Badge>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title={name}
          description={group}
        />
        <div style={{ marginTop: 10 }}>
          <div>
            {categories.map((category, index) => (
              <Tag key={index} color="blue">
                {category}
              </Tag>
            ))}
          </div>
          <p>
            <strong>Date:</strong> {date.toLocaleDateString()}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: "absolute",
          right: 0,
          top:0,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          backgroundColor:'#A0DEFF'
        }}
      >
        <div>
          <Typography.Text strong>Tickets:</Typography.Text> {ticketAmount}
        </div>
        <div>
          <Typography.Text strong>Price:</Typography.Text> ${ticketPrice}
        </div>
        <div>
          <CustomButton label="Book" onClick={onClick} />
        </div>
      </div>
    </Card>
  );
};

export default EventListItem;
