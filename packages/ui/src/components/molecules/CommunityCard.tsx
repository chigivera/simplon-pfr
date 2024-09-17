import React from "react";
import {  Card, Image } from "antd";
import { Community } from "../../utils/types";
import CustomButton from "../atoms/Button";

interface CommunityCardProps extends Community {
  onClick: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  name,
  description,
  coverImage,
  onClick,
}) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{ width: '250px', height: '300px' }} // Reduced width and height for smaller cards
      actions={[
        <CustomButton label="Book" onClick={onClick} />,
      ]}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
          <Image
            alt="community"
            src={coverImage}
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }}
          />
      </div>
      <Card.Meta title={name} description={description} style={{ marginTop: 10 }} />
    </Card>
  );
};

export default CommunityCard; 