"use client";
import CustomFilter from "@ntla9aw/ui/src/components/molecules/CustomFilter";
import EventList from "@ntla9aw/ui/src/components/organisms/EventList";
import EventListItem from "@ntla9aw/ui/src/components/molecules/EventListItem";

import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import { Event } from "@ntla9aw/ui/src/utils/types"; // Ensure this includes the necessary properties
import { trpcStatic } from "@ntla9aw/trpc-client/src/static";

const CustomMap = dynamic(
  () => import("@ntla9aw/ui/src/components/organisms/CustomMap"),
  {
    ssr: false,
  },
);

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
  const [eventsData, setEventsData] = useState<Event[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await trpcStatic.event.events.query();
        if (data) {
          setEventsData(data);
        }
      } catch (err) {
        setError("Error Fetching Events");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, eventsData]); // Refetch data when filters change
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };
  console.log("event Data", eventsData);
  console.log("loading", loading);
  console.log("error", error);
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
        <EventList Card={EventListItem} data={eventsData} />
        <Col span={6} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          <CustomMap position={[33, -7]} zoom={13} />
        </Col>
      </Row>
    </>
  );
}
