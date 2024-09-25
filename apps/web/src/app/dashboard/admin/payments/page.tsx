"use client";

import { useState, useEffect } from "react";
import { Input, DatePicker, Select } from "antd";
import PaymentTable from "@ntla9aw/ui/src/components/molecules/PaymentTable";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Filters {
  search: string;
  dateRange: [Date | null, Date | null];
  status: string | null;
}

const initialFilters: Filters = {
  search: "",
  dateRange: [null, null],
  status: null,
};

export default function DashboardPayments() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: paymentsData, refetch } = trpcClient.payment.getPayments.useQuery(
    {
      search: filters.search,
      dateStart: filters.dateRange[0]?.toISOString(),
      dateEnd: filters.dateRange[1]?.toISOString(),
      status: filters.status,
      page: currentPage - 1,
      limit: pageSize,
    },
    {
      keepPreviousData: true,
    }
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
    setCurrentPage(1);
  };

  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    setFilters((prev) => ({ ...prev, dateRange: dates || [null, null] }));
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string | null) => {
    setFilters((prev) => ({ ...prev, status: value }));
    setCurrentPage(1);
  };

  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
  }) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, filters, refetch]);

  return (
    <>
      <div style={{ marginBottom: "1em", display: "flex", justifyContent: "space-between" }}>
        <Input.Search
          placeholder="Search payments"
          onChange={handleSearchChange}
          style={{ width: 200 }}
        />
        <RangePicker onChange={handleDateChange} />
        <Select
          style={{ width: 120 }}
          placeholder="Select status"
          onChange={handleStatusChange}
          allowClear
        >
          <Option value="completed">Completed</Option>
          <Option value="pending">Pending</Option>
          <Option value="failed">Failed</Option>
        </Select>
      </div>
      <PaymentTable
        data={paymentsData?.payments || []}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: paymentsData?.total || 0,
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
        }}
      />
    </>
  );
}
