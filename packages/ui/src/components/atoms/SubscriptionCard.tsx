import { Card, List } from "antd";
import CustomButton from "./Button";

function SubscriptionCard({ title, terms, price, onClick }: { title: string; terms: string[]; price: string; onClick: () => void; }) {
  return (
    <Card title={title} bordered={false} style={{ width: '100%',marginBottom:'1em' }}>
      <List
        itemLayout="horizontal"
        dataSource={terms}
        renderItem={(item) => (
          <List.Item>{item}</List.Item>
        )}
      />
      <CustomButton label={`Pay ${price}`} style={{width:'100%'}} onClick={onClick} />
    </Card>
  );
}

export default SubscriptionCard;