"use client";
import { Col } from "antd";
import { ElementType } from "react";
import { Event } from "../../utils/types";

interface PreviewListProps {
  Card: ElementType;
  data: Event[] | undefined;
  lastEventElementRef: (node: HTMLDivElement | null) => void;
}

function EventList({ Card, data, lastEventElementRef }: PreviewListProps) {
  return (
    <Col span={17} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
      {data &&
        data.map((item, index) => (
          <div
            key={item.event_id}
            ref={index === data.length - 1 ? lastEventElementRef : null}
          >
            <Card
              {...item}
              onClick={() => console.log(`Booking ${item.title}`)}
            />
          </div>
        ))}
    </Col>
  );
}

export default EventList;