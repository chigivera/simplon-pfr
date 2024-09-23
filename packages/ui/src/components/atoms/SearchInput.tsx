import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { trpcStatic } from '@ntla9aw/trpc-client/src/static';

interface SearchInputProps {
  onSearch: (tag: string, location: string) => void;
}

interface Tag {
  tag_id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [tagOptions, setTagOptions] = useState<{ value: string }[]>([]);
  const [locationOptions, setLocationOptions] = useState<{ value: string }[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  console.log(tags,locations)
  useEffect(() => {
    // Fetch the locations data from trpc
    const fetchLocations = async () => {
      try {
        const locationData = await trpcStatic.navigation.cities.query();
        console.log(locationData)
        setLocations(locationData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    // Fetch the tags data (you'll need to implement this)
    const fetchTags = async () => {
      try {
        // Replace this with your actual API call
        const tagData = await trpcStatic.navigation.tags.query();
        setTags(tagData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchLocations();
    fetchTags();
  }, []);

  const getTagOptions = (searchText: string): { value: string }[] => {
    return tags
      .filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()))
      .map((tag) => ({ value: tag.name }));
  };

  const getLocationOptions = (searchText: string): { value: string }[] => {
    return locations
      .filter((location) => location.name.toLowerCase().includes(searchText.toLowerCase()))
      .map((location) => ({ value: location.name }));
  };

  const handleTagSearch = (value: string) => {
    setTagOptions(getTagOptions(value));
  };

  const handleLocationSearch = (value: string) => {
    setLocationOptions(getLocationOptions(value));
  };

  const handleTagSelect = (value: string) => {
    setSelectedTag(value);
    onSearch(value, selectedLocation);
  };

  const handleLocationSelect = (value: string) => {
    setSelectedLocation(value);
    onSearch(selectedTag, value);
  };

  const handleSearchClick = () => {
    onSearch(selectedTag, selectedLocation);
  };

  return (
    <Space style={{ backgroundColor: '#FFFFFF', height: 30, borderRadius: 30 }}>
      <AutoComplete
        options={tagOptions}
        style={{ width: 200 }}
        placeholder="Search tags..."
        onSearch={handleTagSearch}
        onSelect={handleTagSelect}
        variant='borderless'
        
      />
      <AutoComplete
        options={locationOptions}
        style={{ width: 200 }}
        placeholder="City"
        onSearch={handleLocationSearch}
        onSelect={handleLocationSelect}
        variant='borderless'

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