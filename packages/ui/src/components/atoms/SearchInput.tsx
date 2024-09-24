import React, { useEffect, useState, useCallback } from 'react';
import { AutoComplete, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { trpcStatic } from '@ntla9aw/trpc-client/src/static';
import { debounce } from 'lodash';


interface SearchInputProps {
  onSearch: (title: string, location: string) => void;
}

interface Location {
  id: string;
  name: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [titleOptions, setTitleOptions] = useState<{ value: string }[]>([]);
  const [locationOptions, setLocationOptions] = useState<{ value: string }[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationData = await trpcStatic.navigation.cities.query();
        setLocations(locationData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  // Function to get title options based on user input
  const getTitleOptions = useCallback(async (searchText: string) => {
    try {
      const titleData = await trpcStatic.navigation.eventNames.query({ title: searchText });
      setTitleOptions(titleData.map((title: string) => ({ value: title })));
    } catch (error) {
      console.error('Error fetching event titles:', error);
    }
  }, []);

  // Debounced title search function
  const debouncedTitleSearch = useCallback(
    debounce((value: string) => {
      if (value) {
        getTitleOptions(value);
      }
    }, 300), // 300ms debounce delay
    []
  );

  // Handle title search input
  const handleTitleSearch = (value: string) => {
    debouncedTitleSearch(value);
  };

  // Function to filter locations based on user input
  const getLocationOptions = (searchText: string): { value: string }[] => {
    return locations
      .filter((location) => location.name.toLowerCase().includes(searchText.toLowerCase()))
      .map((location) => ({ value: location.name }));
  };

  // Handle location search input
  const handleLocationSearch = (value: string) => {
    setLocationOptions(getLocationOptions(value));
  };

  // Handle title selection
  const handleTitleSelect = (value: string) => {
    setSelectedTitle(value);
  };

  // Handle location selection
  const handleLocationSelect = (value: string) => {
    setSelectedLocation(value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    onSearch(selectedTitle, selectedLocation);
  };

  return (
    <Space style={{ backgroundColor: '#FFFFFF', height: 30, borderRadius: 30 }}>
      <AutoComplete
        options={titleOptions}
        style={{ width: 200 }}
        placeholder="Search"
        onSearch={handleTitleSearch}
        onSelect={handleTitleSelect}
        variant="borderless"
      />
      <AutoComplete
        options={locationOptions}
        style={{ width: 200 }}
        placeholder="City"
        onSearch={handleLocationSearch}
        onSelect={handleLocationSelect}
        variant="borderless"
      />
      <Button 
        type="default" 
        style={{ background: 'none', border: 'none' }} 
        shape="circle" 
        icon={<SearchOutlined />} 
        onClick={handleSearchClick}
      />
    </Space>
  );
};

export default SearchInput;
