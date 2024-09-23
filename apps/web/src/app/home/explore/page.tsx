"use client";
import CustomFilter from "@ntla9aw/ui/src/components/molecules/CustomFilter";
import EventList from "@ntla9aw/ui/src/components/organisms/EventList";
import EventListItem, {
  EventListItemProps,
} from "@ntla9aw/ui/src/components/molecules/EventListItem";

import { useState } from "react";
import { Dayjs } from "dayjs";
import { Col, Row } from "antd";
import dynamic from "next/dynamic";

const CustomMap = dynamic(
  () => import("@ntla9aw/ui/src/components/organisms/CustomMap"),
  {
    ssr: false,
  },
);

const listofEvents: EventListItemProps[] = [
  {
    id: 1,
    name: "Sample Event 1",
    description: "howow",
    date: new Date(2024, 8, 25), // Example date
    location: "Location 1",
    categories: ["Category A", "Category B"],
    group: "Group A",
    ticketAmount: 100,
    ticketPrice: 50,
    badge: "featured",
    onClick: () => console.log("Booking Sample Event 1"), // Added onClick
  },
  {
    id: 2,
    name: "Sample Event 2",
    description: "bowow",
    date: new Date(2024, 9, 5), // Example date
    location: "Location 2",
    categories: ["Category C", "Category D"],
    group: "Group B",
    ticketAmount: 200,
    ticketPrice: 75,
    badge: "hot",
    onClick: () => console.log("Booking Sample Event 2"), // Added onClick
  },
];
interface Filters {
  date_start: Dayjs | null;
  date_end: Dayjs | null;
  order: string;
  tags: string[];
}

const initialFilters: Filters = {
  date_start: null,
  date_end: null,
  order: "newest",
  tags: [],
};

export default function Explore() {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Perform additional actions, such as fetching data based on the new filters
  };

  return (
    <>
      <CustomFilter
        filters={filters}
        setFilters={handleFilterChange}
        filterInputs={
          [
            // Add your custom filter inputs here
          ]
        }
      />
      <Row style={{ marginTop: 10 }} justify={"space-between"}>
        <EventList Card={EventListItem} data={listofEvents} />
        <Col span={6} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          <CustomMap position={[33, -7]} zoom={13} />
        </Col>
      </Row>
    </>
  );
}
