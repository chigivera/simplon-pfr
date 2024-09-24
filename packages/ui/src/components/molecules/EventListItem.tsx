import React from "react";
import { Avatar, Card, Image, Tag, Typography } from "antd";
import { Event } from "../../utils/types"; // Ensure this includes the necessary properties
import CustomButton from "../atoms/Button";
import { useRouter } from "next/navigation";

// export interface EventListItemProps extends Event {
//   badge?: "hot" | "featured";
// }

const { Meta } = Card;

const EventListItem: React.FC<Event> = ({
  event_id,
  // type,
  // description,
  // latitude,
  // longitude,
  image,
  title,
  date,
  city,
  address,
  tags,
  community,
  // badge,
  ticketAmount,
  TicketPrice,
}) => {
  const router = useRouter();

  const handleBookClick = () => {
    router.push(`/event/${event_id}`);
  };

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
        // <Badge
        //   count={
        //     badge && (
        //       <Typography
        //         style={{
        //           backgroundColor: "#5AB2FF",
        //           borderRadius: 30,
        //           padding: "0 4px",
        //         }}
        //       >
        //         {badge}
        //       </Typography>
        //     )
        //   }
        // >
          <Image
            alt="event"
            src={`${image}`}
            style={{ height: "150px", marginRight: "16px", objectFit: 'cover' }}
          />
        // </Badge>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Meta
          avatar={
            <Avatar src={community?.image} />
          }
          title={title}
          description={community?.name || ""}
        />
        <div style={{ marginTop: 10 }}>
          <div>
            {tags.map((tag, index) => (
              <Tag key={index} color="blue">
                {tag.name}
              </Tag>
            ))}
          </div>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Location:</strong>  {city.name}, {address}
          </p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          backgroundColor: '#A0DEFF'
        }}
      >
        <div>
          <Typography.Text strong>Tickets:</Typography.Text> {ticketAmount}
        </div>
        <div>
          <Typography.Text strong>Price:</Typography.Text> ${TicketPrice}
        </div>
        <div>
          <CustomButton label="Book" onClick={handleBookClick} />
        </div>
      </div>
    </Card>
  );
};

export default EventListItem;