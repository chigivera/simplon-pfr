"use client";

import { useState, useContext, useCallback, useEffect } from "react";
import { Input, DatePicker, Select } from "antd";
import UserTable from "@ntla9aw/ui/src/components/molecules/UserTable";
import CustomButton from "@ntla9aw/ui/src/components/atoms/Button";
import UserForm from "@ntla9aw/ui/src/components/molecules/UserForm";
import { ModalContext } from "@ntla9aw/ui/src/components/molecules/ModalProvider";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { User } from "@ntla9aw/ui/src/utils/types";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Filters {
  search: string;
  dateRange: [Date | null, Date | null];
  role: string | null;
}

const initialFilters: Filters = {
  search: "",
  dateRange: [null, null],
  role: null,
};

export default function DashboardUsers() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: usersData, refetch } = trpcClient.user.getUsers.useQuery(
    {
      search: filters.search,
      dateStart: filters.dateRange[0]?.toISOString(),
      dateEnd: filters.dateRange[1]?.toISOString(),
      role: filters.role,
      page: currentPage - 1,
      limit: pageSize,
    },
    {
      keepPreviousData: true,
    }
  );

  const { mutateAsync: deleteUser } = trpcClient.user.delete.useMutation();
  const modalContext = useContext(ModalContext);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
    setCurrentPage(1);
  };

  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    setFilters((prev) => ({ ...prev, dateRange: dates || [null, null] }));
    setCurrentPage(1);
  };

  const handleRoleChange = (value: string | null) => {
    setFilters((prev) => ({ ...prev, role: value }));
    setCurrentPage(1);
  };

  const handleCreateNewUser = useCallback(() => {
    if (modalContext) {
      modalContext.showModal(<UserForm title="Create New User" />);
    }
  }, [modalContext]);

  const handleUpdateUser = useCallback(
    (user: User) => {
      if (modalContext) {
        modalContext.showModal(
          <UserForm title="Update User" userId={user.uid} />
        );
      }
    },
    [modalContext]
  );

  const handleDeleteUser = useCallback(
    async (uid: string) => {
      try {
        await deleteUser({ uid });
        refetch();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },
    [deleteUser, refetch]
  );

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
        <CustomButton label="Create New User" onClick={handleCreateNewUser} />
        <Input.Search
          placeholder="Search users"
          onChange={handleSearchChange}
          style={{ width: 200 }}
        />
        <RangePicker onChange={handleDateChange} />
        <Select
          style={{ width: 120 }}
          placeholder="Select role"
          onChange={handleRoleChange}
          allowClear
        >
          <Option value="admin">Admin</Option>
          <Option value="member">Member</Option>
          <Option value="individual">Individual</Option>
          <Option value="organization">Organization</Option>
        </Select>
      </div>
      <UserTable
        data={usersData?.users || []}
        onUpdate={handleUpdateUser}
        onDelete={handleDeleteUser}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: usersData?.total || 0,
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
        }}
      />
    </>
  );
}
