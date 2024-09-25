"use client";

import { useState, useContext, useCallback, useEffect } from "react";
import { Input, DatePicker } from "antd";
import CommunityTable from "@ntla9aw/ui/src/components/molecules/CommunityTable";
import CustomButton from "@ntla9aw/ui/src/components/atoms/Button";
import CommunityForm from "@ntla9aw/ui/src/components/molecules/CommunityForm";
import { ModalContext } from "@ntla9aw/ui/src/components/molecules/ModalProvider";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { Community } from "@ntla9aw/ui/src/utils/types";

const { RangePicker } = DatePicker;

interface Filters {
  search: string;
  dateRange: [Date | null, Date | null];
}

const initialFilters: Filters = {
  search: "",
  dateRange: [null, null],
};

export default function DashboardCommunities() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: communitiesData, refetch } = trpcClient.community.getCommunities.useQuery(
    {
      search: filters.search,
      dateStart: filters.dateRange[0]?.toISOString(),
      dateEnd: filters.dateRange[1]?.toISOString(),
      page: currentPage - 1,
      limit: pageSize,
    },
    {
      keepPreviousData: true,
    }
  );

  const { mutateAsync: deleteCommunity } = trpcClient.community.delete.useMutation();
  const modalContext = useContext(ModalContext);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
    setCurrentPage(1);
  };

  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    setFilters((prev) => ({ ...prev, dateRange: dates || [null, null] }));
    setCurrentPage(1);
  };

  const handleCreateNewCommunity = useCallback(() => {
    if (modalContext) {
      modalContext.showModal(<CommunityForm title="Create New Community" />);
    }
  }, [modalContext]);

  const handleUpdateCommunity = useCallback(
    (community: Community) => {
      if (modalContext) {
        modalContext.showModal(
          <CommunityForm title="Update Community" communityId={community.community_id} />
        );
      }
    },
    [modalContext]
  );

  const handleDeleteCommunity = useCallback(
    async (community_id: string) => {
      try {
        await deleteCommunity({ community_id });
        refetch();
      } catch (error) {
        console.error("Failed to delete community:", error);
      }
    },
    [deleteCommunity, refetch]
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
        <CustomButton label="Create New Community" onClick={handleCreateNewCommunity} />
        <Input.Search
          placeholder="Search communities"
          onChange={handleSearchChange}
          style={{ width: 200 }}
        />
        <RangePicker onChange={handleDateChange} />
      </div>
      <CommunityTable
        data={communitiesData?.communities || []}
        onUpdate={handleUpdateCommunity}
        onDelete={handleDeleteCommunity}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: communitiesData?.total || 0,
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
        }}
      />
    </>
  );
}