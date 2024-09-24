"use client"
import { Col} from "antd";
import { ElementType } from "react";
import {  Event } from "../../utils/types";




interface PreviewListProps {
    Card: ElementType; // Use ElementType for components
    data: Event[] | undefined; // Allow undefined
}

function EventList({ Card, data }: PreviewListProps) {
    return (
        <Col span={17} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
     {data && data.map((item) => (
                <Card
                    key={item.event_id}
                    {...item} 
                    onClick={() => console.log(`Booking ${item.title}`)} 
                />
            ))}
      </Col>
    );
  }


export default EventList;