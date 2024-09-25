import React from "react";
import { Avatar, Card, Typography } from "antd";
import { Community } from "../../utils/types";
import CustomButton from "../atoms/Button";



const CommunityCard: React.FC<Community> = ({ image,description,name }) => {
  return (
    <Card
      hoverable
      onClick={() => {}}
      actions={[
        <CustomButton label="Follow" onClick={() => {}} />,
      ]}
      style={{width:250}}
    >
      <Card.Meta avatar={ <Avatar
          alt="community"
          src={`${image}`}
          size={'large'}
        />} title={<Typography.Title level={2}>{name}</Typography.Title>} description={<p style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxHeight:40}}>{description}</p>} style={{ marginTop: 10 }} />
    </Card>
  );
};

export default CommunityCard;