"use client"
import { Col} from "antd";
import { ElementType } from "react";
import {  Event } from "../../utils/types";


interface EventListItemProps extends Event {
    onClick: () => void;
}


interface PreviewListProps {
    Card: ElementType; // Use ElementType for components
    data: EventListItemProps[]; // Define the type of data more specifically if possible
}

function EventList({ Card, data }: PreviewListProps) {
    return (
        <Col span={17} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
     {data.map((item) => (
                <Card
                    key={item.id}
                    {...item} 
                    onClick={() => console.log(`Booking ${item.name}`)} 
                />
            ))}
      </Col>
    );
  }


export default EventList;