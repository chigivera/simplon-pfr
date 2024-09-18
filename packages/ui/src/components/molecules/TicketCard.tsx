import { Card, Space, Typography } from "antd";
import CustomButton from "../atoms/Button";

const { Title } = Typography;

interface TicketCardProps {
   ticketAmount?: number; // Optional prop for ticket amount
   onClick: () => void; // Required prop for click handler
}

function TicketCard({ ticketAmount = 0, onClick }: TicketCardProps) {
   return (
       <Card
           actions={[
               <CustomButton label="Buy Ticket" type="primary" onClick={onClick} />
           ]}
       >
         <Card.Meta 
             title={"Ticket Amount"}
             description={
                 <Space align="center">
                     <Title level={2}>{ticketAmount}</Title> {/* Use level prop instead of as */}
                 </Space>
             }
         />
       </Card>
   );
}

export default TicketCard;