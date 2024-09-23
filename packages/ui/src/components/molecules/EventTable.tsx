import React, {  useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType } from "antd";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type DataIndex = keyof DataType;

interface EventTableProps {
  columns: TableColumnsType<DataType>;
  data: DataType[];
  onUpdate: (record: DataType) => void;  // New handler for update action
  onDelete: (key: string) => void;   
}

const EventTable: React.FC<EventTableProps> = ({ columns, data,onUpdate, onDelete }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  
  const getColumnSearchProps = (dataIndex: DataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value:unknown, record:DataType) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: (text:string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const actionColumn = {
    title: "Actions",
    key: "actions",
    render: ( record: DataType) => (
      <Space size="middle">
        <Button  type="primary" onClick={() => onUpdate(record)}>
        <EditOutlined />
        </Button>
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => onDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
          <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Space>
    ),
  };
  // Dynamically apply search props to columns
  const enhancedColumns = [...columns.map((col) => ({
    ...col,
    ...getColumnSearchProps(col.key as DataIndex),
  })), actionColumn]; // Append the action column to the columns


  return (
    <Table
      columns={enhancedColumns}
      dataSource={data}
    />
  );
};

export default EventTable;