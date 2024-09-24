import React from "react";
import { Card, Image } from "antd";
import { Community } from "../../utils/types";
import CustomButton from "../atoms/Button";

interface CommunityCardProps {
  community: Community; // Define an interface for props
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <Card
      hoverable
      onClick={() => {}}
      style={{ height: '100%' }} // Adjust height for smaller cards
      actions={[
        <CustomButton label="Book" onClick={() => {}} />,
      ]}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
        <Image
          alt="community"
          src={`${community.image}`}
          style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
        />
      </div>
      <Card.Meta title={community.name} description={community.description} style={{ marginTop: 10 }} />
    </Card>
  );
};

export default CommunityCard;