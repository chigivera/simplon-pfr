"use client";
import React from "react";
import { Col, Image, Row, Space } from "antd";
import EventInfo from "@ntla9aw/ui/src/components/organisms/EventInfo"; // Adjust the import path as necessary
import PreviewList from "@ntla9aw/ui/src/components/organisms/PreviewList";
import EventCard from "@ntla9aw/ui/src/components/molecules/EventCard";
import CommunityCard from "@ntla9aw/ui/src/components/molecules/CommunityCard";
import Button from "@ntla9aw/ui/src/components/atoms/Button";
import TicketCard from "@ntla9aw/ui/src/components/molecules/TicketCard";
const eventsData = [
  {
    id: 1,
    name: "Event 1",
    description: "Description for Event 1",
    date: new Date(2024, 4, 20), // Example date
    location: "Location A",
    categories: ["Category 1", "Category 2"],
  },
  {
    id: 2,
    name: "Event 2",
    description: "Description for Event 2",
    date: new Date(2024, 4, 25),
    location: "Location B",
    categories: ["Category 3"],
  },
  {
    id: 3,
    name: "Event 3",
    description: "Description for Event 3",
    date: new Date(2024, 4, 20), // Example date
    location: "Location A",
    categories: ["Category 1", "Category 2"],
  },
  {
    id: 4,
    name: "Event 4",
    description: "Description for Event 4",
    date: new Date(2024, 4, 25),
    location: "Location B",
    categories: ["Category 3"],
  },
  // Add more events as needed
];

const communitiesData = [
  {
    id: 1,
    name: "Community 1",
    description: "Description for Community 1",
    eventList: [],
    coverImage: "https://via.placeholder.com/150", // Example image URL
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    isFeatured: false,
  },
  {
    id: 2,
    name: "Community 2",
    description: "Description for Community 2",
    eventList: [
      {
        id: 1,
        name: "Event 1",
        description: "Description for Event 1",
      },
      {
        id: 2,
        name: "Event 2",
        description: "Description for Event 2",
      },
    ],
    coverImage: "https://via.placeholder.com/150/0000FF", // Example image URL
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Community 3",
    description: "Description for Community 3",
    eventList: [
      {
        id: 3,
        name: "Event 3",
        description: "Description for Event 3",
      },
    ],
    coverImage: "https://via.placeholder.com/150/FF0000", // Example image URL
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: false,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Community 4",
    description: "Description for Community 4",
    eventList: [],
    coverImage: "https://via.placeholder.com/150/00FF00", // Example image URL
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    isFeatured: false,
  },
];
export default function EventPage() {
  // Sample data for demonstration purposes
  const eventData = {
    "About This Event":
      "lorem ipsumet dolor sit amet, consect id elit Lore et sap  et",
    Date: "September 30, 2024",
    Location: "New York City",
  };
  return (
    <div>
      {/* TODO EVENT IMAGE */}
      <div
        style={{
          height: 400,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1719937206590-6cb10b099e0f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // Replace with your event image URL
          alt="Event"
          style={{ objectFit: "fill", width: "100%", height: "" }}
        />
      </div>
      {/* TODO EVENT INFO */}
      <Row style={{ marginTop: 10 }} justify={"space-between"}>
        <Col span={17} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          <EventInfo title="Event Details" data={eventData} />
          <PreviewList
            style={{ overflowY: "auto", marginBottom: 20 }}
            Card={EventCard}
            data={eventsData}
            title="Events For You"
            Button={
              <Button
                label="View All Events"
                type="primary"
                onClick={() => {
                  console.log("Show More Events :)");
                }}
              />
            }
          />
          <PreviewList
            style={{ overflowY: "auto", marginBottom: 20 }}
            Card={CommunityCard}
            data={communitiesData}
            title="Communities For You"
            Button={
              <Button
                label="Join a Community"
                type="primary"
                onClick={() => {
                  console.log("Show More Communities :)");
                }}
              />
            }
          />
        </Col>
        <Col span={6} style={{ backgroundColor: "#FFF9D0", padding: "1em" }}>
          <Space direction="vertical">
            <TicketCard
              ticketAmount={5}
              onClick={() => console.log("Buy Ticket")}
            />
            <CommunityCard
              {...{
                id: communitiesData[0].id,
                name: communitiesData[0].name,
                description: communitiesData[0].description,
                eventList: communitiesData[0].eventList,
                coverImage: communitiesData[0].coverImage,
                createdAt: communitiesData[0].createdAt,
                updatedAt: communitiesData[0].updatedAt,
                isActive: communitiesData[0].isActive,
                isFeatured: communitiesData[0].isFeatured,
                onClick: () => {},
              }}
            />
          </Space>
        </Col>
      </Row>
      {/* TODO RESERVATION */}
      {/* TODO GROUP CARD */}
    </div>
  );
}
