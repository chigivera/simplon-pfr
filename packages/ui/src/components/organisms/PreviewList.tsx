"use client"
import { Col, Layout, Row, Typography } from "antd";
import { ReactElement } from "react";
import { Community, Event } from "../../utils/types";

const { Content } = Layout;
const { Title } = Typography;



interface PreviewListProps {
    Card: React.ElementType; // Use ElementType for components
    data: Event[] | Community[]; // Define the type of data more specifically if possible
    title: string;
    Button: ReactElement;
}

function PreviewList({ Card, data, title, Button }: PreviewListProps) {
    return (
        <Content>
            <Row justify={'space-between'} align={'middle'}>
                <Title>{title}</Title>  
                {Button}
            </Row>
            <Row gutter={[32, 32]} style={{marginBottom:20}}> {/* Add gutter for spacing between columns */}
                {data.slice(0, 8).map((item, index) => (
                    <Col span={6} key={index}> {/* Specify span for responsive layout */}
                        <Card {...item} /> {/* Pass item props to Card */}
                    </Col>
                ))}
            </Row>
        </Content>
    );
}

export default PreviewList;