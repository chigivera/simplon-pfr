"use client";

import { Dayjs } from "dayjs";
import { useState, useContext } from "react";
import { DatePicker } from "antd";
import EventTable from "@ntla9aw/ui/src/components/molecules/EventTable";
import type { TableColumnsType } from "antd";
import CustomButton from "@ntla9aw/ui/src/components/atoms/Button";
import EventForm from "@ntla9aw/ui/src/components/molecules/EventForm";
import { ModalContext } from "@ntla9aw/ui/src/components/molecules/ModalProvider";

const { RangePicker } = DatePicker;

interface Filters {
  date_start: Dayjs | null;
  date_end: Dayjs | null;
}

const initialFilters: Filters = {
  date_start: null,
  date_end: null,
};

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  { key: "2", name: "Joe Black", age: 42, address: "London No. 1 Lake Park" },
  { key: "3", name: "Jim Green", age: 32, address: "Sydney No. 1 Lake Park" },
  { key: "4", name: "Jim Red", age: 32, address: "London No. 2 Lake Park" },
];

const columns: TableColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name", width: "30%" },
  { title: "Age", dataIndex: "age", key: "age", width: "20%" },
  { title: "Address", dataIndex: "address", key: "address" },
];

export default function DashboardEvent() {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  // Access modal context
  const modalContext = useContext(ModalContext);

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setFilters({
      date_start: dates ? dates[0] : null,
      date_end: dates ? dates[1] : null,
    });
  };

  // Function to open modal with EventForm
  const handleCreateNewEvent = () => {
    if (modalContext) {
      modalContext.showModal(<EventForm title="Create New Event" />);
    }
  };

  const handleUpdateEvent = () => {
    if (modalContext) {
      modalContext.showModal(<EventForm title="Update Event" />);
    }
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
        }}
      >
        <CustomButton label="Create New Event" onClick={handleCreateNewEvent} />
        <RangePicker
          showTime
          value={[filters.date_start, filters.date_end]}
          onChange={handleDateChange}
        />
      </div>
      <EventTable
        columns={columns}
        data={data}
        onUpdate={handleUpdateEvent}
        onDelete={() => {}}
      />
    </>
  );
}
