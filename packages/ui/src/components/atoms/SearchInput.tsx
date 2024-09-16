import React, { useState } from 'react';
import { AutoComplete, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchInputProps {
    onSearch: (value: string) => void;
  }

  const getPanelValue = (searchText: string): { value: string }[] => {
    // Implement the logic to get panel values based on the search text
    // For example:
    return [
      { value: 'Option 1' },
      { value: 'Option 2' },
      { value: 'Option 3' },
    ];
  };
  
  const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const [options, setOptions] = useState<{ value: string }[]>([]);
  
    const handleSearch = (value: string) => {
      setOptions(getPanelValue(value));
      onSearch(value);
    };
  
    const handleSelect = (value: string) => {
      console.log('onSelect', value);
    };
  
    return (
      <Space>
        <AutoComplete
          options={options}
          style={{ width: 200 }}
          placeholder="Search..."
          onSearch={handleSearch}
          onSelect={handleSelect}
          variant="borderless"
        />
        <AutoComplete
          options={options}
          style={{ width: 200 }}
          placeholder="Search..."
          onSearch={handleSearch}
          onSelect={handleSelect}
          variant="borderless"
        />
        <Button type="default" style={{background:'none',border:'none'}} shape="circle" icon={<SearchOutlined />} />
      </Space>
    );
  };
  
  export default SearchInput;