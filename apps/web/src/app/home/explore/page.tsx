"use client";
import CustomFilter from "@ntla9aw/ui/src/components/molecules/CustomFilter";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { Col, Row } from "antd";

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
        {" "}
        {/* Added gutter for spacing */}
        <Col span={17} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          {/* Content for the first column */}
          <h2>Main Content Area</h2>
          <p>
            Here you can display filtered results based on the selected filters.
          </p>
        </Col>
        <Col span={6} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          {/* Content for the second column */}
          <h2>Sidebar</h2>
          <p>
            This can contain additional information or actions related to
            filtering.
          </p>
        </Col>
      </Row>
    </>
  );
}
