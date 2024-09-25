"use client";

import { useState, useCallback, useEffect } from "react";
import { DatePicker } from "antd";
import MemberTable from "@ntla9aw/ui/src/components/molecules/MemberTable";
// import MemberForm from "@ntla9aw/ui/src/components/molecules/MemberForm";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface Filters {
  date_start: Dayjs | null;
  date_end: Dayjs | null;
}

const initialFilters: Filters = {
  date_start: null,
  date_end: null,
};
export default function DashboardMembers() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: userCommunity } = trpcClient.community.owner.useQuery();

  const { data: membersData, refetch } = trpcClient.community.getMembers.useQuery(
    {
      date_start: filters.date_start
      ? filters.date_start.format("YYYY-MM-DD")
      : undefined,
    date_end: filters.date_end
      ? filters.date_end.format("YYYY-MM-DD")
      : undefined,
      page: currentPage - 1,
      limit: pageSize,
    },
    {
      keepPreviousData: true,
    }
  );

  const { mutateAsync: deleteMember } = trpcClient.community.delete.useMutation();

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setFilters({
      date_start: dates ? dates[0] : null,
      date_end: dates ? dates[1] : null,
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  // const handleCreateNewMember = useCallback(() => {
  //   if (modalContext) {
  //     modalContext.showModal(<MemberForm title="Create New Member" />);
  //   }
  // }, [modalContext]);

  // const handleUpdateMember = useCallback(
  //   (member: Member) => {
  //     if (modalContext) {
  //       modalContext.showModal(
  //         <MemberForm title="Update Member" memberId={member.uid} />
  //       );
  //     }
  //   },
  //   [modalContext]
  // );

  const handleDeleteMember = useCallback(
    async (uid: string) => {
      try {
        await deleteMember({ community_id:userCommunity?.community_id,uid });
        refetch();
      } catch (error) {
        console.error("Failed to delete member:", error);
      }
    },
    [deleteMember, refetch]
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
    
        <RangePicker onChange={handleDateChange} />
      </div>
      <MemberTable
        data={membersData?.members || []}
        onDelete={handleDeleteMember}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: membersData?.total || 0,
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
        }}
      />
    </>
  );
}
