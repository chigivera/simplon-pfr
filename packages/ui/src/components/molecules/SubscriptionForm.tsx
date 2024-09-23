
import { useState } from "react";
import SubscriptionCard from "../atoms/SubscriptionCard";
import { Segmented } from "antd";

function SubscriptionForm({ data }: { data: { title: string; terms: string[]; price: string; onClick: () => Promise<void>; }[] }) {
  const [selectedType, setSelectedType] = useState("Free");

  // Filter the subscription data based on the selected segment
  const filteredData = data.filter(subscription => subscription.title === selectedType);

  return (
    <div style={{ width: 230 }}>
      {filteredData.map((subscription, index) => (
        <SubscriptionCard 
          key={index} 
          title={subscription.title} 
          terms={subscription.terms} 
          price={subscription.price} 
          onClick={subscription.onClick} 
        />
      ))}

      <Segmented
        style={{ width: '100%' }}
        options={data.map(sub => sub.title)}
        onChange={(value) => setSelectedType(value as string)} // Update the selected type
      />
    </div>
  );
}

export default SubscriptionForm;