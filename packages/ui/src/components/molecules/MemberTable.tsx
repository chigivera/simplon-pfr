import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import {  DeleteOutlined } from "@ant-design/icons";

import { ColumnsType } from "antd/es/table";
interface Member {
  uid: string;
  name: string;
  joinDate: string;
  //... other properties
}
interface MemberTableProps {
  data: Member[];
  onDelete: (uid: string) => void;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}


const MemberTable: React.FC<MemberTableProps> = ({
  data,
  onDelete,
  pagination,
}) => {


  const columns: ColumnsType<Member> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure you want to delete this member?"
            onConfirm={() => onDelete(record.uid)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="uid"
      pagination={pagination}
    />
  );
};

export default MemberTable;