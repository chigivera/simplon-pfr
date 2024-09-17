"use client";
import { Space, DatePicker, Select, Tag, Input } from "antd";
import { Dayjs } from 'dayjs';
import { ReactElement, useState } from "react";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Filters {
    date_start: Dayjs | null;
    date_end: Dayjs | null;
    order: string;
    tags: string[];
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

    // Adjusted handleDateChange to match expected parameters
    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        setFilters({
            ...filters,
            date_start: dates ? dates[0] : null,
            date_end: dates ? dates[1] : null,
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
        <Space style={{backgroundColor:'#FFF9D0',padding:'1em',marginTop:'1em'}}>
            <RangePicker
                showTime
                value={[filters.date_start, filters.date_end]}
                onChange={handleDateChange} // Correctly typed onChange
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