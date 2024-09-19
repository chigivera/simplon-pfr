"use client";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { DatePicker, Space } from "antd"; // Ensure you import RangePicker correctly
import CustomDataTable from "@ntla9aw/ui/src/components/molecules/DataTable";
import type { TableColumnsType } from "antd";
import CustomButton from "@ntla9aw/ui/src/components/atoms/Button";

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
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "30%",
    // Add search props if needed
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: "20%",
    // Add search props if needed
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    // Add search props if needed
  },
];

export default function DashboardEvent() {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    setFilters({
      date_start: dates[0],
      date_end: dates[1],
    });
  };

  return (
    <>
      <Space align="start">
        <RangePicker
          showTime
          value={[filters.date_start, filters.date_end]}
          onChange={handleDateChange}
        />
        <CustomButton label="Book" onClick={() => {}} />,
      </Space>
      <CustomDataTable columns={columns} data={data} />
    </>
  );
}
