'use client';

import React from 'react';
import { Card, Row, Col, List, Avatar, Tag, Button, Modal, Input, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { trpcClient } from '@ntla9aw/trpc-client/src/client';

export default function Dashboard() {
  const [isTagModalVisible, setIsTagModalVisible] = React.useState(false);
  const [newTag, setNewTag] = React.useState('');

  const { data, isLoading, refetch } = trpcClient.personal.getDashboardData.useQuery();
  // const joinCommunityMutation = trpcClient.personal.joinCommunity.useMutation();
  const leaveCommunityMutation = trpcClient.personal.leaveCommunity.useMutation();
  const updateUserTagsMutation = trpcClient.personal.updateUserTags.useMutation();

  // const handleJoinCommunity = async (communityId: string) => {
  //   try {
  //     await joinCommunityMutation.mutateAsync({ communityId });
  //     message.success('Successfully joined the community!');
  //     refetch();
  //   } catch (error) {
  //     message.error('Failed to join the community');
  //   }
  // };

  const handleLeaveCommunity = async (communityId: string) => {
    try {
      await leaveCommunityMutation.mutateAsync({ communityId });
      message.success('Successfully left the community');
      refetch();
    } catch (error) {
      message.error('Failed to leave the community');
    }
  };

  const handleAddTag = async () => {
    if (newTag && data) {
      const updatedTags = [...data.userTags, newTag];
      try {
        await updateUserTagsMutation.mutateAsync({ tags: updatedTags });
        message.success('Tag added successfully');
        setNewTag('');
        setIsTagModalVisible(false);
        refetch();
      } catch (error) {
        message.error('Failed to add tag');
      }
    }
  };

  const handleRemoveTag = async (tagToRemove: string) => {
    if (data) {
      const updatedTags = data.userTags.filter(tag => tag !== tagToRemove);
      try {
        await updateUserTagsMutation.mutateAsync({ tags: updatedTags });
        message.success('Tag removed successfully');
        refetch();
      } catch (error) {
        message.error('Failed to remove tag');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card title="My Communities" extra={<Button onClick={() => {}}>Explore</Button>}>
          <List
            itemLayout="horizontal"
            dataSource={data.communities}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    key="leave"
                    onClick={() => handleLeaveCommunity(item.id)}
                    icon={<MinusOutlined />}
                  >
                    Leave
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={item.name}
                  description={`${item.members} members`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Upcoming Events" extra={<Button onClick={() => {}}>View All</Button>}>
          <List
            itemLayout="horizontal"
            dataSource={data.upcomingEvents}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={`${new Date(item.date).toLocaleDateString()} - ${item.community}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="My Tickets" extra={<Button onClick={() => {}}>Buy Tickets</Button>}>
          <List
            itemLayout="horizontal"
            dataSource={data.ticketedEvents}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={`${new Date(item.date).toLocaleDateString()} - ${item.status}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="My Tags"
          extra={
            <Button icon={<PlusOutlined />} onClick={() => setIsTagModalVisible(true)}>
              Add Tag
            </Button>
          }
        >
          {data.userTags.map((tag) => (
            <Tag
              key={tag}
              color="blue"
              className="mb-2"
              closable
              onClose={() => handleRemoveTag(tag)}
            >
              {tag}
            </Tag>
          ))}
        </Card>
      </Col>
      <Modal
        title="Add New Tag"
        visible={isTagModalVisible}
        onOk={handleAddTag}
        onCancel={() => setIsTagModalVisible(false)}
      >
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Enter new tag"
        />
      </Modal>
    </Row>
  );
}
