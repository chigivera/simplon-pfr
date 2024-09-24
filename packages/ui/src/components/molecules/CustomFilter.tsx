"use client";
import { Space, DatePicker, Select, Tag, Input } from "antd";
import dayjs from 'dayjs';
import { ReactElement, useState } from "react";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Filters {
    date_start: string | undefined;
    date_end: string | undefined;
    order: string | undefined;
    tags: string[];
    title: string | undefined;
    city: string | undefined;
  }

interface CustomFiltersProps {
    filters: Filters;
    setFilters: (filters: Filters) => void;
    filterInputs: ReactElement[];
}

const CustomFilter: React.FC<CustomFiltersProps> = ({
    filters,
    setFilters,
    filterInputs,
}) => {
    const [tags, setTags] = useState<string[]>(filters.tags);

    const handleDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
        setFilters({
            ...filters,
            date_start: dates?.[0]?.toISOString() || undefined,
            date_end: dates?.[1]?.toISOString() || undefined,
        });
    };

    const handleOrderChange = (value: string) => {
        setFilters({
            ...filters,
            order: value,
        });
    };

    const handleTagChange = (tag: string) => {
        const updatedTags = tags.includes(tag)
            ? tags.filter((t) => t !== tag)
            : [...tags, tag];
        setTags(updatedTags);
        setFilters({
            ...filters,
            tags: updatedTags,
        });
    };

    return (
        <Space style={{backgroundColor:'#FFF9D0', padding:'1em', marginTop:'1em'}}>
            <RangePicker
                showTime
                value={[
                    filters.date_start ? dayjs(filters.date_start) : null,
                    filters.date_end ? dayjs(filters.date_end) : null
                ]}
                onChange={handleDateChange}
            />
            <Select
                value={filters.order}
                onChange={handleOrderChange}
                style={{ width: 200 }}
            >
                <Option value="newest">Newest</Option>
                <Option value="oldest">Oldest</Option>
            </Select>
            {filterInputs.map((input, index) => (
                <div key={index}>{input}</div>
            ))}
            <div>
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        closable
                        onClose={() => handleTagChange(tag)}
                        style={{ marginRight: 8 }}
                    >
                        {tag}
                    </Tag>
                ))}
                <Input
                    placeholder="Add tag"
                    onPressEnter={(e) => handleTagChange((e.target as HTMLInputElement).value)}
                    style={{ width: 100 }}
                />
            </div>
        </Space>
    );
};

export default CustomFilter;